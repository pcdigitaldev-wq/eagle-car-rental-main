import { TypeOf, z } from "zod";
import { bookingSchema } from "../schema";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormWrapper from "@/app/_components/FormWrapper";
import InputField from "@/components/InputField";
import PhoneField from "@/components/PhoneField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FielField } from "@/components/FileField";
import { ExtraOptions } from "@prisma/client";
import { formatToDollar } from "@/lib/utils";
import { PAYMENT_METHOD_CONST, PAYMENT_METHOD_MAP } from "@/lib/Types";
import ImageComponent from "@/components/ImageComponent";
import RadioField from "@/components/RadioField";
import CheckboxField from "@/components/CheckBoxField";
import SuperButton from "@/components/SuperButton";
import { ArrowRight } from "lucide-react";

type Props = {
  form: UseFormReturn<z.infer<typeof bookingSchema>>;
  onSubmit: (values: TypeOf<typeof bookingSchema>) => Promise<void>;
  extraOptions: { id: string; price: number; title: string,daily:boolean }[];
  setIsBusinessFn: () => void;
  pending:boolean
 
};

const BookingForm = ({
  form,
  pending,
  onSubmit,
  setIsBusinessFn,
  extraOptions,
 
}: Props) => {
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "extraOptions", // The name of your array in the form schema
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormWrapper title="Driver Details">
          <InputField
            form={form}
            name="email"
            label="Email Address"
            placeholder="Your Email Address"
          />

          <InputField
            form={form}
            name="firstName"
            label="First Name"
            placeholder="Your First Name"
          />

          <InputField
            form={form}
            name="middleName"
            label="Middle Name"
            placeholder="Your Middle Name"
          />

          <InputField
            form={form}
            name="lastName"
            label="Last Name"
            placeholder="Your Last Name"
          />

          <PhoneField
            form={form}
            name="contactNumber"
            label="Contact Number"
            placeholder="Contact Number"
          />
        </FormWrapper>
        <FormWrapper title="Billing Address">
          <InputField
            form={form}
            name="billingFirstName"
            label="First Name"
            placeholder="Your First Name"
          />
          <InputField
            form={form}
            name="billingMiddleName"
            label="Middle Name"
            placeholder="Your Middle Name"
          />
          <InputField
            form={form}
            name="billingLastName"
            label="Last Name"
            placeholder="Your Last Name"
          />

          <PhoneField
            form={form}
            name="billingContactNumber"
            label="Contact Number"
            placeholder="Contact Number"
          />

          <InputField
            form={form}
            name="address"
            label="Address"
            placeholder="House/Apartment number and street name"
          />

          <InputField
            form={form}
            name="City"
            label="City"
            placeholder="Your City"
          />
          <InputField
            form={form}
            name="State"
            label="State"
            placeholder="State"
          />
          <InputField
            form={form}
            name="Zipcode"
            label="Zipcode/Postcode"
            placeholder="Zipcode/Postcode"
          />

          <div className="flex items-center gap-4">
            <Label className="text-xs" htmlFor="is-business">
              Is This Business Booking?
            </Label>

            <Checkbox
              id="is-business"
              checked={!!form.watch("business")}
              onCheckedChange={setIsBusinessFn}
            />
          </div>

          {!!form.watch("business") && (
            <div>
              <InputField
                form={form}
                name="companyName"
                label="Company Name"
                placeholder="Company Name"
              />
              <InputField
                form={form}
                name="companyVat"
                label="Vat Number"
                placeholder="Vat Number"
              />
            </div>
          )}
        </FormWrapper>
        {/* Extra Options */}
   
        {!!extraOptions.length  &&   <FormWrapper title="Extra Options">
            <div className="flex flex-col gap-1">
              {extraOptions.map((option, index) => {
                const currentOptions = form.watch("extraOptions") || [];
                const optionIndex = currentOptions.findIndex(
                  (el) => el.id === option.id
                );
                const isChecked = optionIndex !== -1;

                const handleClick = () => {
                  if (isChecked) {
                    remove(optionIndex); // Correctly remove by the actual array index
                  } else {
                    append({ ...option, price: String(option.price) });
                  }
                };

                return (
                  <div
                    key={option.id}
                    className="bg-[#F5F6FA] p-6 rounded-md justify-between flex items-center"
                  >
                    <span className="flex items-center gap-2">
                      <Checkbox
                        id={`extra-option-${option.id}`}
                        checked={isChecked}
                        onCheckedChange={handleClick}
                      />
                      <Label
                        htmlFor={`extra-option-${option.id}`}
                        className="cursor-pointer"
                      >
                        {option.title}
                      </Label>
                    </span>
                    <span className="font-[600] flex items-center gap-2">
                    {option.daily && <span className="text-xs text-muted-foreground px-3 py-1 border rounded-full font-[400]">Daily</span>}
                      {formatToDollar(option.price)}
                      
                    </span>
                   
                  </div>
                );
              })}
            </div>
          </FormWrapper>}
   

        <FormWrapper title="Required Documents">
          <FielField
            placeHolder="Upload License"
            form={form}
            name="license"
            label="Upload License"
          />
          <FielField
            placeHolder="Upload Insurance"
            form={form}
            name="insurance"
            label="Upload Insurance"
          />
          <FielField
            placeHolder="Return Flight"
            form={form}
            name="returnFlight"
            label="Return Flight"
          />
        </FormWrapper>
        <FormWrapper title="Payment Method">
          <p className="font-[400] text-[14px]">How Would You Like To Pay ?</p>

          <div className="flex flex-col gap-2">
            {Object.entries(PAYMENT_METHOD_MAP).map(([key, value]) => (
              <div
                key={key}
                className="py-4  border-y flex items-center justify-between"
              >
                <RadioField
                  id={key}
                  form={form}
                  label={value}
                  name="paymentMethod"
                  key={key}
                />
                <ImageComponent
                  src="/card.png"
                  aspect="video"
                  alt="payment-method"
                  imgClassName="object-contain"
                  className="h-[60px]"
                />
              </div>
            ))}
          </div>
          <div className="mt-2 fled items-center gap3">
            <CheckboxField
              form={form}
              label="I accept the terms and conditions of Eagle Car Rental"
              name="terms"
            />
            <SuperButton
              buttonType="linkButton"
              target="_blank"
              href="terms-and-conditions"
              variant="link"
              title="Terms&Conditions"
              className="text-blue-500"
            />
          </div>
        </FormWrapper>
        <div className="flex items-center justify-between">
          <SuperButton
            title="Back"
            buttonType="linkButton"
            variant="link"
            className="text-site-primary"
            href="/cars"

          />

          <SuperButton
          variant="site"
          type="submit"
          buttonType="loadingButton"
          loading={pending}
          title="Checkout"
          className="rounded-full"
          Icon={<ArrowRight className="icon" />}
          />
        </div>
        {/* {JSON.stringify(form.formState.errors)} */}
      </form>
    </Form>
  );
};

export default BookingForm;
