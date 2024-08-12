import { data } from "@/app/data";
import { subArcData } from "@/app/models/gauge";
import GaugeComponent from "react-gauge-component";
import Card from "./card";
import { useWeather } from "@/app/context/WeatherContext";

export default function UVIndex() {
  const { forecastData } = useWeather();

  const data = forecastData?.forecastData.timelines.daily[0].values;

  return (
    <Card>
      <div>UV Index</div>

      <GaugeComponent
        className="uv-index"
        arc={{
          gradient: true,
          padding: 0.01,
          subArcs: subArcData.map((arc) => ({
            limit: arc.limit,
            color: arc.color,
            showTick: true,
          })),
        }}
        value={data?.uvIndexAvg}
        type="semicircle"
        maxValue={12}
        minValue={0}
      />

      <div className="text-center">
        <span className="text-[40px]">{data?.uvIndexAvg.toFixed(2)}</span>
        <span className="text-xs">&nbsp;&nbsp;UV</span>
      </div>
    </Card>
  );
}
