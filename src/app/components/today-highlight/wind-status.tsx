import { data } from "@/app/data";
import Card from "./card";
import WindStatusChart from "./wind-status-chart";
import { DateTime } from "luxon";
import { useWeather } from "@/app/context/WeatherContext";

export default function WindStatus() {
  const { forecastData } = useWeather();

  const data = forecastData?.forecastData.timelines.daily[0];

  return (
    <Card>
      <div className="flex flex-col items-center">
        <div className="text-start w-full">Wind Status</div>

        <WindStatusChart data={forecastData?.forecastData.timelines.hourly} />

        <div className="flex items-baseline justify-between w-full">
          <div>
            <span className="text-[40px]">
              {data?.values.windSpeedAvg.toFixed(2)}
            </span>
            <span className="text-xs">&nbsp;km/h</span>
          </div>

          <div className="text-xl">
            {/* {DateTime.fromISO(data.timelines.hourly[0].time).toFormat("t")} */}
          </div>
        </div>
      </div>
    </Card>
  );
}
