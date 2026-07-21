"use client";
import { convertDateToISOString } from "@/lib/date";
import { afterTomorrow, DEFAULT_LOCATION, DEFAULT_TIME, LOCATIONS_CONST, LOCATIONS_MAP, tomorrow } from "@/lib/Types";
import { generateTimeSlots } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

export const useSearchComponent = (isSearchCars?: boolean) => {
  // Hooks
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Utility function to fetch query params
  const getQueryParam = (key: string) => searchParams.get(key) ?? "";



  // States initialized from query params
  const [pickUpLocation, setPickUpLocation] = useState(
    getQueryParam("pickUpLocation") || (isSearchCars ? DEFAULT_LOCATION : "")
  );
  const [dropOffLocation, setDropOffLocation] = useState(
    getQueryParam("dropOffLocation")
  );
  const [deliveryDate, setDeliveryDate] = useState(
    getQueryParam("deliveryDate") ||
      (isSearchCars ? convertDateToISOString(tomorrow) ?? "" : "")
  );
  const [deliveryTime, setDeliveryTime] = useState(
    getQueryParam("deliveryTime") || (isSearchCars ? DEFAULT_TIME : "")
  );
  const [returnDate, setReturnDate] = useState(
    getQueryParam("returnDate") ||
      (isSearchCars ? convertDateToISOString(afterTomorrow) ?? "" : "")
  );
  const [returnTime, setReturnTime] = useState(
    getQueryParam("returnTime") || (isSearchCars ? DEFAULT_TIME : "")
  );
  const [isDropOff, setIsDropOff] = useState(
    getQueryParam("isDropOff") === "true"
  );

  // Memoized values
  const locations = useMemo(
    () =>
      LOCATIONS_CONST.map((location) => ({
        value: location,
        label: LOCATIONS_MAP[location],
      })),
    []
  );

  const hours = useMemo(() => generateTimeSlots(30), []);

  // Sync state with URL when query params change
  useEffect(() => {
    setPickUpLocation(
      getQueryParam("pickUpLocation") || (isSearchCars ? DEFAULT_LOCATION : "")
    );
    setDropOffLocation(getQueryParam("dropOffLocation"));
    setDeliveryDate(
      getQueryParam("deliveryDate") ||
        (isSearchCars ? convertDateToISOString(tomorrow) ?? "" : "")
    );
    setDeliveryTime(
      getQueryParam("deliveryTime") || (isSearchCars ? DEFAULT_TIME : "")
    );
    setReturnDate(
      getQueryParam("returnDate") ||
        (isSearchCars ? convertDateToISOString(afterTomorrow) ?? "" : "")
    );
    setReturnTime(
      getQueryParam("returnTime") || (isSearchCars ? DEFAULT_TIME : "")
    );
    setIsDropOff(getQueryParam("isDropOff") === "true");


 
  }, [searchParams]);

  // Push query params to URL only if changes are detected
  const handlePush = () => {
    const fields = [
      { value: pickUpLocation, name: "Pick Up Location" },
      { value: deliveryDate, name: "Delivery Date" },
      { value: deliveryTime, name: "Delivery Time" },
      { value: returnDate, name: "Return Date" },
      { value: returnTime, name: "Return Time" },
    ];
    
    if (isDropOff) {
      fields.push({ value: dropOffLocation, name: "Drop Off Location" });
    }
    
    const missingFields = fields.filter(field => !field.value).map(field => field.name);
    
    if (missingFields.length > 0) {
      toast.warning("Please Choose All Required Fields", {
        description: missingFields.join(", "),
        duration:8000,
        closeButton:true,
        position:'top-center'
      });
      return;
    }
    const params = new URLSearchParams(searchParams); // Get current params

    // Create queryParams object based on state
    const queryParams = {
      pickUpLocation,
      dropOffLocation : isDropOff ? dropOffLocation : null,
      deliveryDate,
      deliveryTime,
      returnDate,
      returnTime,
      isDropOff: isDropOff ? "true" : null, // Convert boolean to string
    };

    // Check if any changes have been made
    let hasChanges = false;
    Object.entries(queryParams).forEach(([key, value]) => {
      const currentValue = params.get(key); // Current value in URL
      if ((value && value !== currentValue) || (!value && currentValue)) {
        hasChanges = true; // Change detected
      }
    });

    if (!hasChanges) {
      console.log("No Change");
      return;
    } // Exit early if no changes

    // Update query params
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString()); // Set new value
      } else {
        params.delete(key); // Remove param if null
      }
    });
    startTransition(() => {
      // Push updated URL
      router.push(`/cars?${params.toString()}`, { scroll: false });
    });
  };

  // Reset Filters
  const resetFilters = () => {
    setPickUpLocation("");
    setDropOffLocation("");
    setDeliveryDate("");
    setDeliveryTime("");
    setReturnDate("");
    setReturnTime("");
    setIsDropOff(false);
    router.push("/cars", { scroll: false }); // Clear all query params
  };

  return {
    deliveryDate,
    deliveryTime,
    dropOffLocation,
    pickUpLocation,
    returnDate,
    returnTime,
    setPickUpLocation,
    setDropOffLocation,
    setDeliveryDate,
    setDeliveryTime,
    setReturnDate,
    setReturnTime,
    isDropOff,
    setIsDropOff,
    locations,
    hours,
    handlePush,
    resetFilters,
    pending,
  };
};
