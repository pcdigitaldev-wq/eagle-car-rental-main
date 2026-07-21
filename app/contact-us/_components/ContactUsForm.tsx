"use client";

import InputField from "@/components/InputField";
import { useContactUs } from "../hooks/useContactUs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TextAreaField from "@/components/TextAreaField";
import SuperButton from "@/components/SuperButton";

type Props = {};

const ContactUsForm = (props: Props) => {
  const { form, onSubmit, pending } = useContactUs();
  return (
    <div className="flex flex-col gap-[27]px pb-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[70px]">
            <InputField
              form={form}
              inputStyles="input-contact-us focus-visible:ring-0 "
              name="firstName"
              label=""
              placeholder="First Name"
            />
            <InputField
              form={form}
              name="lastName"
              inputStyles="input-contact-us focus-visible:ring-0 "
              label=""
              placeholder="Last Name"
            />
          </div>
          <InputField
            form={form}
            name="email"
            label=""
            placeholder="Email"
            inputStyles="input-contact-us focus-visible:ring-0 "
          />
          <InputField
            form={form}
            name="subject"
            inputStyles="input-contact-us focus-visible:ring-0 "
            label=""
            placeholder="Subject"
          />
          <TextAreaField
            inputStyles="input-contact-us min-h-[200px] focus-visible:ring-0 "
            form={form}
            name="message"
            label=""
            placeholder="Message"
          />
          <SuperButton
          className="w-full rounded-full"
            type="submit"
            buttonType="loadingButton"
            loading={pending}
            title="Send Message"
          />
        </form>
      </Form>
    </div>
  );
};

export default ContactUsForm;
