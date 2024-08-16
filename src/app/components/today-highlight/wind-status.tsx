"use client";

import Card from "./card";
import { useWeather } from "@/app/context/WeatherContext";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";

export default function WindStatus() {
  const { todayHighlight } = useWeather();

  if (!todayHighlight) return;

  const settings = {
    valueFormatter: (v: number | null) => `${v} km/h`,
  } as const;

  const { data, current, min, max, avg } = todayHighlight?.windStatus;

  const newTheme = createTheme({ palette: { mode: "dark" } });

  return (
    <Card>
      <div className="flex flex-col items-center">
        <div className="text-start w-full">Wind Status</div>

        <ThemeProvider theme={newTheme}>
          <SparkLineChart
            data={data.map((item: any) => item.value)}
            width={280}
            height={150}
            curve="natural"
            area
            showHighlight
            showTooltip
            {...settings}
            xAxis={{
              scaleType: "band",
              data: data.map((item: any) => item.time),
            }}
          />
        </ThemeProvider>

        <div className="text-center mt-4">
          <span className="text-[40px]">{current.value}</span>
          <span className="text-xs">&nbsp;km/h</span>
        </div>

        <div className="w-full mt-4">
          <div className="flex items-baseline justify-between w-full">
            <div>
              <span className="text-[30px]">{min.value}</span>
              <span className="text-xs">&nbsp;km/h</span>
              &nbsp;(min)
            </div>
            <div>
              <span className="text-[10px]">{min.time}</span>
            </div>
          </div>

          <div className="flex items-baseline justify-between w-full">
            <div>
              <span className="text-[30px]">{max.value}</span>
              <span className="text-xs">&nbsp;km/h</span>
              &nbsp;(max)
            </div>
            <div>
              <span className="text-[10px]">{max.time}</span>
            </div>
          </div>

          <div className="flex items-baseline justify-between w-full">
            <div>
              <span className="text-[30px]">{avg}</span>
              <span className="text-xs">&nbsp;km/h</span>
              &nbsp;(avg)
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
