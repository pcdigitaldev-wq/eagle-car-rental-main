import ImageComponent from "@/components/ImageComponent";
import SuperButton from "@/components/SuperButton";
import { CarCheckoutParams, PricingType } from "@/lib/Types";
import { cn } from "@/lib/utils";
import { Car } from "@prisma/client";
import { Fuel, UserRound } from "lucide-react";
import React from "react";

type Props = {
  car: Car & { carType: { title: string } };
  totalPrice?: string;
  durationDescription?: string;
  booked?:boolean
} & (
  | {
      isMainPage: true;
    }
  | { isMainPage?: false; carsCheckoutParams: CarCheckoutParams,validDuration:boolean }
);

const CarCard = ({
  car,
  totalPrice,
  durationDescription,
  isMainPage = false,
  booked,
  ...rest
}: Props) => {
  const dayPrice = (car.pricing as PricingType).days[0];
  const price = totalPrice ? totalPrice : dayPrice;
  const duration = durationDescription ? `${durationDescription}` : "USD/day";
  const validDuration = rest && 'validDuration' in rest ? rest.validDuration : undefined
  const url = isMainPage
    ? `/cars?pickUpLocation=${car.location}`
    : rest && "carsCheckoutParams" in rest
    ? `/checkout?slug=${car.slug}&${new URLSearchParams(rest.carsCheckoutParams).toString()}`
    : "/checkout";
    const preventBooking =(!isMainPage && !validDuration)
    
    
  return (
    <article className={cn("border rounded-[24px] overflow-hidden flex flex-col relative",(booked || preventBooking)  && 'grayscale-[90%] opacity-80 pointer-events-none' )}>
     {preventBooking &&  <p className="bg-black text-white text-center capitalize w-full absolute top-0 left-0 p-2 text-xs z-10">Rental Range Should Be More Than 48 Hours</p>}
      <ImageComponent
        alt="car"
        src={car.image}
        aspect="video"
        className=" w-full"
        imgClassName="object-cover"
      />
      <div className="p-[24px] bg-white flex-1 flex flex-col ">
        {/* first block */}
        {/* car name and price */}
        <div className="flex justify-between gap-3 items-start">
        <p className="flex items-start flex-col  capitalize gap-1  ">
          <span className="text-[20px] font-[600] leading-[18px]">{car.carType.title}</span>
          <span className="text-[10px] ">{`(${car.subTitle})`}</span>
        </p>
        {/* <div>
        <p className="font-[600] text-xs">YEAR {car.carYear}</p>
        </div>   */}
        </div>
    
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col justify-center gap-[15px] items-center">
            <p
              className={cn(
                "flex capitalize  gap-1 leading-[19.2px]",
                durationDescription && "flex-col items-start"
              )}
            >
              <span className="text-[32px] font-[800]">
                {price}{" "}
                {durationDescription && (
                  <span className="text-black/50 text-[16px] font-normal">
                    USD
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "text-black/50 text-[16px]",
                  durationDescription && "text-xs"
                )}
              >
                {duration}
              </span>
            </p>
          </div>
          {/* Review */}
          <div className="flex items-center flex-col">
            <span className="font-[500] text-[14px]">Reviews</span>
            <span className="bg-site-primary text-white flex items-center justify-center w-[56px] h-[52px] rounded-[5.4px]">
              5.0
            </span>
          </div>
        </div>
        {/* second block */}
        <div className="bg-[#F6F6F6] py-[8px] px-[16px] flex justify-center gap-[21px] mt-[18px] rounded-[16px]">
          <span className="flex flex-col items-center gap-[8.5px] text-[#545454] text-[14px] font-[500]">
            <Fuel className="w-[20px] h-[20px]" />
            {car.fuel}
          </span>

          <span className="flex flex-col items-center gap-[8.5px] text-[#545454] text-[14px] font-[500]">
            <UserRound className="w-[20px] h-[20px]" />
            {car.seats}
          </span>
        </div>
        <SuperButton

          buttonType="linkButton"
          scroll={true}
          href={url}
          className="mt-[12px] w-full rounded-full"
          title={ booked ? "Not Available" : "Book Now"}
        />
      </div>
    </article>
  );
};

export default CarCard;
