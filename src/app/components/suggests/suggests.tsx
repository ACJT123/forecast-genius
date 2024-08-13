"use client";

import { suggestedActivity } from "@/app/data";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import FormItem from "./form-item";
import { set, useForm } from "react-hook-form";
import { Dropdown, Modal, Spin } from "antd";
import Image from "next/image";
import DownloadSuggestionModal from "./download-suggestion-modal";
import { menu } from "@/app/models/suggests";
import { ISuggested } from "@/app/types/suggested";
import suggestedActivitySchema from "@/app/schema/suggested";
import { yupResolver } from "@hookform/resolvers/yup";
import { useWeather } from "@/app/context/WeatherContext";
import { changeTimeZones } from "@/app/util/date";
import Calendar from "./calendar";

declare const window: any;

export default function Suggests() {
  const [modal, contextHolder] = Modal.useModal();
  const [isInserting, setIsInserting] = useState(false);
  const { forecastData } = useWeather();

  const [suggested, setSuggested] = useState<ISuggested[]>([]);
  const [dates, setDates] = useState<any[]>([]);

  useEffect(() => {
    if (forecastData) {
      const activities = forecastData?.suggestions;

      // activities?.forEach((activity: any) => {
      //   const startTimeISO = DateTime.fromISO(activity.startTime)?.toISO();
      //   const endTimeISO = DateTime.fromISO(activity.endTime)?.toISO();

      //   // Check if either startTime or endTime is already in the dates array
      //   if (!dates.includes(startTimeISO) && !dates.includes(endTimeISO)) {
      //     const a = dates.push(startTimeISO);

      //     setDates(a);
      //   }
      // });

      // console.log(dates);
      setSuggested(activities || []);
    }
  }, [forecastData, dates]);

  const { register, watch, control, setValue } = useForm<{
    suggestedActivities: ISuggested[];
  }>();

  // Set the form values once suggested activities are available
  useEffect(() => {
    if (suggested.length > 0) {
      setValue("suggestedActivities", suggested);
    }
  }, [suggested, setValue]);

  const downloadSuggestionModal = () => {
    if (suggested.length === 0) return;

    modal.info({
      icon: null,
      width: 800,
      content: (
        <DownloadSuggestionModal suggestions={watch().suggestedActivities} />
      ),
      centered: true,
      footer: null,
      closable: true,
    });
  };

  const convertedDates = async (start: string, end: string) => {
    const s = await changeTimeZones(start);
    const e = await changeTimeZones(end);

    return { start: s, end: e };
  };

  const insertToGoogleCalendar = () => {
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

    const initializeGapiClient = async () => {
      await window.gapi.client.init({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
      });

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        scope: SCOPES,
        callback: "", // defined later
      });

      if (window.gapi.client.getToken() === null) {
        client.requestAccessToken({ prompt: "consent" });
      } else {
        client.requestAccessToken({ prompt: "" });
      }

      if (client) {
        client.callback = async (resp: any) => {
          if (resp.error !== undefined) {
            throw resp;
          }

          setIsInserting(true);

          const events = await Promise.all(
            watch().suggestedActivities.map(async (activity: any) => {
              const dates = await convertedDates(
                activity.startTime,
                activity.endTime
              );

              console.log(dates);

              if (dates) {
                return {
                  summary: activity.activity,
                  description: activity.description,
                  start: {
                    dateTime: dates.start,
                  },
                  end: {
                    dateTime: dates.end,
                  },
                };
              }
            })
          );

          let isAllInserted = true;

          window.gapi.client.load("calendar", "v3", () => {
            const batch = window.gapi.client.newBatch();

            events.forEach((event: any) => {
              const request = window.gapi.client.calendar.events.insert({
                calendarId: "primary",
                resource: event,
              });

              batch.add(request);
            });

            batch.then((response: any) => {
              Object.values(response.result).forEach((result: any) => {
                if (result.status !== 200) {
                  isAllInserted = false;
                }
              });

              if (isAllInserted) {
                Modal.success({
                  content:
                    "All activities have been inserted into your Google Calendar",
                  centered: true,
                });
              } else {
                Modal.error({
                  content:
                    "Some activities could not be inserted into your Google Calendar",
                  centered: true,
                });
              }

              setIsInserting(false);
            });
          });
        };
      } else {
      }
    };

    window.gapi.load("client", initializeGapiClient);
  };

  const handleChange = (value: any) => {
    const { key } = value;

    switch (key) {
      case "1":
        downloadSuggestionModal();
        break;
      case "2":
        insertToGoogleCalendar();
        break;
      default:
        console.log("Refresh");
        break;
    }
  };

  return (
    <main className="col-span-2 h-full">
      <Spin tip="Inserting" size="large" spinning={isInserting} fullscreen />

      <div className="flex items-center justify-between">
        <h1>
          Based on today&apos;s weather, here are some suggested activities
        </h1>

        <Dropdown
          trigger={["click"]}
          menu={{
            items: menu,
            onClick: handleChange,
          }}
        >
          <Image
            width="15"
            height="15"
            src="https://img.icons8.com/ios-filled/50/FFFFFF/menu-2.png"
            alt="menu-2"
            className="cursor-pointer"
          />
        </Dropdown>
      </div>

      {dates.map((date) => (
        <h1 key={date} className="text-2xl font-semibold text-white">
          Date: {DateTime.fromISO(date).toFormat("yyyy-MM-dd")}
        </h1>
      ))}

      {/* <div className="bg-[#2a2c30] rounded-2xl mt-6 p-4 h-full">
        <div className="grid grid-cols-3 gap-4">
          {suggested?.map((_, index) => (
            <FormItem
              register={register}
              control={control}
              key={index}
              id={index}
            />
          ))}
        </div>
      </div> */}
      <Calendar activities={suggested} />
      {contextHolder}
    </main>
  );
}
