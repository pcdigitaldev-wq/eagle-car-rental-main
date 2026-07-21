"use client";
import { z } from "zod";
import { useState, useTransition } from "react";
import { errorToast, wait } from "@/lib/utils";
import { Booking } from "@prisma/client";
import { loginBooking } from "../actions/loginBooking";
import { toast } from "sonner";
import { BookingWithCarName } from "@/lib/Types";

export const useBookingLogin = (
  bookingIdParam: string | undefined,
  emailParam: string | undefined
) => {
  const loginSchema = z.object({
    bookingId: z
      .string({ invalid_type_error: "Bookin ID isRequired" })
      .min(8, { message: "At least 8 characters" }),
    email: z.string().email({ message: "Enter Valid E-mail Address" }),
  });


  console.log("params",bookingIdParam, emailParam)
  const [pending, startTransition] = useTransition();

  const [bookingId, setBookingId] = useState(bookingIdParam ?? '');
  const [email, setEmail] = useState(emailParam ?? '');
  const [error, setError] = useState<
    | {
        [key: string]: string;
      }
    | undefined
  >(undefined);

  const [booking, setBooking] = useState<BookingWithCarName | null>(null);

  const setBookingIdFn = (value: string) => {
    setError(undefined);
    setBookingId(value);
  };
  const setEmailFn = (value: string) => {
    setError(undefined);
    setEmail(value);
  };

  const handleLogin = async (values: unknown) => {
    const validData = loginSchema.safeParse(values);
    if (!validData.success) {
      const formattedErrors: { [key: string]: string } = {};
      validData.error.issues.forEach((issue) => {
        const field = issue.path[0];
        formattedErrors[field] = issue.message;
      });

      // Update error state
      setError(formattedErrors);
      return;
    }
    startTransition(async () => {
      try {
        const res = await loginBooking(bookingId, email);
        if (!res.success) {
          toast.error(res.message);
        } else {
          setBooking(res.booking!);
        }
      } catch (error) {
        errorToast();
      }
    });
  };

  const setBookingFn = () => {
    setEmail("");
    setBookingId("");
    setBooking(null);
  };

  return {
    bookingId,
    email,
    setBookingIdFn,
    setEmailFn,
    error,
    pending,
    handleLogin,
    booking,
    setBookingFn,
  };
};
