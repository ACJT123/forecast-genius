"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
import { getData } from "../util/http"; // Import your additional data fetching function

interface WeatherContextType {
  weatherData: any;
  forecastData: any; // Add another property for additional data
  isLoading: boolean;
  savedLocation: string;
  setLocationSearch: (location: string) => void;
}

const WeatherContext = createContext<WeatherContextType>({
  weatherData: null,
  forecastData: null,
  isLoading: true,
  savedLocation: "",
  setLocationSearch: () => {},
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [locationSearch, setLocationSearch] = useState<string>();

  useEffect(() => {
    let location = null;

    // get location from local storage
    const savedLocation = localStorage.getItem("location")?.split(",");
    if (savedLocation) {
      for (const v of savedLocation) {
        if (v !== "") {
          location = v;
          break;
        }
      }
    } else {
      location = "Kuala Lumpur";
    }

    if (location) {
      setLocationSearch(encodeURI(location));
    }
  }, [locationSearch]);

  // Fetch weather data
  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherLoading,
  } = useSWR(
    locationSearch
      ? `http://localhost:4000/weather/realtime/${locationSearch}`
      : null,
    getData,
    {
      errorRetryInterval: 10000,
    }
  );

  // Fetch additional data
  const {
    data: forecastData,
    error: forecastError,
    isLoading: forecastLoading,
  } = useSWR(
    locationSearch
      ? `http://localhost:4000/weather/forecast/${locationSearch}`
      : null,
    getData,
    {
      errorRetryInterval: 10000,
    }
  );

  // Combine loading states
  const isLoading = weatherLoading || forecastLoading;
  const error = weatherError || forecastError;

  // save location coordinates to local storage
  useEffect(() => {
    if (weatherData) {
      localStorage.setItem(
        "cor",
        `${weatherData.location.lat},${weatherData.location.lon}`
      );
    }
  }, [weatherData]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData: weatherData,
        forecastData: forecastData,
        isLoading,
        savedLocation: locationSearch || "",
        setLocationSearch,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
