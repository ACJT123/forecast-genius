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

  console.log(watch().suggestedActivities);

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

  return (
    <main className="col-span-2 h-full">
      {contextHolder}
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
        {/* <DndContext sensors={sensors} onDragEnd={handleDragEnd}> */}
        {/* <SortableContext items={sortedItems} strategy={rectSwappingStrategy}> */}
        <form>
          <div className="grid grid-cols-4 gap-4">
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
