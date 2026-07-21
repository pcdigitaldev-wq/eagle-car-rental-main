import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CustomError from "./CustomError";
import { toast } from "sonner";
import { cache } from "react";
import prisma from "./prisma";
import {
  afterTomorrow,
  DEFAULT_LOCATION,
  DEFAULT_TIME,
  LocationType,
  PricingType,
  SearchCarsParams,
  tomorrow,
} from "./Types";
import { calculateDuration, convertDateToISOString } from "./date";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = async (time: number = 1500) =>
  new Promise((r) => setTimeout(r, time));

export const throwCustomError = (message: string): never => {
  throw new CustomError(message);
};

export const errorToast = (message: string = "Something went wrong") =>
  toast.error(message);

export function generateTimeSlots(interval: number = 30): string[] {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`;
      times.push(time);
    }
  }
  return times;
}

export const getBlog = cache(async (slug: string) => {
  const blog = await prisma.blog.findUnique({
    where: {
      slug: slug,
    },
    include: {
      category: {
        select: {
          title: true,
        },
      },
    },
  });

  return blog;
});

export const prepareCarsSearchParams = (params: SearchCarsParams) => {
  const pickUpLocation = params.pickUpLocation ?? DEFAULT_LOCATION;
  const deliveryDate = params.deliveryDate ?? convertDateToISOString(tomorrow);
  const deliveryTime = params.deliveryTime ?? DEFAULT_TIME;
  const returnDate = params.returnDate ?? convertDateToISOString(afterTomorrow);
  const returnTime = params.returnTime ?? DEFAULT_TIME;
  let pageNumber = params.pageNumber;
  if (
    !pageNumber ||
    isNaN(Number(pageNumber)) ||
    Number(pageNumber) < 1 ||
    !Number.isInteger(Number(pageNumber))
  ) {
    console.warn("Invalid page param::", pageNumber);
    pageNumber = "1";
  }

  return {
    ...params,
    pickUpLocation,
    deliveryDate,
    deliveryTime,
    returnDate,
    returnTime,
    pageNumber,
  };
};

export function calculateRentalPrice(
  duration: ReturnType<typeof calculateDuration>,
  pricing: PricingType
) {
  const { months, weeks, days, hours } = duration;

  // Convert pricing strings to numbers
  const hourRate = parseFloat(pricing.hour);
  const weekRate = parseFloat(pricing.week);
  const monthRate = parseFloat(pricing.month);
  const dayRates = pricing.days.map((d) => parseFloat(d));

  let total = 0;

  // Calculate price for months
  total += months * monthRate;

  // Calculate price for weeks
  total += weeks * weekRate;

  // Calculate price for days
  // for (let i = 0; i < days; i++) {
  //   total += i < dayRates.length ? dayRates[i] : dayRates[dayRates.length - 1];
  // }

  if (days > 0) {
    total += dayRates[days - 1];
  }

  // Calculate price for hours
  total += hours * hourRate;
  return total;
}

export function formatDuration(
  duration: ReturnType<typeof calculateDuration>
): string {
  const { months, weeks, days, hours } = duration;

  const parts = [];

  if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
  if (weeks > 0) parts.push(`${weeks} week${weeks > 1 ? "s" : ""}`);
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);

  return parts.length > 0 ? parts.join(", ") : "Less than an hour";
}

export function formatToDollar(value: number): string {
  if (isNaN(value)) {
    throw new Error("Invalid number input");
  }

  const isWholeNumber = value % 1 === 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: isWholeNumber ? 0 : 2,
    maximumFractionDigits: isWholeNumber ? 0 : 2,
  }).format(value);
}

export const getTotalNowLaterPrices = ({
  deposite,
  extraOptionsPrice,
  rentalPrice,
  oneWayFeePrice,
}: {
  deposite: number;
  rentalPrice: number;
  extraOptionsPrice: number;
  oneWayFeePrice: number;
}) => {
  // const baseAmount = rentalPrice  + extraOptionsPrice
  // const totalAmount = Math.max(baseAmount, payNow); // incase deposite is greater than total
  // const payLater = Math.max(totalAmount - payNow, 0)

  const payNow = deposite;
  const totalAmount =
    rentalPrice + deposite + extraOptionsPrice + oneWayFeePrice;
  const payLater = rentalPrice + extraOptionsPrice + oneWayFeePrice;

  return { payNow, payLater, totalAmount };
};

export const getExtraOptionsPrice = (
  extraOptions: { price: number; daily: boolean }[],
  totalDays: number
) => {
  return extraOptions.reduce((acc, val) => {
    const value = val.daily ? Number(val.price) * totalDays : Number(val.price);
    return acc + value;
  }, 0);
};

//generate booking code function
export function generateCode() {
  const numbers = Math.floor(Math.random() * 90000000) + 10000000; // Ensure 8 digits
  const code = "A" + numbers;
  return code;
}

export const generateBookingCode = async () => {
  let attempts = 0;
  let bookingCode = generateCode();
  let existingBooking = await prisma.booking.findFirst({
    where: {
      bookingID: bookingCode,
    },
    select: { bookingID: true },
  });

  // Try up to 10 times
  while (existingBooking && attempts < 10) {
    attempts++;
    bookingCode = generateCode();
    existingBooking = await prisma.booking.findFirst({
      where: {
        bookingID: bookingCode,
      },
      select: { bookingID: true },
    });
  }

  // If 10 attempts are made and bookingCode still exists, handle the case (optional)
  if (attempts === 10 && existingBooking) {
    throw new CustomError(
      "Error Happened While Generating Bookin ID - Please COntact Customer Service "
    );
  }

  return bookingCode;
};

export const stripePaymentMethodMap: Record<string, "card" | "paypal"> = {
  CARD: "card",
  PAYPAL: "paypal",
};

export function formatPhoneNumber(phone: string) {
  // Remove any non-numeric characters
  const cleaned = phone.replace(/[^0-9]/g, "");

  if (cleaned.length < 11) {
    // Handle too short numbers (invalid case)
    return phone;
  }

  // Extract the country code (first digit)
  const countryCode = cleaned[0]; // First digit as country code

  // Extract the rest of the number
  const restOfNumber = cleaned.slice(1); // Everything after the first digit

  // Format the rest into (xxx) xxx-xxxx
  const formatted = restOfNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

  // Combine country code with the formatted number
  return `+${countryCode} ${formatted}`;}
  
export const getOneWayFee = ({
  pickupLocation,
  dropOffLocation,
}: {
  pickupLocation: LocationType;
  dropOffLocation: LocationType | undefined;
}): { isOneWayFee: boolean; oneWayFeePrice: number } => {
  // First, ensure dropOffLocation exists and is different from pickupLocation
  if (!dropOffLocation || dropOffLocation === pickupLocation) {
    return { isOneWayFee: false, oneWayFeePrice: 0 };
  }

  // If Orlando is involved (either as pickup or drop-off) → $3500
  if (pickupLocation === "ORLANDO" || dropOffLocation === "ORLANDO") {
    return { isOneWayFee: true, oneWayFeePrice: 3500 };
  }

  // Otherwise, all other routes cost $500
  return { isOneWayFee: true, oneWayFeePrice: 500 };
};

