import { DateTime } from "luxon";

export const convertToUTC = (date: string) => {
  return DateTime.fromISO(date, { zone: "utc" });
};
