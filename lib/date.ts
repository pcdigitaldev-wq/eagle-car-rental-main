import { Booking } from "@prisma/client";
import { formatInTimeZone } from "date-fns-tz";

export function convertDateToISOString(date: Date | undefined) {
    if (!date) {
      return undefined;
    }
  
    // Manually construct the ISO string in YYYY-MM-DD format
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
  
    // Pad single digit month and day with leading zeros
    const paddedMonth = month.toString().padStart(2, "0");
    const paddedDay = day.toString().padStart(2, "0");
  
    return `${year}-${paddedMonth}-${paddedDay}`;
  }


  
 export function combineDateAndTimeToUTC(
  dateString: string,
  timeString: string
) {
  // Combine the date and time strings
  const combinedDateTimeString = `${dateString}T${timeString}:00.000Z`;

  // Create a Date object from the combined string
  const utcDate = new Date(combinedDateTimeString);

  return utcDate;
}


// export function calculateDuration(startDate: Date, endDate: Date) {
//   const msInHour = 1000 * 60 * 60;
//   const msInDay = msInHour * 24;
//   const msInWeek = msInDay * 7;

//   let diff = endDate.getTime() - startDate.getTime();

//   const months = Math.floor(diff / (30 * msInDay));
//   diff -= months * (30 * msInDay);  // Subtract months

//   const weeks = Math.floor(diff / msInWeek);
//   diff -= weeks * msInWeek;  // Subtract weeks

//   const days = Math.floor(diff / msInDay);
//   diff -= days * msInDay;  // Subtract days

//   const hours = Math.floor(diff / msInHour);

//   return {
//     months,
//     weeks,
//     days,
//     hours,
//   };
// }

// export function calculateDuration(startDate: Date, endDate: Date) {
//   const msInHour = 1000 * 60 * 60;
//   const msInDay = msInHour * 24;
//   const msInWeek = msInDay * 7;

//   let diff = endDate.getTime() - startDate.getTime();

//   let months = Math.floor(diff / (30 * msInDay));
//   diff -= months * (30 * msInDay); // Subtract months

//   let weeks = Math.floor(diff / msInWeek);
//   diff -= weeks * msInWeek; // Subtract weeks

//   let days = Math.floor(diff / msInDay);
//   diff -= days * msInDay; // Subtract days

//   let remainingHours = diff / msInHour; // Remaining hours as decimal

//   // If there are extra hours or minutes, round up the days
//   if (remainingHours > 0) {
//     days += 1;
//     remainingHours = 0; // Since we added the hours into days, remaining hours should be 0
//   }

//   // If days become a full week, convert to weeks
//   if (days >= 7) {
//     weeks += Math.floor(days / 7);
//     days = days % 7; // Keep remaining days
//   }

//   // If weeks become a full month (assuming 4 weeks = 1 month), convert to months
//   if (weeks >= 4) {
//     months += Math.floor(weeks / 4);
//     weeks = weeks % 4; // Keep remaining weeks
//   }

//   const totalDays = months * 30 + weeks * 7 + days;

//   return {
//     months,
//     weeks,
//     days,
//     hours:remainingHours, // Always 0 after rounding
//     totalDays
//   };
// }

export function calculateDuration(startDate: Date, endDate: Date) {
  const msInHour = 1000 * 60 * 60;
  const msInDay = msInHour * 24;
  const msInWeek = msInDay * 7;

  const diff = endDate.getTime() - startDate.getTime();

  const startMonth = startDate.getMonth();
  const startYear = startDate.getFullYear();
  const endMonth = endDate.getMonth();
  const endYear = endDate.getFullYear();

  let months = 0;
  let currentDate = new Date(startDate);

  while (
    currentDate.getMonth() !== endMonth ||
    currentDate.getFullYear() !== endYear
  ) {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    if (nextMonth <= endDate) {
      months++;
      currentDate = nextMonth;
    } else {
      break;
    }
  }

  let remainingDays = Math.floor((endDate.getTime() - currentDate.getTime()) / msInDay);
  let remainingHours = (endDate.getTime() - currentDate.getTime()) / msInHour - remainingDays * 24;
  const totalDays = Math.floor(diff / msInDay) + (remainingHours > 0 ? 1 : 0)
  if (remainingHours >= 0.5) {
    remainingDays += 1; // ✅ Round 24h+30min as an extra day
    remainingHours = 0;
  }

  const weeks = Math.floor(remainingDays / 7);
  const days = remainingDays % 7;

  return {
    months,
    weeks,
    days,
    totalDays,
    hours: remainingHours, // Always 0 after rounding
  };
}




