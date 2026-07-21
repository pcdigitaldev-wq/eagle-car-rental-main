import React from "react";
import Container from "./Container";
import { CreditCard, Medal, ShieldCheck, Sparkle } from "lucide-react";
import FramerComponent from "./FramerComponent";

type Props = {};

const CARDS = [
  {
    title: "Wide Range of Vehicles",
    description: "Eagle Car Rental offers a diverse fleet of vehicles, from compact cars to SUVs and luxury vehicles, ensuring you find the perfect ride for your needs.",
    Icon: <ShieldCheck className="text-site-primary" />,
  },
  {
    title: "Premium Cars Selection",
    description: "Discover and compare USA top rental cars.",
    Icon: <Sparkle className="text-site-primary" />,
  },
  {
    title: "Credit/Debit card",
    description: "Our system accepts all major debit cards ‘credit cards’ and Digital payments applepay, ensuring a hassle-free booking experience ",
    Icon: <CreditCard className="text-site-primary" />,
  },
 
];

const Benefits = (props: Props) => {
  return (
    <Container>
      <div className="px-[8px]">
        <h3 className="text-[30px] md:text-[48px] font-[800] text-site-primary capitalize w-full text-center">
          Why to choose eagle car rental?
        </h3>
        <div className="mt-[57px] w-full grid grid-cols-1 lg:grid-cols-3 gap-[27px]">
          {CARDS.map((card, index) => (
      
              <article key={`benefit-${index}`} className="rounded-[24px] px-[29px] py-[32px] border flex gap-[20px]">
                <span className="bg-[#F5F5F5] rounded-[16px] flex items-center justify-center w-[54px] shrink-0">
                  {card.Icon}
                </span>
                <div>
                  <h4 className="text-[20px] font-[700] text-site-primary capitalize clamp">
                    {card.title}
                  </h4>
                  <p className="text-[18px] text-black mt-[16px] text-sm">
                    {card.description}
                  </p>
                </div>
              </article>
         
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Benefits;
