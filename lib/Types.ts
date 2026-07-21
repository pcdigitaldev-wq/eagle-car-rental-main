import { Booking, Car, Fuel } from "@prisma/client";
import { z } from "zod";

//number schema
const numberSchema = z
  .string()
  .min(1, "Required")
  .refine((data) => /^[0-9.]*$/.test(data), { message: "Only Numbers" });
export const SEATS = [2,4, 5, 7, 8];
export const SEATS_CONST = [2,4, 5, 7, 8] as const;
export const SEATS_MAP: Record<(typeof SEATS_CONST)[number], string> = {
  "2": "2 Seats",
  "4":"4 Seats",
  "5": "5 Seats",
  "7": "7 Seats",
  "8": "8 Seats",
};

export const LOCATIONS = ["LOS_ANGELES", "LAS_VEGAS", "ORLANDO"];
export const LOCATIONS_CONST = ["LOS_ANGELES", "LAS_VEGAS", "ORLANDO"] as const;
export const LOCATIONS_MAP: Record<(typeof LOCATIONS_CONST)[number], string> = {
  LAS_VEGAS: "las vegas",
  LOS_ANGELES: "los angeles",
  ORLANDO: "orlando",
};
export type LocationType = (typeof LOCATIONS_CONST)[number];
export const FUEL = ["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"];
export const FUEL_CONST = ["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"] as const;
export const FUEL_MAP: Record<(typeof FUEL_CONST)[number], string> = {
  GASOLINE: "gasoline",
  DIESEL: "diesel",
  ELECTRIC: "electric",
  HYBRID: "hybrid",
};
export const PAYMENT_METHOD_CONST = ["CARD"] as const;

export const PAYMENT_METHOD_MAP: Record<
  (typeof PAYMENT_METHOD_CONST)[number],
  string
> = {
  CARD: "Credit/Depit Card",
};

export type PricingType = {
  hour: string;
  days: string[];
  week: string;
  month: string;
};

// Default values
export const DEFAULT_LOCATION = "LAS_VEGAS";
export const DEFAULT_TIME = "12:00";

// Calculate default dates
export const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
export const afterTomorrow = new Date();
afterTomorrow.setDate(afterTomorrow.getDate() + 4);

export const searchCarsSchema = z
  .object({
    pickUpLocation: z.enum(LOCATIONS_CONST, {
      message: "Invalid pick-up location",
    }),
    dropOffLocation: z.enum(LOCATIONS_CONST).optional().or(z.literal("")),
    deliveryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid delivery date format",
    }),
    deliveryTime: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
      message: "Invalid delivery time format (HH:mm)",
    }),
    returnDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid return date format",
    }),
    returnTime: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
      message: "Invalid return time format (HH:mm)",
    }),
    seats: z
      .union([
        z.array(z.string()), // Array of strings (multiple seats)
        z.string(), // Single seat passed as string
      ])
      .optional(),
    fuel: z
      .union([
        z.array(
          z.nativeEnum(Fuel, { invalid_type_error: "Enter Valid Fuel Type" })
        ),
        z.nativeEnum(Fuel, { invalid_type_error: "Enter Valid Fuel Type" }),
      ])
      .optional(),
    carType: z.string().optional(),
    pageNumber: z.string(),
  
  })
  .refine(
    (data) => {
      const deliveryDateTime = new Date(
        `${data.deliveryDate}T${data.deliveryTime}`
      );
      const returnDateTime = new Date(`${data.returnDate}T${data.returnTime}`);
      return returnDateTime > deliveryDateTime;
    },
    {
      message: "Return date and time must be after delivery date and time",
      path: ["deliveryDate"],
    }
  );

export const checkoutParamsSchema = z
  .object({
    slug: z.string().min(1, "Required"),
    deliveryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid delivery date format",
    }),
    deliveryTime: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
      message: "Invalid delivery time format (HH:mm)",
    }),
    returnDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid return date format",
    }),
    returnTime: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
      message: "Invalid return time format (HH:mm)",
    }),
    pickupLocation: z.enum(LOCATIONS_CONST, { message: "Invalid Location" }),

    dropoffLocation: z
      .enum(LOCATIONS_CONST, { message: "Invalid Location" })
      .optional()
      .or(z.literal(undefined)),
  })
  .refine(
    (data) => {
      const deliveryDateTime = new Date(
        `${data.deliveryDate}T${data.deliveryTime}`
      );
      const returnDateTime = new Date(`${data.returnDate}T${data.returnTime}`);
      return returnDateTime > deliveryDateTime;
    },
    {
      message: "Return date and time must be after delivery date and time",
      path: ["deliveryDate"],
    }
  );

