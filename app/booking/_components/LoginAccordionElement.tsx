import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  item: string;
};

const LoginAccordionElement = ({ children, title, item }: Props) => {
  return (
    <AccordionItem className="border-b-0 mb-[15px]" value={item}>
      <AccordionTrigger className="text-[21px] font-[500] bg-[#F7F7F7] hover:no-underline px-[23px] py-[16px] border-b-none">
        {title}
      </AccordionTrigger>
      <AccordionContent className="  mt-[12px] ">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};

export default LoginAccordionElement;
