"use client";

import { data } from "@/app/data";
import Image from "next/image";
import Card from "./card";
import CardSm from "./card-sm";
import dynamic from "next/dynamic";
import "./style.scss";
import { subArcData } from "@/app/models/gauge";
import UVIndex from "./uv-index";
import WindStatus from "./wind-status";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

export default function TodayHighlight() {
  return (
    <main className="bg-[#2a2c30] rounded-2xl p-8">
      <h1>Today&apos;s Highlight</h1>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <WindStatus />
        <UVIndex />
        <Card>
          <div>Sunrise & Sunset</div>
          {data.timelines.daily[0].values.sunriseTime}
          {data.timelines.daily[0].values.sunsetTime}
        </Card>
        <CardSm>
          <div>Humidity</div>
          {data.timelines.daily[0].values.humidityMax}
        </CardSm>
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
