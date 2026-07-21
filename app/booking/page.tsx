import ImageComponent from "@/components/ImageComponent";
import React from "react";
import BookingLogin from "./_components/BookingLogin";

type Props = {
  searchParams:Promise<{bookingId:string | undefined,email:string | undefined}>
};

const AboutUsPage = async ({searchParams}: Props) => {

  const params = await searchParams
  return (
    <div className="fixed top-0 left-0 w-full h-full z-30 grid grid-cols-1 lg:grid-cols-4 bg-white">
      <div className="col-span-2 relative h-full hidden lg:block">
        <div className="w-full h-full absolute bg-black/20 top-0 left-0 z-20" />
        <ImageComponent
          src="/whiteLogo.png"
          alt="logo"
          aspect="video"
          className="w-[175px] bottom-[50px] left-1/2 -translate-x-[50%] absolute z-30"
          imgClassName="object-contain"
        />
        <ImageComponent
          src={"/bookingLogin.png"}
          className="w-full h-full "
          aspect="square"
          imgClassName="object-cover"
          alt="booking placeholder"
        />
      </div>
      <div className="col-span-2">
        <BookingLogin  bookingIdParam={params.bookingId} emailParam={params.email}/>
      </div>
    </div>
  );
};

export default AboutUsPage;
