"use server";

import { DynamicData, sendContactEmail } from "../SendGrid";
import { formatDateUtc } from "./date";
import { LOCATIONS_MAP, LocationType } from "./Types";

export const sendBookingMessage = async ({
  subject = "New Reservation",
  title,
  dynamicData,
  rentalPrice,
}: {
  subject: string;
  title: string;
  dynamicData: Partial<DynamicData> & {
    pickupLocation: LocationType;
    droppOffLocation: LocationType | undefined | null;
    extraOptions: {
      id: string;
      price: number;
      title: string;
      daily: boolean;
    }[];
  };
  rentalPrice: string;
}) => {
  let extraOptionsHTML = "";

  if (dynamicData.extraOptions.length > 0) {
    extraOptionsHTML = `
      <br/>
      <strong>Extra Options:</strong>
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-top: 5px;">
        <thead>
          <tr>
            <th style="text-align: left;">Title</th>
            <th style="text-align: left;">Price</th>
            <th style="text-align: left;">Daily</th>
          </tr>
        </thead>
        <tbody>
          ${dynamicData.extraOptions
            .map(
              (option: { title: string; price: number; daily: boolean }) => `
                <tr>
                  <td>${option.title}</td>
                  <td>$${option.price}</td>
                  <td>${option.daily ? "Yes" : "No"}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
      <br/>
    `;
  }
  //eaglebookingreserve@gmail.com
  try {
    await sendContactEmail({
      subject: subject,
      to: "eaglebookingreserve@gmail.com",
      text: "New Reservation",
      html: `
        <strong>${title}</strong>
          <br/> 
            <br/> 
        BookingID:  <strong>${dynamicData.bookingID}</strong>
          <br/> 
        Client Name:  <strong>${dynamicData.fullName}</strong>
          <br/> 
        Client Email:  <strong>${dynamicData.email}</strong>
          <br/> 
        Car Name:<strong>${dynamicData.carName}</strong>
          <br/> 
        Start Date:  <strong>${formatDateUtc(
          new Date(dynamicData.startDate!)
        )}</strong>
          <br/> 
        End Date:  <strong>${formatDateUtc(
          new Date(dynamicData.endDate!)
        )}</strong>
          <br/> 
          Pick up Location: <strong>${
            LOCATIONS_MAP[dynamicData.pickupLocation]
          }</strong>
          <br/>
          Drop off Location: <strong>${
            LOCATIONS_MAP[
              dynamicData.droppOffLocation ?? dynamicData.pickupLocation
            ]
          }</strong>
          <br/>
        Payment Method:  <strong>${dynamicData.paymentMethod}</strong>
          <br/> 
          ${extraOptionsHTML}
              Rental Price:  <strong>$${rentalPrice!}</strong>
          <br/> 
        Paid:  <strong>${dynamicData.paid}</strong>
          <br/> 
        Total Amount:  <strong>${dynamicData.totalAmount!}</strong>
          <br/> 
    
            <br/> 
      <a href="https://superadmin.eaglerentalcar.com/bookings/${
        dynamicData.bookingID
      }">Please Check Bookings Table For More Details</a>
         <br/>  
          
         `,
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
