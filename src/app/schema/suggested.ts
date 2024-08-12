import * as yup from "yup";
import { DateTime } from "luxon";

const suggestedActivitySchema = yup.object().shape({
  suggestedActivities: yup.array().of(
    yup.object().shape({
      activity: yup.string().required("Activity is required"),
      startTime: yup
        .mixed()
        .required("Start time is required")
        .test(
          "isValidStartTime",
          "Start time is not valid",
          (value: any) => DateTime.fromISO(value).isValid
        ),
      endTime: yup
        .mixed()
        .required("End time is required")
        .test(
          "isValidEndTime",
          "End time is not valid",
          (value: any) => DateTime.fromISO(value).isValid
        )
        .test(
          "isLaterThanStartTime",
          "End time must be later than start time",
          function (value: any) {
            const { startTime } = this.parent;
            return DateTime.fromISO(value) > DateTime.fromISO(startTime);
          }
        ),
      description: yup.string().required("Description is required"),
    })
  ),
});

export default suggestedActivitySchema;
