
'use client'


import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../actions/getBooking";

export const useCheckoutResult = (bookingId:string)=>{


    return  useQuery(
    {
        queryKey:['booking',bookingId],
        queryFn:()=>getBooking(bookingId),
        refetchInterval: (query) => {
            const booking = query.state.data?.success ? query.state.data?.booking : null
              
            if(!booking || booking.status == 'PAID') return false
      
          
            return 6000;
          },
          refetchOnWindowFocus: false,
    }
 
        
      );
}