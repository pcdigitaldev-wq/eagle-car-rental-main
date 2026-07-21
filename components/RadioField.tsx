"use client";

import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import { PAYMENT_METHOD_CONST } from "@/lib/Types";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  labelStyles?: string;
  id:string,
};

const RadioField = <T extends FieldValues>({
  form,
  label,
  name,
  id,
  labelStyles,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-2">
            <div className="flex items-center gap-1">
                  <input   
                    type="radio"
                    id={id}
                    name="paymentMethod"
                    value={id}
                    onChange={()=>{form.setValue(name,id as PathValue<T, Path<T>>)}}
                    className="cursor-pointer accent-black"
                  />
                  <label htmlFor={id} className="cursor-pointer font-[400] text-[14px]">
                    {label}
                  </label>
                  
                </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RadioField;
