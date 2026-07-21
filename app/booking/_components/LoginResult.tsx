import { Button } from "@/components/ui/button";
import React from "react";

import { Accordion } from "@/components/ui/accordion";
import LoginAccordionElement from "./LoginAccordionElement";
import { Booking } from "@prisma/client";
import { BookingWithCarName } from "@/lib/Types";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { formatDateUtc } from "@/lib/date";
import { formatPhoneNumber, formatToDollar } from "@/lib/utils";

type Props = {
  setBooking: () => void;
  booking: BookingWithCarName;
};

const LoginResult = ({ setBooking, booking }: Props) => {
  return (
    <div className="flex w-full h-full items-center justify-center flex-col gap-4 ">
      <div className="w-[95%] max-w-[500px] ">
        <Accordion type="multiple" className="max-h-[85vh] overflow-y-auto noScroll">
          {/* CAR DETAILS */}
          <LoginAccordionElement item="item-1" title="Car Details">
           
            <BookingItem
              label="Car Name"
              value={`${booking.car.carType.title} (${booking.car.subTitle})`}
             
            />
            <BookingItem
              label="Booking Date"
              value={format(booking.createdAt, 'MMM, dd yyyy - HH:mm')}
              
            />
            <BookingItem
              label="Start Date"
              value={formatDateUtc(booking.startDate)}
              
            />
            <BookingItem label="End Date" value={formatDateUtc(booking.endDate)}   />
          </LoginAccordionElement>
          {/* Driver Details */}
          <LoginAccordionElement item="item-2" title=" Client Details">
           
            <BookingItem
              label="Client Name"
              value={`${booking.firstName} ${booking.middleName} ${booking.lastName}`}
              
            />
            <BookingItem
              label="Client Email"
              value={booking.email}
            
            />
            <BookingItem
              label="Client Contact Number"
              value={`${formatPhoneNumber(booking.contactNumber)}`}
              
            />
            
          </LoginAccordionElement>
          {/* Billing Details */}
          <LoginAccordionElement item="item-3" title=" Billing Details">
         
            <BookingItem
              label="Billing Name"
              value={`${booking.billingFirstName} ${booking.billingMiddleName} ${booking.billingLastName}`}
             
            />
             <BookingItem
              label="Billing Contact Number"
              value={`${formatPhoneNumber(booking.billingContactNumber)}`}
           
            />
             <BookingItem
              label="Billing Address"
              value={`${booking.address}`}
           
            />
             <BookingItem
              label="Billing City"
              value={`${booking.City}`}
           
            />
             <BookingItem
              label="Billing State"
              value={`${booking.State}`}
           
            />
             <BookingItem
              label="Billing Zipcode"
              value={`${booking.Zipcode}`}
           
            />
            {
              booking.companyName &&  <BookingItem
              label="Company Name"
              value={`${booking.companyName}`}
           
            />
            }
            {
              booking.companyVat &&  <BookingItem
              label="Company Name"
              value={`${booking.companyVat}`}
           
            />
            }
          </LoginAccordionElement>
          {/* Payment Details */}
          <LoginAccordionElement item="item-4" title=" Payment Details">
            <BookingItem
              label="Payment Method"
              value={booking.paymentMethod}
            
            />
            <BookingItem
              label="Total Amount"
              value={formatToDollar(booking.totalAmount)}
            
            />
            <BookingItem
              label="Pay Now"
              value={formatToDollar(booking.payNow)}
            
            />
          </LoginAccordionElement>
        </Accordion>
      </div>
      <Button onClick={() => setBooking()} variant={"link"}>
        Go Back
      </Button>
    </div>
  );
};

export default LoginResult;

const BookingItem = ({
  label,
  value,
  
}: {
  label: string;
  value: string ;
  
}) => {
  return (
    <div className="flex items-center border roudned-md w-full border-b-0 last:border-b ">
      <p className="felx items-center border-r justify-center text-center font-semibold h-full py-8 flex-1 shrink-0 text-xs px-1">{label}</p>
      <p className="felx items-center justify-center text-center text-muted-foreground h-full py-8 flex-1 shrink-0 text-xs px-1 capitalize">
        {value}
      </p>
    </div>
  );
};
