import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.scss";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import "moment-timezone";
import { ConfigProvider, Modal } from "antd";
import TimePicker from "./time-picker";
import { Controller, FieldError, useForm } from "react-hook-form";
import { convertToUTC } from "@/app/util/date";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EditForm from "./edit-form";
import { CloseOutlined } from "@ant-design/icons";

type ICalendar = {
  activities?: any;
  ev: (event: any) => void;
};

const schema = yup.object().shape({
  suggestedActivities: yup
    .array()
    .of(
      yup.object().shape({
        activity: yup.string().required("Activity Name is required"),

        description: yup.string().required("Description is required"),

        startTime: yup
          .string()
          .required("Start time is required") // always lesss than end time
          .test(
            "is-greater",
            "Start time must be less than end time",
            function (value) {
              const endTime = this.parent.endTime;

              if (value && endTime) {
                return moment(value).isBefore(endTime);
              }

              return true;
            }
          ),

        endTime: yup
          .string()
          .required("End time is required")
          .test(
            "is-greater",
            "End time must be greater than start time",
            function (value) {
              const startTime = this.parent.startTime;

              if (value && startTime) {
                return moment(value).isAfter(startTime);
              }

              return true;
            }
          ),
      })
    )
    .default([]),
});

export default function Calendar({ activities, ev }: ICalendar) {
  const [modal, contextHolder] = Modal.useModal();

  const DnDCalendar = withDragAndDrop(BigCalendar);

  moment.tz.setDefault("utc");

  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState<any[]>([]);

  const [currentId, setCurrentId] = useState<number>(0);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<{
    suggestedActivities: {
      activity: string;
      description: string;
      startTime: string;
      endTime: string;
    }[];
  }>({
    defaultValues: {
      suggestedActivities: [],
    },
    resolver: yupResolver(schema),
  });

  // component callback
  useEffect(() => {
    ev(events);
  }, [ev, events]);

  // set the default values
  useEffect(() => {
    if (activities.length > 0) {
      setValue("suggestedActivities", activities);
    }
  }, [activities, setValue]);

  // reformat the events to be displayed on the react big calendar
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

  // display the errors
  useEffect(() => {
    const fieldIds = [
      "activity",
      "description",
      "startTime",
      "endTime",
    ] as const; // as const is to make it readonly

    fieldIds.forEach((fieldId) => {
      const error = errors.suggestedActivities?.[currentId]?.[fieldId];
      const div = document.getElementById(`${fieldId}Error`);

      if (div && error?.message) {
        div.classList.add("text-red-400");
        div.textContent = error.message;
      }
    });
  }, [errors, currentId]);

  const moveEvent = useCallback(
    ({ event, start, end }: { event: any; start: any; end: any }) => {
      setEvents((prev: any) => {
        const existing = prev.find((ev: any) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev: any) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });

      setValue(
        `suggestedActivities.${event.id}.startTime`,
        convertToUTC(start.toISOString()).toString()
      );

      setValue(
        `suggestedActivities.${event.id}.endTime`,
        convertToUTC(end.toISOString()).toString()
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
        convertToUTC(start.toISOString()).toString()
      );

      setValue(
        `suggestedActivities.${event.id}.endTime`,
        convertToUTC(end.toISOString()).toString()
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
    // ensure the error messages are set to correct event
    setCurrentId(event.id);

    modal.info({
      icon: null,
      width: 800,
      content: (
        <EditForm
          register={register}
          control={control}
          event={event}
          activities={activities}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      ),
      centered: true,
      footer: null,
      closable: true,
      closeIcon: <CloseOutlined style={{ color: "#fff" }} />,
    });
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#191b1f",
            colorBgMask: "rgba(0, 0, 0, 0.8)",
            colorText: "#fff",
          },
        },
      }}
    >
      <div className="bg-[#2a2c30] p-4 rounded-2xl mt-6 max-h-[400px] overflow-y-scroll">
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
    </ConfigProvider>
  );
}
