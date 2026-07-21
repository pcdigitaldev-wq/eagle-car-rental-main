 
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
 

import React from "react";
import Filter from "./Filter";
import { FilterIcon } from "lucide-react";


type Props = {};

const SheetFilter = (props: Props) => {
  return (
    <Sheet >
      <SheetTrigger className="fixed w-full bottom-0 left-0 p-3    tracking-wider flex items-center justify-center gap-3 z-10  bg-site-primary text-white font-semibold text-xs">
        Filters <FilterIcon className="text-white w-8 h-8" />
      </SheetTrigger>
      <SheetContent title="Fitlers" side={'left'} className="  p-0 ">
        <SheetTitle className="p-6 py-3">
            Fitlers
        </SheetTitle>
        <div className="overflow-y-auto h-[90%] flex justify-start">
        <Filter sheet />
        </div>
      
      </SheetContent>
    </Sheet>
  );
};

export default SheetFilter;
