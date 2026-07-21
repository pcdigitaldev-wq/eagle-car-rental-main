"use client";
import React from "react";
import Container from "./Container";
import { cn } from "@/lib/utils";
import { useSearchComponent } from "../hooks/useSearchComponent";
import ComboBoxField from "./ComboBoxField";
import SuperButton from "@/components/SuperButton";
import PopOverField from "./PopOverField";
import { Search } from "lucide-react";
import DateField from "./DateField";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  className?: string;
  isSearchCars?:boolean
};

const SearchComponent = ({ className,isSearchCars }: Props) => {
  const {
    deliveryDate,
    deliveryTime,
    dropOffLocation,
    pickUpLocation,
    returnDate,
    returnTime,
    setDeliveryDate,
    setDeliveryTime,
    setDropOffLocation,
    setPickUpLocation,
    setReturnDate,
    setReturnTime,
    isDropOff,
    setIsDropOff,
    locations,
    hours,
    pending,
    handlePush
  } = useSearchComponent(isSearchCars);
  return (
    <div className={cn("", className)}>
      <Container>
        <div className="w-full   flex  gap-[16px] flex-col lg:flex-row  px-[24px] py-[32px] rounded-[16px] bg-[#FCFDFD] shadow-lg relative  items-center ">
          <div className="w-full flex flex-col">
            <div
              className={cn(
                " grid grid-cols-1 lg:grid-cols-6 gap-[16px]  items-center w-full",
                !isDropOff && "lg:grid-cols-5"
              )}
            >
              <ComboBoxField
                items={locations}
                param="pickUpLocation"
                placeholder="Choose Location"
                push={false}
                setValue={(val: string) => setPickUpLocation(val)}
                value={pickUpLocation}
                stateLabel="Pick Up Location"
              />
              {isDropOff && (
                <ComboBoxField
                  items={locations}
                  param="dropOffLocation"
                  placeholder="Choose Location"
                  push={false}
                  setValue={(val: string) => setDropOffLocation(val)}
                  value={dropOffLocation}
                  stateLabel="Drop Off Location"
                />
              )}

              <DateField
                value={deliveryDate}
                setValue={(val: string) => setDeliveryDate(val)}
                placeholder="Delivery Date"
                stateLabel="Delivery Date"
              />
              <PopOverField
                items={hours}
                setValue={(val: string) => setDeliveryTime(val)}
                value={deliveryTime}
                placeholder="Delivery Time"
                stateLabel="Delivery Time"
              />
              <DateField
                value={returnDate}
                setValue={(val: string) => setReturnDate(val)}
                placeholder="Return Date"
                stateLabel="Return Date"
                startDate={deliveryDate}
              />
              <PopOverField
                items={hours}
                setValue={(val: string) => setReturnTime(val)}
                value={returnTime}
                placeholder="Return Time"
                stateLabel="Return Time"
              />
            </div>
            {/* Is Drop off */}
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                checked={isDropOff}
                onCheckedChange={() => {
                  if(!isDropOff){
                    setDropOffLocation('')
                  }
                  setIsDropOff(!isDropOff)}}
                id="isDropOff"
              />
              <label
                htmlFor="isDropOff"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Drop-off Location
              </label>
            </div>
          </div>

          <SuperButton
          variant={'site'}
            className="w-full lg:w-auto  h-[80px]"
            buttonType="loadingButton"
            loading={pending}
            clickHandler={()=>new Promise<void>(r=>{handlePush()})}
            Icon={<Search className="icon" />}
          />
        </div>
      </Container>
    </div>
  );
};

export default SearchComponent;
