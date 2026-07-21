import { wait } from "@/lib/utils";
import Banner from "./_components/Banner";
import SearchComponent from "./_components/SearchComponent";
import { Suspense } from "react";
import Container from "./_components/Container";
import BrandsSlider from "./_components/BrandsSlider";
import Benefits from "./_components/Benefits";
import OurCars from "./_components/OurCars";
import CarsByLocation from "./_components/CarsByLocation";
import { Skeleton } from "@/components/ui/skeleton";
import { LOCATIONS_CONST } from "@/lib/Types";
import EasySteps from "./_components/EasySteps";
import Reviews from "./_components/Reviews";
import Blogs from "./_components/Blogs";
import SectionHeader from "./_components/SectionHeader";

import dynamic from "next/dynamic";
import Map from "./_components/MapContainer";
import FramerComponent from "./_components/FramerComponent";
import { Metadata } from "next";

const Locations = dynamic(() => import("./_components/Locations"));

type Props = {
  searchParams: Promise<{ pickUpLocation: (typeof LOCATIONS_CONST)[number] }>;
};

export const metadata:Metadata ={
  title:"Eagle Car Rental",
  description:"Best car rental service",
  openGraph:{
    title:"Eagle Car Rental",
    description:"Best car rental service",
  },
  icons: {
    icon: '/icon.png',  
  },
}

export default async function Home({ searchParams }: Props) {
  const location = (await searchParams).pickUpLocation;

  return (
    <div className="pb-8">
      <Banner
        label="Discover Top Cars <br/> With Just One Click."
        className="justify-end"
        labelStyles=""
      />
      {/* search component */}
      <div className="-mt-[72.5px]">
        <Suspense>
          <SearchComponent />
        </Suspense>
      </div>
      {/* Brands Slider */}
      <div className="mt-[52px]">
        <BrandsSlider />
      </div>
      {/* Benefits */}
      <div className="mt-[41px] pb-[95px]">
        <FramerComponent>
          <Benefits />
        </FramerComponent>
      </div>
      {/* Our Cars */}
      <div className="py-[95px] bg-[#F5F5F5]">
        <FramerComponent >
          <OurCars />
        </FramerComponent>

        <div className="mt-[52px]">
          <Suspense
            fallback={
              <Skeleton className="w-full h-[400px] rounded-md bg-muted-foreground" />
            }
          >
            <FramerComponent key={location}>
              <CarsByLocation  location={location} />
            </FramerComponent>
          </Suspense>
        </div>
      </div>
      {/* Easy Steps */}
      <div className="py-[52px]">
        <FramerComponent>
          <EasySteps />
        </FramerComponent>
      </div>
      {/* Locations */}
      <div id="locations" className="py-[52px]">
        <FramerComponent>
          <Map />
        </FramerComponent>
      </div>

      {/* Reviews */}
      <div className="mt-[52px]">
        <FramerComponent>
          <Reviews />
        </FramerComponent>
      </div>
      {/* Blogs */}
      <div className="mt-[52px]">
        <Container>
          <SectionHeader description="Blog" title="Review our blogs" />
          <Suspense
            fallback={
              <Skeleton className="bg-muted-foreground rounded-md min-h-[400px]" />
            }
          >
            <FramerComponent>
              <Blogs />
            </FramerComponent>
          </Suspense>
        </Container>
      </div>
    </div>
  );
}