export function isDurationMoreThan48Hours(startDate: Date, endDate: Date): boolean {
  const msInHour = 1000 * 60 * 60;
  const durationInHours = (endDate.getTime() - startDate.getTime()) / msInHour;

  return durationInHours > 48;
}



export const formatDateUtc = (date:Date)=>{
 return formatInTimeZone(date,'UTC','MMM, dd yyyy - HH:mm')
}


export const calculateBookingsPerDay = (
  bookings: { startDate: Date; endDate: Date }[],
  startDate: Date,
  endDate: Date
): Record<string, number> => {
  const numBookingsPerDay: Record<string, number> = {};

  bookings.forEach((booking) => {
    const bookingStart = booking.startDate.getTime();
    const bookingEnd = booking.endDate.getTime();

    // console.log("arrival range", startDate);
    // console.log("departure range", endDate);

    // Case 1: Arrival date is the same as departure date

    if (
      new Date(startDate).setHours(0, 0, 0, 0) ===
      new Date(endDate).setHours(0, 0, 0, 0)
    ) {
      if (
        bookingStart <= endDate.getTime() &&
        bookingEnd >= startDate.getTime()
      ) {
        const currentDay = `${startDate.getFullYear()}-${
          startDate.getMonth() + 1
        }-${startDate.getDate()}`;
        numBookingsPerDay[currentDay] =
          (numBookingsPerDay[currentDay] || 0) + 1;
      }
    } else {
      // Case 2: Arrival date is different from departure date

      const currentDate = new Date(startDate);
    

      while (
        currentDate.getDate() <= endDate.getDate() &&
        currentDate.getMonth() <= endDate.getMonth() &&
        currentDate.getFullYear() <= endDate.getFullYear()
      ) {
      
        if (currentDate.getDate() === startDate.getDate()) {
          //Case a: Current day is equal to user arrival day
          if (
            bookingStart <=
              new Date(currentDate.getTime()).setHours(23, 30, 0, 0) &&
            bookingEnd >= currentDate.getTime()
          ) {
            const currentDay = `${currentDate.getFullYear()}-${
              currentDate.getMonth() + 1
            }-${currentDate.getDate()}`;
            numBookingsPerDay[currentDay] =
              (numBookingsPerDay[currentDay] || 0) + 1;
          }
        } else if (currentDate.getDate() === endDate.getDate()) {
          //Case b: Current day is equal to user departure day
          if (
            bookingStart <= endDate.getTime() &&
            bookingEnd >= new Date(currentDate.getTime()).setHours(0, 0, 0, 0)
          ) {
            const currentDay = `${currentDate.getFullYear()}-${
              currentDate.getMonth() + 1
            }-${currentDate.getDate()}`;
            numBookingsPerDay[currentDay] =
              (numBookingsPerDay[currentDay] || 0) + 1;
          }
        } else {
          if (
            bookingStart <=
              new Date(currentDate.getTime()).setHours(23, 30, 0, 0) &&
            bookingEnd >= new Date(currentDate.getTime()).setHours(0, 0, 0, 0)
          ) {
            const currentDay = `${currentDate.getFullYear()}-${
              currentDate.getMonth() + 1
            }-${currentDate.getDate()}`;
            numBookingsPerDay[currentDay] =
              (numBookingsPerDay[currentDay] || 0) + 1;
          }
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  });
  console.log("Bookings Per Day",numBookingsPerDay);
  return numBookingsPerDay;
};

 
export const checkBookingAvailability = (bookings: {startDate:Date,endDate:Date}[], startDate: Date, endDate: Date, numberOfCars: number): boolean => {
  const bookingsPerDay = calculateBookingsPerDay(bookings, startDate, endDate);


 for(const theDate in bookingsPerDay){
  console.log('places',bookingsPerDay[theDate])
  if(bookingsPerDay[theDate] && bookingsPerDay[theDate] >= numberOfCars)
  {
      console.log('places',bookingsPerDay[theDate])
      return false
  }
 }

  return true;
};
