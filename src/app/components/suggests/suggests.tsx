"use client";

import { suggestedActivity } from "@/app/data";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import FormItem from "./form-item";
import { useForm, SubmitHandler, useFieldArray, set } from "react-hook-form";
import { Dropdown, Modal, Spin } from "antd";
import Image from "next/image";
import DownloadSuggestionModal from "./download-suggestion-modal";
import { menu } from "@/app/models/suggests";

declare const window: any;

export default function Suggests() {
  const [modal, contextHolder] = Modal.useModal();
  const [isInserting, setIsInserting] = useState(false);

  const [suggested, setSuggested] = useState<any[]>(suggestedActivity);

  const { register, watch, control } = useForm<any>({
    defaultValues: {
      suggestedActivities: suggestedActivity.map((activity) => ({
        activity: activity.activity,
        time: DateTime.fromISO(activity.time),
        description: activity.description,
      })),
    },
  });

  const downloadSuggestionModal = () => {
    Modal.info({
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

  const insertToGoogleCalendar = () => {
    setIsInserting(true);

    const CLIENT_ID =
      "155408969199-tl9skjs4dcnf8g8kur1bnr1kq6cibi2s.apps.googleusercontent.com";
    const API_KEY = "AIzaSyDKkFaXzy1Y22NQnuPhPGBGTZLSqL3bQSI";
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

    const initializeGapiClient = async () => {
      await window.gapi.client.init({
        apiKey: API_KEY,
      });
    };

    window.gapi.load("client", initializeGapiClient);

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
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

        const events = watch().suggestedActivities.map((activity: any) => ({
          summary: activity.activity,
          description: activity.description,
          start: {
            dateTime: activity.time.toISO(),
          },
          end: {
            dateTime: activity.time.plus({ hours: 1 }).toISO(),
          },
        }));

        let isAllInserted = true;
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
            console.log(response);
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
      };
    }
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

      <div className="bg-[#2a2c30] rounded-2xl mt-6 p-4 h-full">
        <div className="grid grid-cols-4 gap-4">
          {suggested.map((_, index) => (
            <FormItem
              register={register}
              control={control}
              key={index}
              id={index}
            />
          ))}
        </div>
      </div>
      {contextHolder}
    </main>
  );
}
