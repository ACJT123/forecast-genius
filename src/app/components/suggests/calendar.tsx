import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.scss";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import "moment-timezone";
import { Modal } from "antd";
import TimePicker from "./time-picker";
import { Controller, useForm } from "react-hook-form";
import { convertToUTC } from "@/app/util/date";

type ICalendar = {
  activities?: any;
  ev: (event: any) => void;
};

export default function Calendar({ activities, ev }: ICalendar) {
  const [modal, contextHolder] = Modal.useModal();

  const DnDCalendar = withDragAndDrop(BigCalendar);

  moment.tz.setDefault("utc");

  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState<any[]>([]);

  const { register, handleSubmit, control, setValue } = useForm<{
    suggestedActivities: any[];
  }>({
    defaultValues: {
      suggestedActivities: [],
    },
  });

  useEffect(() => {
    ev(events);
  }, [ev, events]);

  useEffect(() => {
    if (activities.length > 0) {
      setValue("suggestedActivities", activities);
    }
  }, [activities, setValue]);

  useEffect(() => {
    const events = activities?.map((activity: any, index: number) => ({
      id: index,
      title: activity.activity,
      start: moment(activity.startTime).toDate(),
      end: moment(activity.endTime).toDate(),
      description: activity.description,
    }));

    setEvents(events);
  }, [activities]);

  const moveEvent = useCallback(
    ({ event, start, end }: { event: any; start: any; end: any }) => {
      setEvents((prev: any) => {
        const existing = prev.find((ev: any) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev: any) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });

      setValue(
        `suggestedActivities.${event.id}.startTime`,
        convertToUTC(start.toISOString())
      );

      setValue(
        `suggestedActivities.${event.id}.endTime`,
        convertToUTC(end.toISOString())
      );
    },
    [setEvents, setValue]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }: { event: any; start: any; end: any }) => {
      setEvents((prev: any) => {
        const existing = prev.find((ev: any) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev: any) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });

      setValue(
        `suggestedActivities.${event.id}.startTime`,
        convertToUTC(start.toISOString())
      );

      setValue(
        `suggestedActivities.${event.id}.endTime`,
        convertToUTC(end.toISOString())
      );
    },
    [setEvents, setValue]
  );

  const updateEvent = (event: any) => {
    // find the event in the array
    const index = events.findIndex((e) => e.id === event.id);

    // update the event
    events[index] = event;

    // update the state
    setEvents([...events]);
  };

  const onSubmit = (data: { suggestedActivities: any[] }, event: any) => {
    const title = data.suggestedActivities[event.id]?.activity;

    const description = data.suggestedActivities[event.id]?.description;

    const start = convertToUTC(
      data.suggestedActivities[event.id]?.startTime
    ).toString();

    const end = convertToUTC(
      data.suggestedActivities[event.id]?.endTime
    ).toString();

    updateEvent({
      ...event,
      title: title,
      description: description,
      start: moment(start).toDate(),
      end: moment(end).toDate(),
    });

    Modal.destroyAll();
  };

  const editModal = (event: any) => {
    modal.info({
      icon: null,
      width: 800,
      content: (
        <form onSubmit={handleSubmit((data) => onSubmit(data, event))}>
          <h1>Update Event</h1>

          <input
            {...register(`suggestedActivities.${event.id}.activity`)}
            defaultValue={event.title}
            type="text"
            placeholder="Activity"
            className="w-full bg-[#2a2c30] text-white p-2 rounded-lg"
          />

          <textarea
            {...register(`suggestedActivities.${event.id}.description`)}
            defaultValue={activities[event.id]?.description}
            placeholder="Description"
            className="w-full bg-[#2a2c30] text-white p-2 rounded-lg mt-4"
          />

          <Controller
            control={control}
            name={`suggestedActivities.${event.id}.startTime`}
            render={({ field: { onChange, value } }) => (
              <TimePicker
                onChange={onChange}
                value={convertToUTC(value)}
                className="w-full bg-[#2a2c30] text-white p-2 rounded-lg mt-4"
                format={"t"}
              />
            )}
          />

          <Controller
            control={control}
            name={`suggestedActivities.${event.id}.endTime`}
            render={({ field: { onChange, value } }) => (
              <TimePicker
                onChange={onChange}
                value={convertToUTC(value)}
                className="w-full bg-[#2a2c30] text-white p-2 rounded-lg mt-4"
                format={"t"}
              />
            )}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg mt-4"
          >
            Update
          </button>
        </form>
      ),
      centered: true,
      footer: null,
      closable: true,
    });
  };

  return (
    <div className="bg-[#2a2c30] p-4 rounded-lg mt-6">
      <DnDCalendar
        views={["day"]}
        localizer={localizer}
        events={events}
        defaultDate={new Date()}
        defaultView="day"
        style={{ height: "100vh" }}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        onSelectEvent={editModal}
      />

      {contextHolder}
    </div>
  );
}
