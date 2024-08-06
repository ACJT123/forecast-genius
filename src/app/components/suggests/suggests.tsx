"use client";

import { suggestedActivity } from "@/app/data";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./sortable-item";
import Item from "antd/es/list/Item";
import { useForm, SubmitHandler, useFieldArray, set } from "react-hook-form";
import SelectComponent from "../general/select";
import { Dropdown, Modal } from "antd";
import Image from "next/image";
import DownloadSuggestionModal from "./download-suggestion-modal";
import { menu } from "@/app/models/suggests";
import { convertToUTC } from "@/app/util/date";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth, firebaseConfig } from "@/app/models/firebase";

declare const gapi: any;

export default function Suggests() {
  const [modal, contextHolder] = Modal.useModal();

  const [sortedItems, setSortedItems] = useState<any[]>(suggestedActivity);
  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   })
  // );

  // const handleDragEnd = (event: any) => {
  //   const { active, over } = event;

  //   if (active.id !== over.id) {
  //     setItems((items) => {
  //       const oldIndex = items.indexOf(active.id);
  //       const newIndex = items.indexOf(over.id);

  //       return arrayMove(items, oldIndex, newIndex);
  //     });
  //   }
  // };

  const { register, watch, control } = useForm<any>({
    defaultValues: {
      suggestedActivities: suggestedActivity.map((activity) => ({
        activity: activity.activity,
        time: DateTime.fromISO(activity.time, {
          zone: "utc",
        }),
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

  const handleChange = (value: any) => {
    const { key } = value;

    switch (key) {
      case "1":
        downloadSuggestionModal();
        break;
      case "2":
        console.log("Insert to Google Calendar");
        break;
      default:
        console.log("Refresh");
        break;
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      // Make sure there is a valid user object

      if (user) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://apis.google.com/js/api.js";
        // Once the Google API Client is loaded, you can run your code
        script.onload = function (e) {
          // Initialize the Google API Client with the config object
          gapi.client
            .init({
              apiKey: firebaseConfig.apiKey,
              clientId: firebaseConfig.clientId,
              scope: firebaseConfig.scopes.join(" "),
            })
            // Loading is finished, so start the app
            .then(function () {
              // Make sure the Google API Client is properly signed in
              if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                auth.currentUser?.getIdToken().then(function (token) {
                  console.log(token);
                });
              }
            });
        };
        // Add to the document
        document.getElementsByTagName("head")[0].appendChild(script);
      }
    });
  }, []);

  return (
    <main className="col-span-2 h-full order-4 md:order-4">
      {contextHolder}
      <div className="flex items-center justify-between">
        <h1>
          Based on today&apos;s weather, here are some suggested activities
        </h1>

        <button
          onClick={async () => {
            await signInWithRedirect(auth, new GoogleAuthProvider()).then(
              () => {
                console.log("Signed in");
              }
            );
          }}
        >
          Login
        </button>

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
        {/* <DndContext sensors={sensors} onDragEnd={handleDragEnd}> */}
        {/* <SortableContext items={sortedItems} strategy={rectSwappingStrategy}> */}
        <form>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {sortedItems.map((_, index) => (
              <SortableItem
                register={register}
                control={control}
                key={index}
                id={index}
              />
            ))}
          </div>
        </form>
        {/* </SortableContext> */}
        {/* </DndContext> */}
      </div>
    </main>
  );
}
