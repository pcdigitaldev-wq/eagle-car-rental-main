import React from "react";
import CheckoutResultFeed from "./_components/CheckoutResultFeed";

type Props = {
  searchParams: Promise<{
    bookingId: string | undefined;
    canceled: string | undefined;
  }>;
};

const CheckoutResultPage = async ({ searchParams }: Props) => {
  const { bookingId, canceled } = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center">
      {bookingId && (
        <CheckoutResultFeed bookingId={bookingId} />
      )}
      {canceled && (
        <div className="px-40 py-20 bg-red-100 border-red-500 text-red-500 rounded-lg">
          <p>Booking Has Been Canceled!</p>
          
        </div>
      )}
    </div>
  );
};

export default CheckoutResultPage;
