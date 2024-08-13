import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.scss";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import "moment-timezone";

type ICalendar = {
  activities?: any;
};

export default function Calendar({ activities }: ICalendar) {
  const DnDCalendar = withDragAndDrop(BigCalendar);
  const localizer = momentLocalizer(moment);

  moment.tz.setDefault("utc");

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const events = activities?.map((activity: any, index: number) => ({
      id: index,
      title: activity.activity,
      start: moment(activity.startTime).toDate(),
      end: moment(activity.endTime).toDate(),
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
    },
    [setEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }: { event: any; start: any; end: any }) => {
      setEvents((prev: any) => {
        const existing = prev.find((ev: any) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev: any) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setEvents]
  );

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
      />
    </div>
  );
}
