import { DateTime } from "luxon";
import { getData } from "./http";

export const convertToUTC = (date: string) => {
  return DateTime.fromISO(date, { zone: "utc" });
};

export const changeTimeZones = async (time: string, keep?: boolean) => {
  // set coordinates from local storage
  const cor = localStorage.getItem("cor")?.split(",");

  if (cor) {
    // get timezone from coordinates
    const url =
      cor &&
      `https://api.geoapify.com/v1/geocode/reverse?lat=${cor[0]}&lon=${cor[1]}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEO_API_KEY}`;

    const result = await getData(url);

    const timeZone = result?.results[0].timezone.name;

    if (timeZone) {
      return convertToUTC(time)
        .setZone(timeZone, { keepLocalTime: keep }) // prevent changing the time
        .toString();
    }
  }
};

export const convertTo12Hour = (value: number) => {
  return DateTime.fromObject({
    hour: value,
  }).toFormat("h a");
};
