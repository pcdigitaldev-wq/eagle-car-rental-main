'use server'

import CustomError from "@/lib/CustomError";
import prisma from "@/lib/prisma";
import { throwCustomError } from "@/lib/utils";

export const loginBooking = async (bookingID:string, email:string)=>{


    try {

        if(!bookingID || !email) return throwCustomError("booking Id and Email are required")

            const booking = await prisma.booking.findUnique({
                where:{
                  status:'PAID',
                    bookingID,
                    email,
                    

                },
                include:{
                  car:{
                    select:{
                      subTitle:true,
                      carType:{
                        select:{
                          title:true
                        }
                      }
                    }
                  }
                }
            })

            if(!booking) throwCustomError("Invalid Credentials")

                return {success:true, message:"Successfully Logged In",booking}
        
    }  catch (error) {
        console.error(error);
        if (error instanceof CustomError) {
          return {
            success: false,
            message: error.message,
          };
        }
        return { success: false, message: "Internal Server Error" };
      }

}