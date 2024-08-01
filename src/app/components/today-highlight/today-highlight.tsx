"use client";

import { data } from "@/app/data";
import Image from "next/image";
import Card from "./card";
import CardSm from "./card-sm";
import "./style.scss";
import UVIndex from "./uv-index";
import WindStatus from "./wind-status";
import SunriseSunset from "./sunrise-sunset";
import Humidity from "./humidity";

export default function TodayHighlight() {
  return (
    <main className="bg-[#2a2c30] rounded-2xl p-8">
      <h1>Today&apos;s Highlight</h1>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <WindStatus />
        <UVIndex />
        <SunriseSunset />
        <Humidity />
        <CardSm>
          <div>Visibility</div>
          {data.timelines.daily[0].values.visibilityMax}
        </CardSm>
        <CardSm>
          <div>Feels Like</div>
          {data.timelines.daily[0].values.temperatureMax}
        </CardSm>
      </div>
    </main>
  );
}
