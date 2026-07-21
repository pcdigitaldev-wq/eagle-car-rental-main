import CarCard from "@/app/_components/cards/CarCard";
import FramerComponent from "@/app/_components/FramerComponent";
import NoResult from "@/app/_components/NoResult";
import Pagination from "@/app/_components/Pagination";
import Scroller from "@/app/_components/Scroller";
import {
  calculateDuration,
  checkBookingAvailability,
  combineDateAndTimeToUTC,
  isDurationMoreThan48Hours,
} from "@/lib/date";
import prisma from "@/lib/prisma";
import {
  CarCheckoutParams,
  PricingType,
  SearchCarsParams,
  TAKE_CARS,
} from "@/lib/Types";
import { calculateRentalPrice, formatDuration } from "@/lib/utils";
import React from "react";

type Props = { validParamsData: SearchCarsParams };

const Cars = async ({ validParamsData }: Props) => {
  const startDate = combineDateAndTimeToUTC(
    validParamsData.deliveryDate,
    validParamsData.deliveryTime
  );
  const endDate = combineDateAndTimeToUTC(
    validParamsData.returnDate,
    validParamsData.returnTime
  );
  const seats = validParamsData.seats;
  const refinedSeats = Array.isArray(seats) ? seats : seats?.split(",");
  const fuel = validParamsData.fuel;
  const carType = validParamsData.carType;
  
  const pageNumber = +validParamsData.pageNumber;

  const carCheckoutParams: CarCheckoutParams = {
    deliveryDate: validParamsData.deliveryDate,
    deliveryTime: validParamsData.deliveryTime,
    returnDate: validParamsData.returnDate,
    returnTime: validParamsData.returnTime,
    pickupLocation: validParamsData.pickUpLocation,
    ...(validParamsData.dropOffLocation && {
      dropoffLocation: validParamsData.dropOffLocation,
    }),
  };

  const carsRes = prisma.car.findMany({
    where: {
      location: validParamsData.pickUpLocation,
      disabled: false,
    
      ...(carType && { carTypeId: carType }),
      ...(refinedSeats && { seats: { in: refinedSeats.map((seat) => +seat) } }),
      ...(fuel &&
        (Array.isArray(fuel) ? { fuel: { in: fuel } } : { fuel: fuel })),
    },
    take: TAKE_CARS,
    skip: (pageNumber - 1) * TAKE_CARS,
    include: {
      bookings: {
        where: {
          status: {
            in: ["PAID", "PENDING"],
          },
          startDate: { lte: endDate },
          endDate: { gte: startDate },
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
    },
  });

  const carsCountRes = prisma.car.count({
    where: {
      location: validParamsData.pickUpLocation,
      disabled: false,
      ...(carType && { carTypeId: carType }),
      ...(refinedSeats && { seats: { in: refinedSeats.map((seat) => +seat) } }),
      ...(fuel &&
        (Array.isArray(fuel) ? { fuel: { in: fuel } } : { fuel: fuel })),
    },
  });

  const [cars, carsCount] = await Promise.all([carsRes, carsCountRes]);

  const duration = calculateDuration(startDate, endDate);

  const refactoredCars = cars.map((car, i) => {
    const pricing = car.pricing as unknown as PricingType;
    const totalPrice = calculateRentalPrice(duration, pricing);

    const durationDescription = formatDuration(duration);

    return { ...car, totalPrice, durationDescription };
  });

  return (
    <div className="col-span-4 group-has-[[data-load='true']]:animate-pulse 0">
      {refactoredCars.length ? (
        <div>
          <Scroller />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-4 ">
            {refactoredCars.map((car) => {
              const { bookings, totalPrice, durationDescription, ...restCar } =
                car;

              const isAvailabe = checkBookingAvailability(
                bookings,
                startDate,
                endDate,
                restCar.availableCars
              );
              return (
                <FramerComponent
                  viewport={{
                    amount: 0.4,
                    once: true,
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial={"hidden"}
                  whileInView={"visible"}
                  transition={{
                    type: "spring",
                    bounce: 0.6,
                    damping:6, 
                    stiffness: 150,
                  }}
                  key={restCar.id}
                >
                  <CarCard
                  validDuration={isDurationMoreThan48Hours(startDate, endDate)}
                    booked={!isAvailabe}
                    carsCheckoutParams={carCheckoutParams}
                    car={restCar}
                    durationDescription={durationDescription}
                    totalPrice={String(totalPrice)}
                  />
                </FramerComponent>
              );
            })}
          </div>
          <div className="mt-2">
            <Pagination count={carsCount} href="/cars" />
          </div>
        </div>
      ) : (
        <div>
          <Scroller />
          <NoResult className="" title="No Cars Found" description="Call Office For Availability" />
        </div>
      )}
    </div>
  );
};

export default Cars;
