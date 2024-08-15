import { subArcData } from "@/app/models/gauge";
import GaugeComponent from "react-gauge-component";
import Card from "./card";
import { useWeather } from "@/app/context/WeatherContext";

export default function UVIndex() {
  const { todayHighlight } = useWeather();

  if (!todayHighlight) return;

  const { current, min, max, avg } = todayHighlight?.uvIndex;

  return (
    <Card>
      <div>UV Index</div>

      <GaugeComponent
        className="uv-index mt-8"
        arc={{
          gradient: true,
          padding: 0.01,
          subArcs: subArcData.map((arc) => ({
            limit: arc.limit,
            color: arc.color,
            showTick: true,
          })),
        }}
        value={current.value}
        type="semicircle"
        maxValue={12}
        minValue={0}
      />

      <div className="text-center">
        <span className="text-[40px]">{current.value}</span>
        <span className="text-xs">&nbsp;&nbsp;UV</span>
      </div>

      <div className="w-full mt-4">
        <div className="flex items-baseline justify-between w-full">
          <div>
            <span className="text-[30px]">{min.value}</span>
            <span className="text-xs">&nbsp;UV</span>
            &nbsp;(min)
          </div>
          <div>
            <span className="text-[10px]">{min.time}</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between w-full">
          <div>
            <span className="text-[30px]">{max.value}</span>
            <span className="text-xs">&nbsp;UV</span>
            &nbsp;(max)
          </div>
          <div>
            <span className="text-[10px]">{max.time}</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between w-full">
          <div>
            <span className="text-[30px]">{avg}</span>
            <span className="text-xs">&nbsp;UV</span>
            &nbsp;(avg)
          </div>
        </div>
      </div>
    </Card>
  );
}
