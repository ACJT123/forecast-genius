import { data } from "@/app/data";
import Image from "next/image";
import Card from "./card";
import CardSm from "./card-sm";

export default function TodayHighlight() {
  return (
    <main className="bg-[#252724] rounded-2xl p-8">
      <h1>Today&apos;s Highlight</h1>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <Card>
          <div>Wind Status</div>
          {data.timelines.daily[0].values.windSpeedMax}
        </Card>
        <Card>
          <div>UV Index</div>
          {data.timelines.daily[0].values.uvIndexMax}
        </Card>
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
