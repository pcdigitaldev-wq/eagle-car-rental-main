"use client";

import React from "react";
import LoginInput from "./LoginInput";
import SuperButton from "@/components/SuperButton";
import { useBookingLogin } from "../hooks/bookingLoginHook";
import LoginResult from "./LoginResult";
import { Button } from "@/components/ui/button";

type Props = {
  bookingIdParam:string | undefined,
  emailParam:string | undefined
};

const BookingLogin = ({bookingIdParam,emailParam}: Props) => {
  const {
    bookingId,
    email,
    error,
    pending,
    setBookingIdFn,
    setEmailFn,
    handleLogin,
    setBookingFn,
    booking,
  } = useBookingLogin(bookingIdParam, emailParam);
  return (
    <div className="w-full h-full ">
      {/* My Booking */}
      {!booking ? (
        <div className="w-full h-full flex items-center justify-center flex-col gap-[22px] px-6 max-w-[700px] mx-auto">
          <h3 className="text-[#494949] text-[20px] font-[700]">My Booking </h3>
          <LoginInput
            onChange={(value: string) => setBookingIdFn(value)}
            placeholder="Your Booking ID"
            title="Booking ID"
            value={bookingId}
          />
          <LoginInput
            onChange={(value: string) => setEmailFn(value)}
            placeholder="Your Email"
            title="Email"
            value={email}
          />
          <SuperButton
            buttonType="loadingButton"
            loading={pending}
            title="Continue"
            className="w-full h-[50px]"
            clickHandler={async () => await handleLogin({ email, bookingId })}
          />
          <SuperButton
            href="/"
            variant={"link"}
            className="mt-2 text-[10px] self-start"
            title="Home Page"
            buttonType="linkButton"
          />

          {error && (
            <div>
              {Object.keys(error).map((key, index) => (
                <p key={index} className="capitalize text-red-500 text-xs">
                  {error[key]}
                </p>
              ))}
            </div>
          )}
        </div>
      ) : (
      
          <LoginResult booking={booking} setBooking={() => setBookingFn()} />
   
      )}
    </div>
  );
};

export default BookingLogin;
