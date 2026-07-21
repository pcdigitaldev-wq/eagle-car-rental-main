import React from "react";
import Container from "./Container";
import prisma from "@/lib/prisma";
import { LOCATIONS_CONST } from "@/lib/Types";
import CarCard from "./cards/CarCard";
import NoResult from "./NoResult";
import SuperButton from "@/components/SuperButton";
import { ArrowRight } from "lucide-react";

type Props = {
  location: (typeof LOCATIONS_CONST)[number];
};

const CarsByLocation = async ({ location }: Props) => {
  const adjustedLocation = location ?? LOCATIONS_CONST[0];
  const cars = await prisma.car.findMany({
    where: {
      location: adjustedLocation,
    },
    take:3,
    include: {
      carType: {
        select: {
          title: true,
        },
      },
    },
  });

  return (
    <Container className="flex flex-col">
      {!cars.length && (
        <NoResult title="No Cars" description="No cars in this location" />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] px-1 sm:px-0">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} isMainPage />
        ))}
      </div>

      <SuperButton
        className="mt-[68px] rounded-full mx-auto w-fit h-[56px] px-[40px]"
        buttonType="linkButton"
        Icon={<ArrowRight className="icon" />}
        href={`/cars?pickUpLocation=${adjustedLocation}`}
        title="See More"
      />
    </Container>
  );
};

export default CarsByLocation;
