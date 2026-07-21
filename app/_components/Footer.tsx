import ImageComponent from "@/components/ImageComponent";
import SuperButton from "@/components/SuperButton";
import { Mail, MapPinHouse, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaTiktok } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";


type Props = {};

const ELEMENTS = [
  {
    title: "Contact Us",
    info: "000-00000-00",
    Icon: <Phone />,
  },
  {
    title: "Email",
    info: "test@test.com",
    Icon: <Mail />,
  },
  {
    title: "address",
    info: "California",
    Icon: <MapPinHouse />,
  },
];


const LINKS = [
    {
        title:'blogs',
        href:'/blog'
    },
    {
        title:'FAQ',
        href:'/faq'
    },
    {
        title:'about us',
        href:'/about-us'
    },
    {
        title:'contact us',
        href:'/contact-us'
    },
]

const SOCIALS = [
  {
    href:"https://www.tiktok.com/@eagle.car.rental?_t=ZT-8tpq7aAz7bW&_r=1",
    Icon:<FaTiktok className="text-white size-8" />

  },
  {
    href:"https://www.instagram.com/eaglecarsrental?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr",
    Icon:<RiInstagramFill className="text-white size-8" />
  },
  {
    href:'https://www.facebook.com/profile.php?id=61572995770301&mibextid=wwXIfr',
    Icon:<FaFacebook className="text-white size-8" />
  }
]
const Footer = (props: Props) => {
  return (
    <footer className="min-h-[300px] bg-site-primary pb-[56px] pt-12 px-[24px]">
        <div className="max-w-[1120px] mx-auto">

   
      {/* First Row */}
      {/* <div className="p-[16px] rounded-[16px] border border-separate">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ELEMENTS.map(({ Icon, info, title }) => (
            <article key={`footer-element-card-${title}`} className="flex items-center gap-[16px] px[36.8.px] lg:justify-self-center  text-border">
              <div className="flex items-center justify-center border rounded-[12px] w-[45px] h-[48px]">
                {Icon}
              </div>
              <div className="space-y-[5px]">
                <p>{title}</p>
                <p>{info}</p>
              </div>
            </article>
          ))}
        </div>
      </div> */}
      {/* Second Row */}
      <div className="mt-[12px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] justify-between">
        <article className="flex flex-col gap-[24px]">
          <ImageComponent
            src={"/Logo_White.png"}
            alt="logo"
            className="w-[141px] h-[40px]"
            aspect="video"
          />
          <p className="max-w-[407px] text-border">
            With the approach of trusting the customer, Eagle is ready to serve
            the customers by having the largest car fleet consisting of all
            kinds of cars
          </p>
          <div className="flex items-center gap-8 flex-wrap mt-3">
          {SOCIALS.map(({Icon,href},index)=><Link target="_blank" key={`social-${index}`}   href={href}   >{Icon}</Link>)}
          </div>

        </article>
        <article className="flex flex-col justify-between md:justify-self-center gap-[20px]">
          {LINKS.map((link)=><Link  className="text-border capitalize" key={`footer-link-${link.title}`} href={link.href}>{link.title}</Link>)}
        </article>
        <article className="lg:justify-self-end text-border">
        <Link  className="text-border capitalize"   href={'/terms-and-conditions'}>Terms & Conditions</Link>
        </article>
      </div>

      {/* Third Row */}
    <p className="text-sm capitalize text-[#9A9A9A] pt-[24px] border-t w-full text-center mt-[16px]">© All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
