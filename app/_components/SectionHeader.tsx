import React from "react";
import FramerComponent from "./FramerComponent";

type Props = { title: string; description: string };

const SectionHeader = ({ title, description }: Props) => {
  return (
    <div>
 
        <p className="w-fit mx-auto   text-[24px] font-[400]  text-[#5E5E5E] text-center">
          {title}
        </p>
 

    
        <p className="mt-[8px] text-site-primary font-[700] text-[32px] w-fit mx-auto text-center">
          {description}
        </p>
 
    </div>
  );
};

export default SectionHeader;
