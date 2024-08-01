import { data } from "@/app/data";
import Card from "./card";
import WindStatusChart from "./wind-status-chart";
import { DateTime } from "luxon";

export default function WindStatus() {
  return (
    <Card>
      <div className="flex flex-col items-center">
        <div className="text-start w-full">Wind Status</div>

        <WindStatusChart />

        <div className="flex items-baseline justify-between w-full">
          <div>
            <span className="text-[40px]">
              {data.timelines.hourly[0].values.windSpeed?.toFixed(2)}
            </span>
            <span className="text-xs">&nbsp;km/h</span>
          </div>
          <div className="text-xl">
            {DateTime.fromISO(data.timelines.hourly[0].time).toFormat("t")}
          </div>
        </div>
      </div>
    </Card>
  );
}
