"use client";

import { data } from "@/app/data";
import Card from "./card";
import WindStatusChart from "./wind-status-chart";
import { DateTime } from "luxon";
import { useWeather } from "@/app/context/WeatherContext";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

export default function WindStatus() {
  const { forecastData } = useWeather();

  if (!forecastData) return;

  const settings = {
    valueFormatter: (v: number | null) => `${v} km/h`,
  } as const;

  return (
    <Card>
      <div className="flex flex-col items-center">
        <div className="text-start w-full">Wind Status</div>

        {/* <WindStatusChart data={forecastData?.forecastData.timelines.hourly} /> */}

        <SparkLineChart
          data={forecastData?.todayHightlight.windStatus.data.map(
            (item: any) => item.windSpeed
          )}
          width={280}
          height={150}
          curve="natural"
          area
          showHighlight
          showTooltip
          {...settings}
          xAxis={{
            scaleType: "band",
            data: forecastData?.todayHightlight.windStatus.data.map(
              (item: any) => item.time
            ),
          }}
        />

        <div className="w-full mt-4">
          <div className="flex items-baseline justify-between w-full">
            <div>
              <span className="text-[30px]">
                {forecastData?.todayHightlight.windStatus.avg}
              </span>
              <span className="text-xs">&nbsp;km/h</span>
              &nbsp;(avg)
            </div>
          </div>

          <div className="flex items-baseline justify-between w-full">
            <div>
              <span className="text-[30px]">
                {forecastData?.todayHightlight.windStatus.min.speed}
              </span>
              <span className="text-xs">&nbsp;km/h</span>
              &nbsp;(min)
            </div>
            <div>
              <span className="text-[10px]">
                {forecastData?.todayHightlight.windStatus.min.time}
              </span>
            </div>
          </div>

          <div className="flex items-baseline justify-between w-full">
            <div>
              <span className="text-[30px]">
                {forecastData?.todayHightlight.windStatus.max.speed}
              </span>
              <span className="text-xs">&nbsp;km/h</span>
              &nbsp;(max)
            </div>
            <div>
              <span className="text-[10px]">
                {forecastData?.todayHightlight.windStatus.max.time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
