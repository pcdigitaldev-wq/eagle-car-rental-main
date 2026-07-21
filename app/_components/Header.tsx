import React, { Suspense } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SuperButton from "@/components/SuperButton";
import Container from "./Container";
import { getCarTypes } from "@/lib/getters";
import Link from "next/link";
import { Menu, User, UserRound } from "lucide-react";
import MenuSheet from "./MenuSheet";

type Props = {};

 
const Header = async(props: Props) => {

  const carTypes = await getCarTypes() 
  return (
    <header className=" w-full   ">
      <Container className="w-full md:w-[95vw] md:mx-auto mx-0">
        <Suspense>
        <div className="  flex items-center bg-white/85 backdrop-blur-md border-b   md:border border-t-0 p-[16px] w-full  md:p-[32px] md:rounded-bl-[16px] md:rounded-br-[16px] justify-between">
          {/* logo */}
          <Logo  className=""/>
          {/* Nav Links */}
          <div className="lg:block hidden">
          <NavLinks   carTypes={carTypes}/>
          </div>
         
          {/* My Booking */}
          <div  className="lg:block hidden relative">
            <span className="absolute     text-[10px] -top-[20px] font-[500] text-site-primary whitespace-nowrap left-1/2 translate-x-[-50%]">Call Us: {`+1(310)-294-6980`}</span>
          <SuperButton
            buttonType="linkButton"
            href="/booking"
            variant="site"
            title="My Booking"
          />
          </div>


         {/* mobile */}
         <div className="flex lg:hidden gap-3 items-center">
          <Link href={'/booking'}>
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
            <UserRound className="w-6 h-6 text-site-primary" />
          </span>
          </Link>
        
         
       <MenuSheet />
         
      

         </div>
        </div>
        </Suspense>
      </Container>
    </header>
  );
};

export default Header;
