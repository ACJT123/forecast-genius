import { DateTime } from "luxon";

export type ISuggested = {
  activity: string;
  startTime: DateTime;
  endTime: DateTime;
  description: string;
};
