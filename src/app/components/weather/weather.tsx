"use client";

import { useWeather } from "@/app/context/WeatherContext";
import { data } from "@/app/data";
import { determineWeatherConditions } from "@/app/models/weather";
import { API_KEY, getData } from "@/app/util/http";
import { Skeleton, Spin } from "antd";
import { DateTime } from "luxon";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import LocationSearch from "./location-search";
import { renderWeatherIcon } from "@/app/models/forecast";
import "./style.scss";

export default function Weather() {
  const [openSearch, setOpenSearch] = useState(false);
  const { weatherData, isLoading, setLocationSearch } = useWeather();

  const temp = weatherData?.data.values.temperature;
  const location = weatherData?.location.name;
  const time = weatherData?.data.time;
  const code = weatherData?.data.values.weatherCode;
  const weatherValues = weatherData?.data.values;

  return (
    <main className="bg-[#2a2c30] rounded-2xl p-8 h-full">
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <LocationSearch
            open={openSearch}
            onClose={() => {
              setOpenSearch(false);
            }}
            concat={(value) => {
              for (const v of value) {
                if (v !== "") {
                  setLocationSearch(v);
                  break;
                }
              }

              // save to local storage
              localStorage.setItem("location", value.join(","));

              setOpenSearch(false);
            }}
          />

          <div className="rounded-full p-4 bg-black/50 w-fit ml-auto">
            <Image
              width="30"
              height="30"
              src="https://img.icons8.com/ios/100/FFFFFF/search--v1.png"
              alt="search--v1"
              className="cursor-pointer hover:opacity-80"
              onClick={() => setOpenSearch(true)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Image
              width="100"
              height="100"
              src={renderWeatherIcon(code)}
              alt={determineWeatherConditions(weatherValues)}
            />

            <div className="flex items-center gap-4">
              <span className="capitalize">
                {determineWeatherConditions(weatherValues)}
              </span>
            </div>

            <div>
              <span className="text-[50px]">
                {temp} <sup>°C</sup>
              </span>
            </div>

            <hr />

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-2">
                <Image
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios/100/FFFFFF/marker--v1.png"
                  alt="location-icon"
                />
                {location}
              </div>

              <div className="flex items-start gap-2">
                <Image
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios/100/FFFFFF/calendar--v1.png"
                  alt="calendar-icon"
                />
                {DateTime.fromISO(time).toFormat("dd LLLL, yyyy t")}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