// Export Type
export type SearchCarsParams = z.infer<typeof searchCarsSchema>;
export type CarsWithBookings = (Car & {
  bookings: { startDate: Date; endDate: Date }[];
  carType: { title: string };
})[];
export type CheckoutParams = z.infer<typeof checkoutParamsSchema>;

//to pass to card card
export type CarCheckoutParams = {
  deliveryDate: string;
  deliveryTime: string;
  returnDate: string;
  returnTime: string;
  pickupLocation: LocationType;
  dropoffLocation?: LocationType | undefined | "";
};

export const pricingSchema = z.object({
  hour: numberSchema,
  days: z.array(numberSchema).length(6, "Enter 6 Days"),
  week: numberSchema,
  month: numberSchema,
});

export const TAKE_CARS = 12;

export type StripeMetaData = {
  bookingId: string;
  bookingID: string;
  customerEmail: string;
  startDate: string;
  endDate: string;
  carTitle: string;
  payNow: number;
  payLater: number;
  totalAmount: number;
  durationDescription: string;
  [key: string]: any;
};

export type BookingWithCarName = Booking & {
  car: { subTitle: string; carType: { title: string } };
};

export const TEST_LOCATIONS = [
  {
    id: 1,
    name: "Los Angeles",
    lat: 33.96110546035406,
    lng: -118.37540930060293,
    phone: "3102946980",
    Landline: "4243315040",
    bookingEmail:'eaglebookingreserve@gmail.com',
    address:'1009 W Arbor Vitae st Inglewood ca 90301 ',
    href:'https://www.google.com/maps/place/Eagle+Car+Rental/@33.9610171,-118.3749691,19.25z/data=!4m12!1m5!3m4!2zMzPCsDU3JzQwLjAiTiAxMTjCsDIyJzMxLjUiVw!8m2!3d33.9611055!4d-118.3754093!3m5!1s0x80c2b7c8434bd57d:0x823a6aef629edc80!8m2!3d33.9610909!4d-118.3755302!16s%2Fg%2F11gxfp0yds?entry=ttu&g_ep=EgoyMDI1MDExNC4wIKXMDSoASAFQAw%3D%3D'
 
  },
  {
    id: 2,
    name: "Las Vegas",
    lat: 36.056620509375875,
    lng: -115.1624571711647,
    phone: "7025333116",
    Landline : "7022022678",
    bookingEmail:'eaglebookingreserve@gmail.com',
    address:'205 E Warm spring Rd suite 106 Las Vegas vegas NV 89119',
    href:'https://www.google.com/maps/place/Eagle+Car+Rental/@36.0566205,-115.1621883,19.5z/data=!3m1!5s0x80c8cf664f9d80bf:0xe755e10074e10bdf!4m12!1m5!3m4!2zMzbCsDAzJzIzLjgiTiAxMTXCsDA5JzQ0LjkiVw!8m2!3d36.0566205!4d-115.1624572!3m5!1s0x80c8cf8a4afded7f:0xf7b4b5726d0ea699!8m2!3d36.0565251!4d-115.1624679!16s%2Fg%2F11jgc17003?entry=ttu&g_ep=EgoyMDI1MDExNC4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: 3,
    name: "Orlando",
    lat: 28.457288450132072,
    lng: -81.31079694048232,
    phone: " 2136285498",
    Landline : "",
    bookingEmail:'eaglebookingreserve@gmail.com',
    address:'5453 Gataway Village Cir Suite 103 Orlando  Florida 32812',
    href:'https://www.google.com/maps/place/EAGLE+CAR+RENTAL+ORLANDO/@28.4571637,-81.31037,19.25z/data=!4m12!1m5!3m4!2zMjjCsDI3JzI2LjIiTiA4McKwMTgnMzguOSJX!8m2!3d28.4572885!4d-81.3107969!3m5!1s0x88e76301db9d1299:0xbc3e10064fc81878!8m2!3d28.4570998!4d-81.3108935!16s%2Fg%2F11tf9hfp6n?entry=ttu&g_ep=EgoyMDI1MDExNC4wIKXMDSoASAFQAw%3D%3D'
  },
];
