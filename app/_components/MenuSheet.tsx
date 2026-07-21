'use client'
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { links } from "./NavLinks";
import Link from "next/link";
 
type Props = {};


const menuLinks = [
    {
        label: "home",
        href: "/",
      },
      {
        label: "about us",
        href: "/about-us",
      },
      {
        label: "all vehicles",
        href: "/cars",
      },
    
]


const contentLinks  =[
    {
        label: "blog",
        href: "/blog",
      },
    {
        label: "FAQs",
        href: "/faq",
      },
    {
        label: "contact us",
        href: "/contact-us",
      },
    {
        label: "Locations",
        href: "/#locations",
        fn:(id: string) => {
            const section = document.getElementById(id);
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }
      },
]


const MenuSheet = (props: Props) => {

    const [mounted, setMounted] = useState(false)

useEffect(()=>{
    setMounted(true)
},[])

if(!mounted) return null
  return (
    <Sheet>
      <SheetTrigger>
        {" "}
        <Menu className="w-10 h-10 text-site-primary" />
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-3 items-start">
          {menuLinks.map((link, index) => {
            if (link.href) {
              return (
                <SheetClose asChild  key={`link-${index}`}>
                  <Link
                    href={link.href}
                    className="text-[#353535] text-[16px] capitalize font-[500]"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              );
            }
          })}
        </div>
        <div className="mt-12 flex flex-col gap-3 items-start">
        {contentLinks.map((link, index) => {
            if (link.href) {
              return (
                <SheetClose asChild  key={`content-link--${index}`}>
                  <Link
                  scroll={true}
                    href={link.href}
                    className="text-[#353535] text-[16px] capitalize font-[500]"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              );
            }
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
