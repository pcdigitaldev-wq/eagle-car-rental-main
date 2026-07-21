import ImageComponent from "@/components/ImageComponent";
import { LocationType } from "@/lib/Types";
import { cn, formatToDollar, getOneWayFee } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  image: string;
  subTitle: string;
  formattedStartDate: string;
  formattedEndDate: string;
  rentalPrice: number;
  deposit: number;
  payLater: number;
  payNow: number;
  totalAmount: number;
  extraOptions: { id: string; price: string; title: string,daily:boolean }[];
  totalDays:number
  oneWayFee:boolean,
  pickUpLocation:LocationType,
  dropOffLocation:LocationType | undefined
};

const Summary = ({
  image,
  extraOptions,
  subTitle,
  formattedEndDate,
  formattedStartDate,
  rentalPrice,
  payLater,
  payNow,
  deposit,
  totalAmount,
  totalDays,
  oneWayFee,
  pickUpLocation,
  dropOffLocation
}: Props) => {

  console.log("SUMMARY_ONE_WAY_FEE",oneWayFee)
  const {oneWayFeePrice} = getOneWayFee({pickupLocation:pickUpLocation, dropOffLocation})
  return (
    <div className="rounded-[16px] p-[50px] border bg-white self-start sticky top-[30px] max-h-[670px] overflow-y-auto smoothScroll">
      <SummaryBlockWrapper>
        <h3 className="font-[700] text-[24px] ">Booking Summary</h3>
      </SummaryBlockWrapper>

      <SummaryBlockWrapper>
        <div className=" flex gap-[23px] items-center ">
          <div className="w-[120px] h-[101px] relative">
            <ImageComponent
              src={image}
              alt="car-image"
              aspect="square"
              imgClassName="object-contain"
              className="w-full h-full rounded-[12px] overflow-hidden  z-10"
            />
            <ImageComponent
              src={image}
              alt="car-image"
              aspect="square"
              className="w-full h-full rounded-[12px] overflow-hidden  absolute top-0 left-0 blur-[1px]"
            />
          </div>

          <div className="">
            <h3 className="fint-[500] text-[16px]">{subTitle}</h3>
            <p className="text-[14px] text-muted-foreground">
              Pickup Date: {formattedStartDate}
            </p>
            <p className="text-[14px] text-muted-foreground">
              Return Date: {formattedEndDate}
            </p>
          </div>
        </div>
      </SummaryBlockWrapper>

      <SummaryBlockWrapper>
        <SummaryElement
          label="Rental Price"
          value={formatToDollar(rentalPrice)}
        />
        <SummaryElement label="Deposit" value={formatToDollar(deposit)} />
        <p className="text-[10px] text-[#ACACAC]">
          Non-Refundable if you dont show up
        </p>
      </SummaryBlockWrapper>
 
        {!!(!!extraOptions.length || !!oneWayFee) && <SummaryBlockWrapper>
          {!!oneWayFee &&   <SummaryElement
            
              label={"One Way Fee"}
              value={formatToDollar(oneWayFeePrice)}
             
            />}
          {extraOptions.map((option) => (
            <SummaryElement
              key={`extra-option-summary-${option.id}`}
              label={option.title}
              value={formatToDollar(+option.price)}
              suffix={option.daily? `x${totalDays}` : undefined}
            />
          ))}
        </SummaryBlockWrapper>}
     

      <SummaryBlockWrapper>
        <SummaryElement
          label="Total Amount"
          value={formatToDollar(totalAmount)}
        />
      </SummaryBlockWrapper>

      <SummaryBlockWrapper>
        <SummaryElement label="Pay Now" value={formatToDollar(payNow)} isBold />
        <p className="text-[10px] text-[#ACACAC]">
          Overall price that you will pay now via checkout
        </p>
        <SummaryElement
          label="Pay Later"
          value={formatToDollar(payLater)}
          isBold
        />
        <p className="text-[10px] text-[#ACACAC]">
          Overall price that you will pay at the rental company
        </p>
      </SummaryBlockWrapper>
    </div>
  );
};

export default Summary;

const SummaryElement = ({
  label,
  value,
  isBold,
  suffix
}: {
  label: string;
  value: string;
  isBold?: boolean;
  suffix?:string
}) => {
  return (
    <div className="flex items-center justify-between">
      <p className={cn("text-[#ACACAC]", isBold && "text-black font-[500]")}>
        {label}
      </p>
      <p className={cn("font-[500] flex   gap-1", isBold && "font-[700] text-[24px] ")}>
        {value}
        {suffix && <span className=" font-[400]">{suffix}</span>}
      </p>
  
    </div>
  );
};

const SummaryBlockWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("mt-[24px] pb-[20px] border-b border-[#ACACAC]", className)}
    >
      {children}
    </div>
  );
};
