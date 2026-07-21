'use server'

import { z } from "zod"
import { contactUsSchema } from "../ContactUsSchema"
 
import { throwCustomError } from "@/lib/utils"
import CustomError from "@/lib/CustomError"
import sendEmail, { sendContactEmail } from "@/SendGrid"

export const sendMessage = async (values:z.infer<typeof contactUsSchema>):Promise<{success:boolean,message:string}>=>{

    const validData = contactUsSchema.safeParse(values)
//eaglebookingreserve@gmail.com
    try {
        if(!validData.success)  return  throwCustomError('Invalid Inputs')
          const res =  await sendContactEmail({subject:values.subject??"Contact Message" ,to:'eaglebookingreserve@gmail.com',text:'contact message',html:`
               Sender Email: <strong>${values.email}</strong> 
               <br/>
               Sender Name: <strong> ${values.firstName} ${values.lastName}</strong> 
                <br/>  
                ${values.message}
                `})

                if(res.success){
                    return {success:true,message:"Message Sent"}
                }else{
                    return {
                        success:false,
                        message:"Something went wrong"
                    }
                }
        
    }catch (error) {
        {
            console.error(error)
            if(error instanceof CustomError){
                return {
                    success:false,
                    message:error.message
                }
            }
            return {success:false,message:'Internal Server Error'}
          }
    }

     

}