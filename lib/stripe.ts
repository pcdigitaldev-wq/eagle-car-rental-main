
import Stripe from "stripe";
import { StripeMetaData } from "./Types";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-12-18.acacia",
});

export const startStripeSession = async ({

  image,
  metaData,
  myPayment,
   
 
}: {
  metaData: StripeMetaData;  
  myPayment: "card" | "paypal";
  image: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    customer_email: metaData.customerEmail,

    payment_intent_data: {
      metadata: metaData,
      capture_method: "automatic",
    },
    payment_method_types: [myPayment as "card" | "paypal"],

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: metaData.carTitle,
            description: `booked for ${metaData.durationDescription}`,
            images: [image],
          },
          unit_amount: Math.round(metaData.payNow * 100),
        },

        quantity: 1,
      },
    ],
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    mode: "payment",
    metadata: metaData,

    success_url: `${process.env
      .NEXT_PUBLIC_BASE_URL!}/checkout-result?bookingId=${metaData.bookingId}`,
    cancel_url: `${process.env
      .NEXT_PUBLIC_BASE_URL!}/checkout-result?canceled=true`,
  });

  return session;
};
