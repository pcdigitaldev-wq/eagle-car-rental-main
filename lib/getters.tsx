import { cache } from "react";
import prisma from "./prisma";

export const getCarTypes = cache(async()=>{
    const carTypes = await prisma.carType.findMany()
    return carTypes
})