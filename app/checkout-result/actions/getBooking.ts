"use server";

import CustomError from "@/lib/CustomError";
import prisma from "@/lib/prisma";
import { throwCustomError } from "@/lib/utils";

export const getBooking = async (bookingId: string) => {
  try {
    if (!bookingId) return throwCustomError("Booking Id is Required");

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      select: {
        status: true,
        bookingID:true,
        email:true
      },
    });

    if (!booking) throwCustomError("Booking not found");

    return { success: true, message: "Booking fetched successfully", booking };
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      return {
        success: false,
        message: error.message,
      };
    }
    return { success: false, message: "Internal Server Error" };
  }
};
