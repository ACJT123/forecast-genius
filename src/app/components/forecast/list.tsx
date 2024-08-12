import { useWeather } from "@/app/context/WeatherContext";
import { renderWeatherIcon } from "@/app/models/forecast";
import { DateTime } from "luxon";
import Image from "next/image";
import { useEffect, useState } from "react";

type Ilist = {
  selectedForecastType: string;
};

export default function List({ selectedForecastType }: Ilist) {
  const [groupedData, setGroupedData] = useState<{ [key: string]: any[] }>({});
  const [plainData, setPlainData] = useState<any[]>([]);

  const { forecastData } = useWeather();

  useEffect(() => {
    let data = [];

    if (selectedForecastType === "daily") {
      data = forecastData?.forecastData.timelines.daily.map((item) => ({
        temperature: item.values.temperatureAvg,
        weatherCode: item.values.weatherCodeMin,
        time: item.time,
      }));
      setPlainData(data);
    } else if (selectedForecastType === "hourly") {
      data = forecastData?.forecastData.timelines.hourly.map((item) => ({
        temperature: item.values.temperature,
        weatherCode: item.values.weatherCode,
        time: item.time,
      }));

      // Group hourly data by date using a plain object
      const grouped = data.reduce((acc, item) => {
        const date = DateTime.fromISO(item.time).toFormat("yyyy-MM-dd"); // for grouping by date

        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);

        return acc;
      }, {});

      setGroupedData(grouped);
    } else {
      data = forecastData?.forecastData.timelines.minutely.map((item) => ({
        temperature: item.values.temperature,
        weatherCode: item.values.weatherCode,
        time: item.time,
      }));
      setPlainData(data);
    }
  }, [selectedForecastType, forecastData]);

  const renderData = () => {
    if (selectedForecastType === "hourly") {
      return Object.keys(groupedData).map((date) => (
        <div key={date} className="flex flex-col gap-2">
          <div className="pl-4 font-bold text-lg">
            {DateTime.fromISO(date).toFormat("dd LLL yyyy")}
          </div>

          {groupedData[date].map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 items-center justify-items-center"
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

              <div className="col-span-2">
                {DateTime.fromISO(item.time).toFormat("t")}
              </div>
            </div>
          ))}
        </div>
      ));
    } else {
      return plainData?.map((item, index) => (
        <div key={index}>
          <div className="grid grid-cols-3 items-center justify-items-center">
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
        </div>
      ));
    }
  };

  return (
    <div className="h-full max-h-[900px] overflow-scroll forecast-list flex flex-col gap-8">
      {renderData()}
    </div>
  );
}
