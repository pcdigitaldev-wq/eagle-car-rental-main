"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition, useRef } from "react";

type Props = {
  param: string;
  initialValue?: string;
  placeholder?:string
};

const InputFilterItem = ({ initialValue, param,placeholder }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
    const [pending, startTransition] = useTransition()
  const [value, setValue] = useState<string>(initialValue || "");
  const [debounceValue, setDebounceValue] = useState<string>(initialValue || "");

  const isMounted = useRef(false);

  // Debounce input changes to avoid excessive updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, 1500); 

    return () => clearTimeout(timer); // Cleanup timeout on unmount or re-render
  }, [value]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const paramValue = params.get(param);

    if (paramValue === null) {
      setValue(""); // Reset the input when the parameter is deleted
    }
  }, [searchParams, param])


  // Update URL params when debounceValue changes
  useEffect(() => {

    if (!isMounted.current) {
        isMounted.current = true; // Set the flag after the first render
        return;
      }
    const params = new URLSearchParams(searchParams);

    if (!debounceValue) {
      params.delete(param);
    } else {
      params.set(param, debounceValue);
    }
    startTransition(()=>{
        router.push(`/cars?${params.toString()}`,{scroll:false});
    })

  
  }, [debounceValue]);

  return (
    <div  data-load={pending ? "true" : undefined} className="flex flex-col gap-1">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Filter by ${ placeholder ?? param}`}
      />
    </div>
  );
};

export default InputFilterItem;
