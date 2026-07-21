"use client";

import Container from "@/app/_components/Container";
import { CarsWithBookings, LocationType } from "@/lib/Types";
import { format } from "date-fns";
import { useCheckout } from "../hooks/useCheckout";
import Summary from "./Summary";
import BookingForm from "./BookingForm";
import { formatInTimeZone } from "date-fns-tz";

type Props = {
  car: CarsWithBookings[number] & {
    extraOptions: { id: string; title: string; price: number,daily:boolean }[];
  };
  startDate: Date;
  endDate: Date;
  rentalPrice: number;
  pickupLocation: LocationType;
  dropOffLocation:LocationType | undefined
};

const CheckOut = ({
  car,
  endDate,
  startDate,
  rentalPrice,
  pickupLocation,
  dropOffLocation
}: Props) => {
  const formattedStartDate = formatInTimeZone(
    startDate,
    "UTC",
    "EEE dd MMM, hh:mm a"
  );
  const formattedEndDate = formatInTimeZone(
    endDate,
    "UTC",
    "EEE dd MMM, hh:mm a"
  );

  const {
    totalAmount,
    form,
    onSubmit,
    pending,
    setIsBusinessFn,
    payLater,
    payNow,
    totalDays
  } = useCheckout({ car, rentalPrice, startDate, endDate, pickupLocation,dropOffLocation });
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[29px]">
        {/* Booking Form */}
        <BookingForm
          extraOptions={car.extraOptions}
          form={form}
          onSubmit={onSubmit}
          setIsBusinessFn={setIsBusinessFn}
          pending={pending}
        />
        {/* Right Summary */}
        <Summary
          payNow={payNow}
          payLater={payLater}
          extraOptions={form
            .watch("extraOptions")
            .map((item) => ({ ...item, id: item.id as string }))}
          deposit={car.deposit}
          formattedEndDate={formattedEndDate}
          formattedStartDate={formattedStartDate}
          image={car.image}
          subTitle={car.subTitle}
          totalAmount={totalAmount}
          rentalPrice={rentalPrice}
          totalDays={totalDays}
          oneWayFee={form.watch('oneWayFee')}
          pickUpLocation={pickupLocation}
          dropOffLocation={dropOffLocation}
        />
      </div>
    </Container>
  );
};

export default CheckOut;
