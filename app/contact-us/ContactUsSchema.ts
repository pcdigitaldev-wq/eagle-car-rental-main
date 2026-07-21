import { z } from "zod";



export const contactUsSchema = z.object({
    firstName:z.string().min(1,'Required'),
    lastName:z.string().min(1,'Required'),
    email:z.string().email('Enter Valid E-mail Address').min(1,'Required'),
    subject:z.string().optional(),
    message:z.string().min(10,'at least 10 chars')
})