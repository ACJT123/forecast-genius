import TimePicker from "./time-picker";
import { Controller } from "react-hook-form";
import { convertToUTC } from "@/app/util/date";

type IEditForm = {
  register: any;
  control: any;
  event: any;
  activities: any;
  handleSubmit: (data: any) => any;
  onSubmit: (data: any, event: any) => void;
};

export default function EditForm({
  register,
  control,
  event,
  activities,
  handleSubmit,
  onSubmit,
}: IEditForm) {
  return (
    <form onSubmit={handleSubmit((data: any) => onSubmit(data, event))}>
      <h1 className="text-xl mb-4">Update Event</h1>

      <div className="mt-4">
        <label>Activity Name</label>
        <input
          {...register(`suggestedActivities.${event.id}.activity`)}
          defaultValue={event.title}
          type="text"
          placeholder="Activity"
          className="w-full bg-[#2a2c30] text-white p-2 rounded-lg"
        />
        <div id="activityError"></div>
      </div>

      <div className="mt-4">
        <label>Description</label>
        <textarea
          {...register(`suggestedActivities.${event.id}.description`)}
          defaultValue={activities[event.id]?.description}
          placeholder="Description"
          className="w-full bg-[#2a2c30] text-white p-2 rounded-lg"
        />
        <div id="descriptionError"></div>
      </div>

      <div className="mt-4">
        <label>Start Time</label>
        <Controller
          control={control}
          name={`suggestedActivities.${event.id}.startTime`}
          render={({ field: { onChange, value } }) => (
            <TimePicker
              onChange={onChange}
              value={convertToUTC(value)}
              className="w-full bg-[#2a2c30] text-white p-2 rounded-lg"
              format={"t"}
            />
          )}
        />
        <div id="startTimeError"></div>
      </div>

      <div className="mt-4">
        <label>End Time</label>
        <Controller
          control={control}
          name={`suggestedActivities.${event.id}.endTime`}
          render={({ field: { onChange, value } }) => (
            <TimePicker
              onChange={onChange}
              value={convertToUTC(value)}
              className="w-full bg-[#2a2c30] text-white p-2 rounded-lg"
              format={"t"}
            />
          )}
        />
        <div id="endTimeError"></div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg mt-4"
      >
        Update
      </button>
    </form>
  );
}
