import React from "react";
import SectionHeader from "./SectionHeader";
import Container from "./Container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

type Props = {};

const REVIEWS = [
  {
    name: "John Carter",
    stars: 5,
    description:
      "Seamless booking process and great customer service! The website was easy to navigate, and I had no issues finding the perfect car for my trip. Highly satisfied with the smooth pick-up and drop-off experience.",
    date: "12/03/2023",
  },
  {
    name: "Emily Roberts",
    stars: 4,
    description:
      "Amazing Experince!",
    date: "22/07/2023",
  },
  {
    name: "Michael Stevens",
    stars: 5,
    description:
      "The car was clean, well-maintained, and ready on time. The rental process was quick, and the support team was responsive to all my queries. I will definitely be using their services again for future trips.",
    date: "15/08/2023",
  },
  {
    name: "Sarah Thompson",
    stars: 4,
    description:
      "Quick and easy process with helpful staff. I appreciated the straightforward pricing and transparency. My only suggestion would be to expand the luxury car options for special occasions.",
    date: "03/09/2023",
  },
  {
    name: "David Wilson",
    stars: 5,
    description:
      "Excellent service and very friendly staff. The vehicle was spotless and drove like a dream. The team even offered free upgrades and additional amenities, making my experience truly exceptional.",
    date: "10/11/2023",
  },
];
const Reviews = (props: Props) => {
  return (
    <div>
      <SectionHeader
        title="This is what our clients says about us"
        description="Reviews"
      />
      <Container className="mt-24 px-12">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full  "
        >
          <CarouselContent className="w-full py-[10px]">
            {REVIEWS.map((review, index) => (
              <CarouselItem
                key={`Review-${index}`}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <ReviewCard
                  date={review.date}
                  description={review.description}
                  name={review.name}
                  stars={review.stars}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Container>
    </div>
  );
};

export default Reviews;

const ReviewCard = ({
  date,
  description,
  name,
  stars,
}: {
  name: string;
  stars: number;
  description: string;
  date: string;
}) => {
  const grayStarts = 5 - stars;
  return (
    <article className="p-8 rounded-md shadow-md border flex flex-col gap-3 h-full select-none">
      {/* header */}
      <div className="flex items-center gap-3">
        <h4 className="text-xs font-[600]">{name}</h4>
        <div className="flex items-center">
          {Array.from({ length: stars }).map((_, index) => (
            <Star
              key={`golden-star-${index}`}
              className="w-3 h-3 fill-[gold] text-[gold]"
            />
          ))}
          {Array.from({ length: grayStarts }).map((_, index) => (
            <Star
              key={`gray-star-${index}`}
              className="w-3 h-3 fill-[gray] text-[gray]"
            />
          ))}
        </div>
      </div>

      {/* content */}
      <p className="text-xs text-[#4e4e4e] font-[500]">{date}</p>
      <p className="text-black text-xs">{description}</p>
    </article>
  );
};
