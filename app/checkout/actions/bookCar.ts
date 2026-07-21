"use server";

import { bookingSchema, BookingType } from "../schema";
import CustomError from "@/lib/CustomError";
import {
  calculateRentalPrice,
  generateBookingCode,
  getExtraOptionsPrice,
  getOneWayFee,
  getTotalNowLaterPrices,
  
  stripePaymentMethodMap,
  throwCustomError,
} from "@/lib/utils";
import prisma from "@/lib/prisma";
import { LocationType, PricingType, StripeMetaData } from "@/lib/Types";
import { startStripeSession } from "@/lib/stripe";
import { endOfDay, formatDuration } from "date-fns";
import {
  calculateDuration,
  checkBookingAvailability,
  isDurationMoreThan48Hours,
} from "@/lib/date";
import sendEmail from "@/SendGrid";
import { formatInTimeZone } from "date-fns-tz";
import { sendBookingMessage } from "@/lib/serverFunctions";

export const bookCar = async (
  data: BookingType,
  slug: string
): Promise<
  | { success: false; message: string; url: undefined }
  | { success: true; message: string; url: string | null }
> => {
  let booking;
  try {
    if (!slug) return throwCustomError("Slug Required");

    const validData = bookingSchema.safeParse(data);
    if (!validData.success) return throwCustomError("Invalid Inputs");

    //check car exist and not disabled

    //fetch car
    const car = await prisma.car.findUnique({
      where: {
        slug,
        disabled: false,
        location: validData.data.pickupLocation,
      },
      include: {
        bookings: {
          where: {
            status: {
              in: ["PAID", "PENDING"],
            },
            startDate: { lte: validData.data.endDate },
            endDate: { gte: validData.data.startDate },
          },
          select: {
            startDate: true,
            endDate: true,
          },
        },
        carType: {
          select: {
            title: true,
          },
        },

        extraOptions: {
          select: {
            id: true,
            price: true,
            title: true,
            daily: true,
          },
        },
      },
    });

    if (!car) return throwCustomError("Car Does Not Exist");

    const startDate = new Date(validData.data.startDate);
    const endDate = new Date(validData.data.endDate);

    //check if it has bookings for coming dates - then it is booked already
    const isAvailabe = checkBookingAvailability(
      car?.bookings,
      startDate,
      endDate,
      car.availableCars
    );

    if (!isAvailabe) {
      throwCustomError("Sorry...Car Has Been Booked Already");
    }

    //check extraOptions
    const validExtraOptions = car.extraOptions;
    const isValid = validData.data.extraOptions.every((clientOption) =>
      validExtraOptions.some((dbOption) => dbOption.id === clientOption.id)
    );

    const pickupLocation = validData.data.pickupLocation;
    const dropOffLocation = validData.data.dropoffLocation;

    if (!isValid)
      return throwCustomError(
        "Extra Options Added Not Found, Please Contact Customer Service"
      );

    //calculate price
    const duration = calculateDuration(startDate, endDate);
    const validRange = isDurationMoreThan48Hours(startDate, endDate);
    if (!validRange)
      return throwCustomError("Rent Duration Should Be More Than 48 Hours");
    const durationDescription = formatDuration(duration);
    const pricing = car.pricing as unknown as PricingType;

    const rentalPrice = calculateRentalPrice(duration, pricing);

    const totalDays = duration.totalDays;

    const { isOneWayFee, oneWayFeePrice } = getOneWayFee({
      dropOffLocation,
      pickupLocation,
    });

    //map used extra options added by client to booking
   const usedExtraOptions =  validData.data.extraOptions.map(option=>({price: +option.price,
    daily: option.daily}))

    const extraOptionsPrice = getExtraOptionsPrice(usedExtraOptions, totalDays);
    console.log("ONE_WAY_PRICE", oneWayFeePrice);
    console.log("DROPOFF_LOCATION", dropOffLocation);
    const { payLater, payNow, totalAmount } = getTotalNowLaterPrices({
      deposite: car.deposit,
      extraOptionsPrice,
      rentalPrice,
      oneWayFeePrice,
    });

    console.log("TOTAL_AMOUNT", totalAmount);

    // generate booking ID
    const bookingID = await generateBookingCode();

    //create booking
    booking = await prisma.booking.create({
      data: {
        ...validData.data,
        carId: car.id,
        email: validData.data.email.toLocaleLowerCase(),
        price: rentalPrice,
        totalAmount,
        bookingID,
        payNow,
        status: "PENDING",
      
      },
    });

    //prepare  data for stripe
    const carCompleteTitle = `${car.carType.title} (${car.subTitle})`;
    const paymentMethod = stripePaymentMethodMap[booking.paymentMethod];

    //meta data
    const metaData: StripeMetaData = {
      bookingId: booking.id,
      bookingID: booking.bookingID,
      customerEmail: booking.email,
      startDate: validData.data.startDate,
      endDate: validData.data.endDate,
      carTitle: carCompleteTitle,
      payNow: payNow,
      payLater: payLater,
      totalAmount: totalAmount,
      durationDescription: durationDescription,
    };
    //create session
    const session = await startStripeSession({
      metaData,
      image: car.image,
      myPayment: paymentMethod,
    });

    // const emailRes = await sendEmail({
    //   to: "ammar.ali.haidar.1990@gmail.com",
    //   subject: "Booking Confirmation",
    //   text: "text paid",
    //   html: "html paid",
    //   template:true,
    //   dynamicData:{
    //     bookingDate:formatInTimeZone(
    //       new Date(booking.createdAt),
    //       "UTC",
    //       "MMM, dd yyyy - HH:mm"
    //     ),
    //     bookingID:booking.bookingID,
    //     carName:metaData.carTitle,
    //     email:booking.email,
    //     endDate:formatInTimeZone(
    //       new Date(booking.endDate),
    //       "UTC",
    //       "MMM, dd yyyy - HH:mm"
    //     ),
    //     fullName:`${booking.firstName} ${booking.middleName} ${booking.lastName}`,
    //     paid:`$${booking.payNow.toFixed(2)}`,
    //     paymentMethod:booking.paymentMethod,
    //     startDate:formatInTimeZone(
    //       new Date(booking.startDate),
    //       "UTC",
    //       "MMM, dd yyyy - HH:mm"
    //     ),
    //     totalAmount:`$${booking.totalAmount.toFixed(2)}`
    //   }
    // });

    // if(!emailRes.success){
    //   console.error(emailRes.error)
    // }

     const res = await sendBookingMessage({title:"New Reservation has been made",subject:'New Reservation',dynamicData:{
      bookingID:metaData.bookingID,
      carName:metaData.carTitle,
      fullName:`${booking.firstName} ${booking.lastName}`,
      email:metaData.customerEmail,
      startDate:metaData.startDate,
      endDate:metaData.endDate,
      paid:`$${metaData.payNow} is pending`,
      paymentMethod:booking.paymentMethod,
      totalAmount:`$${metaData.totalAmount}`,
      pickupLocation:booking.pickupLocation as LocationType,
      droppOffLocation:booking.dropoffLocation as LocationType,
      extraOptions:booking.extraOptions as unknown as  {
        id: string;
        price: number;
        title: string;
        daily: boolean;
    }[]
      
     },
    rentalPrice:String(booking.price)
  })
        if(!res.success){
          console.error("Booking Email Faild")
        }

    return {
      success: true,
      url: session.url,
      message: "Session Successfull created",
    };
  } catch (error) {
    if (booking) {
      await prisma.booking.delete({
        where: {
          id: booking?.id,
        },
      });
    }

    console.error(error);
    if (error instanceof CustomError) {
      return {
        success: false,
        message: error.message,
        url: undefined,
      };
    }
    return { success: false, message: "Internal Server Error", url: undefined };
  }
};
