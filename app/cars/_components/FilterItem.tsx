"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState, useTransition } from "react";

type Props = {
  title: string;
  value: string;
  isChecked: boolean;
  param: string;
  className?:string
};

const FilterItem = ({ title, isChecked, param, value ,className}: Props) => {
  const [pending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [localChecked, setLocalChecked] = useState(isChecked);

  useEffect(()=>{
    setLocalChecked(isChecked)
  },[isChecked])

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    const values = params.getAll(param);

    const newValues = values.includes(value)
      ? values.filter((el) => el !== value)
      : [...values, value];

    if (newValues.length) {
      params.delete(param);
      newValues.forEach((v) => params.append(param, v))
    } else {
      params.delete(param);

    }
    params.set('pageNumber','1')
    console.log("!!!VALUES",newValues)
    console.log("!!!VALUES JOINED",newValues.join(','))
    setLocalChecked(() => !localChecked);

    startTransition(() => {
      router.push(`/cars?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div
    onClick={handleClick}
    data-load={pending ? "true" : undefined} className={cn("flex items-center justify-between cursor-pointer hover:bg-muted px-3 py-1 rounded-md",className)}>
      <Label
        htmlFor={`filter-checkbox-${title}`}
        className="text-[14px] font-[500] text-[#494949]  capitalize"
      >
        {title}
      </Label>
      <Checkbox
      className="data-[state=checked]:bg-site-primary"
        id={`filter-checkbox-${title}`}
        checked={localChecked}
      
      />
    </div>
  );
};

export default FilterItem;
