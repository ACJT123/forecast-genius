import { useWeather } from "@/app/context/WeatherContext";
import Card from "./card";
import { data } from "@/app/data";
import { DateTime } from "luxon";
import GaugeComponent from "react-gauge-component";
import { convertTo12Hour, convertToUTC } from "@/app/util/date";

export default function SunriseSunset() {
  const { forecastData } = useWeather();

  const data = forecastData?.forecastData.timelines.daily[0].values;

  console.log(data?.sunriseTime, data?.sunsetTime);

  let sunrise = DateTime.fromISO(data?.sunriseTime, { zone: "Asia/Singapore" });
  let sunset = DateTime.fromISO(data?.sunsetTime, { zone: "Asia/Singapore" });

  console.log(sunrise.hour, sunset.hour);

  return (
    <>
      {data && (
        <Card>
          <div>Sunrise & Sunset</div>

          <GaugeComponent
            className="sunrise-sunset"
            arc={{
              gradient: true,
              padding: 0.01,
              width: 0.05,
              subArcs: [
                {
                  limit: 0,
                  color: "#FFC62D",
                },
                {
                  limit: 24 ,
                  color: "#FF8157",
                },
              ],
            }}
            pointer={{ type: "blob", animationDelay: 0, width: 15 }}
            labels={{
              valueLabel: {
                formatTextValue: (value) => convertTo12Hour(value),
              },
              tickLabels: {
                type: "inner",
                defaultTickValueConfig: {
                  formatTextValue: (value) => convertTo12Hour(value),
                },
              },
            }}
            value={DateTime.now().hour}
            type="semicircle"
            minValue={0}
            maxValue={24}
          />

          <div className="flex items-center justify-between px-[50px]">
            <div>Sunrise</div>
            <div>Sunset</div>
          </div>
        </Card>
      )}
    </>
  );
}
