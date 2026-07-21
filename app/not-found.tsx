import Link from "next/link";
import Container from "./_components/Container";
import SuperButton from "@/components/SuperButton";
import ImageComponent from "@/components/ImageComponent";

export default function NotFound() {
  return (
    <div className="min-h-screen flex w-full items-center relative justify-center lg:justify-center">
      <Container>
        <div className="flex gap-4 w-full flex-row justify-between">
          <div>
            <h3 className="text-site-primary  text-[190px] font-[800]">404</h3>
            <p className="text-[#0A0015] font-[700] text-[38px] mt-[22px]">
              Page Not Found
            </p>
            <p className="text-[#77707F] text-[22px] font-[400] mt-[19px] max-w-[500px]">
              Sorry, the page you’re looking for does not exist or has been
              moved please go back to the Home page
            </p>
            <SuperButton
              buttonType="linkButton"
              href="/"
              className="rounded-full mt-[30px] capitalize text-[15px] w-[268px]"
              title="go back home"
            />
          </div>

          <ImageComponent
            src={"/notFound.png"}
            imgClassName="object-contain"
            className="w-[400px]   hidden lg:block"
            aspect="square"
            alt="not found"
          />
        </div>
      </Container>
    </div>
  );
}
