import React from "react";
import Banner from "../_components/Banner";
import Container from "../_components/Container";
import { cn } from "@/lib/utils";
import ContactUsForm from "./_components/ContactUsForm";
import Map from "../_components/MapContainer";

type Props = {};

const ContactUsPage = (props: Props) => {
  return (
    <div>
      <Banner label="Contact Us" />
      <Container className="mt-[57px]">
        {/* <h3 className="text-[48px] font-[700]">Get in Touch</h3>
        <p className="mt-[32px] font-[700] text-[24px]">
          Customer Service Hours
        </p>
        <Item
          title="Monday to Friday:"
          content="9:00 AM to 6:00 PM"
          className="mt-[32px]"
        />
        <Item title="Saturday & Sunday:" content="Closed" />
        <p className="mt-[32px] font-[700] text-[24px]">Contact Information</p>
        <Item title="Phone:" content="+123-456-7890" className="mt-[32px]" />
        <Item title="Email:" content="info@eaglecarrental.com" />
        <Item title="Address:" content=" 123 Luxury Drive, City, Countr" /> */}
        <Map />
        <p className="mt-[32px] font-[700] text-[24px]">Reach Out</p>
        <p className="mt-[32px] text-[18px] font-[400]">
          Have any questions or need assistance? Please fill out the form below,
          and our dedicated team will respond to you shortly
        </p>

        {/* Contact Us Form */}
        <h3 className="font-[700] text-[30px] mt-[79px]">Contact Us</h3>
        <ContactUsForm />

      </Container>
    </div>
  );
};

export default ContactUsPage;

const Item = ({
  content,
  title,
  className,
}: {
  title: string;
  content: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span className="font-[700] text-[18px]">{title}</span>
      <span className="font-[400] text-[18px]">{content}</span>
    </div>
  );
};
