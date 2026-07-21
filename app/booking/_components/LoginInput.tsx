"use client";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const LoginInput = ({ onChange, title, value, placeholder }: Props) => {
  return (
    <div className="flex p-[6px] border rounded-lg items-center w-full">
      <span className="shrink-0 border-r-2 pr-3">{title}</span>
      <Input
        className="border-none flex-1 focus-visible:ring-0 shadow-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LoginInput;
