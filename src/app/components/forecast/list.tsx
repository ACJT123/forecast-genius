import { forecastData } from "@/app/data";
import { renderWeatherIcon, WEATHER_CODES } from "@/app/models/forecast";
import { DateTime } from "luxon";
import Image from "next/image";
import { useEffect, useState } from "react";

type Ilist = {
  selectedForecastType: string;
};

export default function List({ selectedForecastType }: Ilist) {
  const [data, setData] = useState<
    {
      temperature: number;
      weatherCode: number;
      time: string;
    }[]
  >([]);

  useEffect(() => {
    let data = [];

    if (selectedForecastType === "daily") {
      data = forecastData.timelines.daily.map((item) => ({
        temperature: item.values.temperatureAvg,
        weatherCode: item.values.weatherCodeMin,
        time: item.time,
      }));
    } else if (selectedForecastType === "hourly") {
      data = forecastData.timelines.hourly
        .filter(
          (item) =>
            DateTime.fromISO(item.time).toFormat("dd") ===
            DateTime.now().toFormat("dd")
        ) // show today only
        .map((item) => ({
          temperature: item.values.temperature,
          weatherCode: item.values.weatherCode,
          time: item.time,
        }));
    } else {
      data = forecastData.timelines.minutely.map((item) => ({
        temperature: item.values.temperature,
        weatherCode: item.values.weatherCode,
        time: item.time,
      }));
    }

    setData(data);
  }, [selectedForecastType]);

  return (
    <div className="h-[400px] overflow-scroll forecast-list flex flex-col gap-8">
      {data.map((item, index) => (
        <div
          className="grid grid-cols-3 items-center justify-items-center"
          key={index}
        >
          <div className="flex items-center gap-4">
            <Image
              width="40"
              height="40"
              src={renderWeatherIcon(item.weatherCode)}
              alt="weather icon"
            />
            <div className="text-3xl">
              {item.temperature.toFixed(1)}
              <sup>°</sup>
            </div>
          </div>
          {selectedForecastType === "daily" ? (
            <>
              <div>{DateTime.fromISO(item.time).toFormat("dd LLL")}</div>
              <div>{DateTime.fromISO(item.time).toFormat("EEEE")}</div>
            </>
          ) : (
            <div className="col-span-2">
              {DateTime.fromISO(item.time).toFormat("t")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
