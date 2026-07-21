'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { contactUsSchema } from "../ContactUsSchema"
import { useTransition } from "react"
import { errorToast, wait } from "@/lib/utils"
import { sendMessage } from "../actions/sendMessageAction"
import { toast } from "sonner"

export const useContactUs = ()=>{


    const [pending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof contactUsSchema>>({
        resolver: zodResolver(contactUsSchema),
        defaultValues: {
          firstName: "",
          lastName:"",
          email:"",
          message:"",
          subject:""
        },
      })


    async  function onSubmit(values: z.infer<typeof contactUsSchema>) {
        startTransition(async()=>{

         try {
         const res = await sendMessage(values)
         if(!res.success){
          toast.error(res.message)
         }else{
          toast.success("Sent Successfully")
         
          form.reset({})
         }
           
         } catch (error) {
          errorToast()
         }
        })
      
       
      }


      return {form, onSubmit, pending}
}