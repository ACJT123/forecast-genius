import * as React from "react";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { data } from "@/app/data";

const uData = data.timelines.hourly
  .map((item, index) => {
    if (index <= 30) return item.values.windSpeed;
  })
  .filter((value) => value !== undefined);

export default function WindStatusChart() {
  return (
    <ChartContainer
      width={350}
      height={200}
      colors={["#28b6f5"]}
      series={[{ data: uData, label: "uv", type: "bar" }]}
      xAxis={[{ scaleType: "band", data: uData }]}
    >
      <BarPlot />
    </ChartContainer>
  );
}
