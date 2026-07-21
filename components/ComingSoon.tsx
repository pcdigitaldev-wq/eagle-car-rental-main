import React from "react";
import ImageComponent from "./ImageComponent";

type Props = {};

const ComingSoon = (props: Props) => {
  return (
    <div className="h-screen w-full bg-site-primary flex items-center justify-center flex-col">
      <ImageComponent
        src="/Logo_White.png"
        aspect="video"
        alt="logo"
        className="w-[300px]"
        imgClassName="object-contain"
      />
      <p className="text-md font-semibold capitalize text-white animate-pulse">
        Coming Soon
      </p>
    </div>
  );
};

export default ComingSoon;
