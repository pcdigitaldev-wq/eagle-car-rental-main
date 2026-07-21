"use client";

import React from "react";
import { useCheckoutResult } from "../hooks/useCheckoutResult";
import SuperButton from "@/components/SuperButton";

type Props = {
  bookingId: string;
};

const CheckoutResultFeed = ({ bookingId }: Props) => {
  const { data, isLoading, error, isFetching } = useCheckoutResult(bookingId);

  if (isLoading || isFetching)
    return <div className="font-semibold text-xs">Checking...Please Wait.</div>;
  if (error)
    return (
      <div className="text-xs text-red-500 font-semibold">
        Something went wrong, Please contact our customer service.
      </div>
    );
  if (!data?.success)
    return (
      <div className="text-xs text-red-500 font-semibold">{data?.message}</div>
    );
  if (!data?.booking)
    return (
      <div className="text-xs font-semibold text-orange-500">
        Booking not found
      </div>
    );
  if (data.booking.status === "PENDING")
    return <div className="font-semibold text-xs">Wating For Payment...</div>;
  if (data.booking.status === "PAID")
    return (
      <div className="font-semibold text-xs text-green-500 bg-green-50 px-20 py-8 rounded-lg border border-green-500 text-center">
        Successfully Paid.
        <p className="text-xs text-black mt-6">
          Your Booking ID is: {data.booking.bookingID}
        </p>
        <SuperButton
          buttonType="linkButton"
          href={`/booking?bookingId=${data.booking.bookingID}&email=${data.booking.email}`}
          title="View My Booking Details"
          variant="link"
          replace={true}
        />
      </div>
    );
};

export default CheckoutResultFeed;
