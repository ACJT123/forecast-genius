"use client";

import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DateTime } from "luxon";
import Image from "next/image";
import TimePicker from "./time-picker";

type ISortableItem = {
  register: any;
  id: number;
  suggestedAcvities: {
    time: string;
  }[];
};

export default function SortableItem({
  register,
  id,
  suggestedAcvities,
}: ISortableItem) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const time = DateTime.fromISO(suggestedAcvities[id].time, {
    zone: "utc",
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-[#111e25] rounded-2xl px-4 pt-4 pb-8"
    >
      <Image
        {...attributes}
        {...listeners}
        ref={setActivatorNodeRef}
        width="20"
        height="20"
        src="https://img.icons8.com/ios-glyphs/60/FFFFFF/resize-four-directions--v1.png"
        alt="resize-four-directions--v1"
        className="cursor-pointer hover:brightness-150 ml-auto"
      />

      <div className="text-center mt-4">
        <input
          {...register(`suggestedActivities.${id}.activity`)}
          type="text"
          placeholder="Activity"
          className="w-full bg-[#2a2c30] text-white p-2 rounded-lg"
        />

        <TimePicker
          className="w-full bg-[#2a2c30] text-white p-2 rounded-lg my-4"
          defaultValue={time}
          needConfirm={false}
          format={"t"}
          use12Hours={true}
        />

        <textarea
          {...register(`suggestedActivities.${id}.description`)}
          placeholder="Description"
          className="w-full bg-[#2a2c30] text-white p-2 rounded-lg"
        />
      </div>
    </div>
  );
}
