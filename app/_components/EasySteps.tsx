import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  CarFront,
  CreditCard,
  Icon,
  KeyRound,
} from "lucide-react";
import React from "react";
import Container from "./Container";
import ImageComponent from "@/components/ImageComponent";
import SectionHeader from "./SectionHeader";

type Props = {};
const EASY_STEPS = [
  {
    title: "Choose your car.",
    description: "Choose the car you want, according to your request.",
    Icon: <CarFront className="text-[#494949] w-[41px] h-[45px] " />,
  },
  {
    title: "Set the delivery date.",
    description: "Choose your desired date from the calendar and book",
    Icon: <CalendarCheck className="text-[#494949] w-[41px] h-[45px] " />,
  },
  {
    title: "Payment",
    description:
      "You can pay the rent through online wallet, Apple Pay, Debit Card and other form of payment.",
    Icon: <CreditCard className="text-[#494949] w-[41px] h-[45px] " />,
  },
  {
    title: "Get the car.",
    description: "Get your car at the appointed time and place.",
    Icon: <KeyRound className="text-[#494949] w-[41px] h-[45px] " />,
  },
];

const EasySteps = (props: Props) => {
  return (
    <section className=" ">
        <SectionHeader title="In 4 easy steps this is" description=" How to rent a car with Eagle Car Rental" />
    
      <Container className="mt-[130px]">
        <div className="  grid grid-cols-1 lg:grid-cols-2 h-[800px] relative">
            <div className="bg-[#DE2127]  w-[47px] h-full absolute left-1/2 -translate-x-[50%] hidden xl:block" />
          <ImageComponent
            src="/easy-steps.png"
            alt="easy-steps"
            className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full hidden xl:block"
            aspect="square"
            imgClassName="object-contain"
          />
          {EASY_STEPS.map((easyStep, index) => {
            return (
              <EasyStepCard
                index={index}
                key={`easy-step-${index}`}
                easyStep={easyStep}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default EasySteps;

const EasyStepCard = ({
  easyStep,

  index,
}: {
  easyStep: { title: string; description: string; Icon: React.ReactNode };

  index: number;
}) => {
  const { Icon } = easyStep;
  return (
    <article
      className={cn(
        "flex items-center gap-[16px] h-fit relative",
        !(index % 2 === 0) && "flex-row-reverse"
      )}
    >
      <span
        className={`absolute -z-[1] -top-[125px] ${
          index % 2 !== 0 ? "lg:-right-[24px] right:0" : "lg:-left-[25px] left-0"
        } text-[120px] text-stroke font-[700] text-white`}
      >
        {index + 1}
      </span>
      <div className="flex items-center justify-center w-[80px] h-[80px] border rounded-[16px] bg-white shrink-0">
        {" "}
        {Icon}
      </div>

      <div className="max-w-[300px] ">
        <p className="text-md lg:text-[24px] font-[700] text-site capitalize text-site-primary line-clamp-1">
          {easyStep.title}
        </p>
        <p className="text-[#5E5E5E] text-xs lg:text-[16px] font-[500]">
          {easyStep.description}
        </p>
      </div>
    </article>
  );
};
