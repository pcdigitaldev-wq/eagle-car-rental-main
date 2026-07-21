import React from "react";
import Banner from "../_components/Banner";
import { Headset, Receipt } from "lucide-react";
import Container from "../_components/Container";
import ImageComponent from "@/components/ImageComponent";
import { cn } from "@/lib/utils";

type Props = {};

const INFO = [
  {
    title: "Who are we ?",
    content: `Eagle Car Rental is your trusted choice for car rentals across the USA, offering a diverse range of reliable and stylish vehicles for every occasion. Whether you're heading out for business, leisure, or a road trip adventure, we provide top-notch service, comfort, and convenience. At Eagle Car Rental, every journey is made simple, seamless, and memorable. Discover the freedom of the open road with a car perfectly suited to your needs.`,
    image: "/about-us-first.png",
    Icon: <Receipt className="text-white w-[53px] h-[53px]" />,
    badgeTitle: "Best prices in USA",
  },
  {
    title: "What do we offer ?",
    content: `At Eagle Car Rental, we specialize in car hire across the USA, offering a diverse selection of reliable and comfortable vehicles. Whether you're looking to rent a sedan, an SUV, or a convertible, we have you covered. Our fleet includes only the best in performance and dependability, providing car rentals that suit every need. From compact cars to spacious models, each vehicle is meticulously maintained to ensure a smooth driving experience. Discover the freedom of the road with Eagle Car Rental, where every journey is designed for your convenience and comfort.`,
    image: "/about-us-second.png",
    Icon: <Headset className="text-white w-[53px] h-[53px]" />,
    badgeTitle: "24/7 costumer service",
  },
];

const BookingPage = (props: Props) => {
  return (
    <div className="pb-12">
      <Banner label="About Us" />
      <Container className="mt-[106px] space-y-[60px]">
        {INFO.map((info, index) => {
          const Icon = info.Icon;
          return (
            <article
              key={info.title}
              className={cn("grid grid-cols-1 lg:grid-cols-2 gap-[87px]")}
            >
              <ImageComponent
                src={info.image}
                alt="info-car"
                className={cn(
                  "w-full rounded-[25px] overflow-hidden h-full",
                  index % 2 !== 0 && "lg:order-last"
                )}
                aspect="video"
              />
              <div className="flex flex-col gap-[24px] ">
                <h3 className="text-[#052206] text-[40px] font-[700]">
                  {info.title}
                </h3>
                <p className="text-[#052206] font-[500] texst-[16px]">
                  {info.content}
                </p>
                <div className="flex items-center gap-[12px]">
                  <span className="w-[80px] h-[80px] flex items-center  justify-center rounded-full bg-site-primary">
                    {Icon}
                  </span>
                  <p className="text-[#052206] font-[600] text-[22px]">
                    {info.badgeTitle}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </Container>
    </div>
  );
};

export default BookingPage;
