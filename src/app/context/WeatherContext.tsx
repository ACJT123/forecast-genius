"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import useSWR from "swr";
import { API_KEY, getData } from "../util/http";

interface WeatherContextType {
  data: any;
  isLoading: boolean;
}

const WeatherContext = createContext<WeatherContextType>({
  data: null,
  isLoading: true,
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const { data, error, isLoading } = useSWR(
    // `https://api.tomorrow.io/v4/weather/forecast?location=kuala%20lumpur` + API_KEY,
    getData
  );

  // console.log(data);

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;

  return (
    <WeatherContext.Provider value={{ data, isLoading }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
