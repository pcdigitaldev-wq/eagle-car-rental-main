import React from "react";
import Banner from "../_components/Banner";
import Container from "../_components/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BrandsSlider from "../_components/BrandsSlider";

type Props = {};

const FAQs =[
  {
    Q: "What type of car we are renting?",
    A: "We do rent all types of cars, full-size cars, mid-size cars, mini vans, sports cars, mid-size and full-size SUVs. Call the office if you have any further questions."
  },
  {
    Q: "What is required to rent a car?",
    A: "We need a valid driver's license, a photo of the license with your picture, or a passport to verify your identity. A valid form of payment (debit or credit card) is required. We can do cross rental, but the cardholder must be present at the time of payment."
  },
  {
    Q: "Can I use a debit card?",
    A: "Yes, you can use a debit card to rent the car with Eagle Car Rental."
  },
  {
    Q: "Can I use a cash deposit to rent a car?",
    A: "Yes, you can use cash as a deposit. However, for the rental transaction, we still need a bank card, debit card, or credit card. For other forms of payment, call the office at 310-294-6980."
  },
  {
    Q: "Can an underage driver or someone under 25 years old rent a car at Eagle Car Rental?",
    A: "Yes, an underage driver can rent a car at Eagle Car Rental. The renter must have valid personal auto insurance at the time of rental."
  },
  {
    Q: "Do I need auto insurance to rent a car with Eagle Car Rental?",
    A: "Yes, customers from the USA and Canada must provide proof of active auto insurance. International customers are not required to provide insurance proof."
  },
  {
    Q: "Can I rent a car without insurance?",
    A: "Call the office for insurance-related questions at +1 310-294-6980."
  },
  {
    Q: "Can I drop the car at another location or opt for a one-way rental?",
    A: "Yes, Eagle Car Rental allows one-way rentals to another airport within the USA. You must confirm the one-way drop-off fee at the office and inform the rental agent where you plan to drop off the car. The one-way fee can range from $500 to $4500, depending on the drop-off location."
  },
  {
    Q: "Who is responsible for parking violations during the rental period?",
    A: "The renter or driver of the vehicle is legally responsible for all parking and other violations that occur during the rental agreement period."
  },
  {
    Q: "Who is responsible for lost items in the rental car?",
    A: "The customer or renter is responsible for taking care of their belongings before dropping off the vehicle."
  },
  {
    Q: "How and where can I make a rental inquiry or complaint?",
    A: "You can make an inquiry or complaint by emailing the management. They will respond within 24 to 48 hours."
  }
]

const FAQPage = (props: Props) => {
  return (
    <div>
      <Banner label="FAQ" />
      <div className="mt-[52px]">
        <Container>
          <Accordion type="multiple">
            {FAQs.map((FAQ, index) => {
              return (
                <AccordionItem
                  key={`FAQ-${index}`}
                  value={`item-${index + 1}`}
                  className="border-b-0 border rounded-[16px] px-[16px] mb-[16px]"
                >
                  <AccordionTrigger>{FAQ.Q}</AccordionTrigger>
                  <AccordionContent className="text-[#727272] text-[14px] font-[400] max-w-[770px] ">
                    {FAQ.A}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
          {/* Brands Slider */}
          <div className="mt-[52px]">
            <BrandsSlider />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default FAQPage;
