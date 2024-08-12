import * as React from "react";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { data } from "@/app/data";

type IWindStatusChart = {
  data: any;
};

export default function WindStatusChart({ data }: IWindStatusChart) {
  const format = () => {
    return data
      ?.map((item: any, index: number) => {
        if (index <= 30) return item.values.windSpeed;
      })
      .filter((value: any) => value !== undefined);
  };

  return (
    <>
      {data && (
        <ChartContainer
          width={350}
          height={200}
          colors={["#28b6f5"]}
          series={[{ data: format(), label: "uv", type: "bar" }]}
          xAxis={[{ scaleType: "band", data: format() }]}
        >
          <BarPlot />
        </ChartContainer>
      )}
    </>
  );
}
