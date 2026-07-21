"use client";
import { CarsWithBookings, LOCATIONS_CONST, LocationType } from "@/lib/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { bookingSchema } from "../schema";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import {
  errorToast,
  getExtraOptionsPrice,
  getOneWayFee,
  getTotalNowLaterPrices,
} from "@/lib/utils";
import { bookCar } from "../actions/bookCar";
import { toast } from "sonner";
import { calculateDuration } from "@/lib/date";

export const useCheckout = ({
  car,
  rentalPrice,
  startDate,
  endDate,
  pickupLocation,
  dropOffLocation
}: {
  car: CarsWithBookings[number];
  rentalPrice: number;
  startDate: Date;
  endDate: Date;
  pickupLocation: LocationType;
  dropOffLocation:LocationType | undefined
}) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const [oneWayFee, setOneWayFee] = useState(false);
  const [oneWayFeePrice, setOneWayFeePrice] = useState(0);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      contactNumber: "",
      billingFirstName: "",
      billingMiddleName: "",
      billingLastName: "",
      billingContactNumber: "",
      address: "",
      City: "",
      State: "",
      Zipcode: "",
      license: "",
      companyName: "",
      companyVat: "",
      pickupLocation: pickupLocation,
      dropoffLocation: dropOffLocation,
      oneWayFee: false,
      paymentMethod: undefined,
      extraOptions: [],
      status: "PENDING",
      terms: false,

      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    },
  });

  const setIsBusinessFn = () => {
    const isBusiness = form.watch("business") ?? false;
    form.setValue("business", !isBusiness);
  };

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    startTransition(async () => {
      try {
        const res = await bookCar(values, car.slug);

        if (!res.success) {
          toast.error(res.message);
        } else {
          res.url && router.push(res.url);
        }
      } catch (error) {
        errorToast();
      }
    });
  }

  const { totalDays } = calculateDuration(startDate, endDate);
 
  useEffect(()=>{
    const { isOneWayFee, oneWayFeePrice } = getOneWayFee({ pickupLocation, dropOffLocation });
  
    setOneWayFee(isOneWayFee);
    setOneWayFeePrice(oneWayFeePrice);
    
    form.setValue('oneWayFee', isOneWayFee)

  },[dropOffLocation,pickupLocation])


  console.log("PICKUP_LOCATION",pickupLocation)
  console.log("DROPPOFF_LOCATION",dropOffLocation)
  console.log("ONE_WAY_FEE",oneWayFee)

  const extraOptionsPrice = getExtraOptionsPrice(
    form.watch("extraOptions").map((extraOption) => ({
      ...extraOption,
      price: Number(extraOption.price),
    })),
    totalDays
  );

  const { payLater, payNow, totalAmount } = getTotalNowLaterPrices({
    deposite: car.deposit,
    extraOptionsPrice,
    rentalPrice,
    oneWayFeePrice
  });

  return {
    totalAmount,
    form,
    onSubmit,
    pending,
    setIsBusinessFn,
    payLater,
    payNow,
    totalDays,
  };
};
