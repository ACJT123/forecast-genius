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
      ? `http://localhost:4000/weather/realtime1/${locationSearch}`
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
      ? `http://localhost:4000/weather/forecast1/${locationSearch}`
      : null,
    getData,
    {
      errorRetryInterval: 10000,
    }
  );

  // Combine loading states
  const isLoading = weatherLoading || forecastLoading;
  const error = weatherError || forecastError;

  const mockData = {
    data: {
      time: "2023-01-26T07:48:00Z",
      values: {
        cloudBase: 0.07,
        cloudCeiling: 0.07,
        cloudCover: 100,
        dewPoint: 0.88,
        freezingRainIntensity: 0,
        humidity: 96,
        precipitationProbability: 0,
        pressureSurfaceLevel: 984.57,
        rainIntensity: 0,
        sleetIntensity: 0,
        snowIntensity: 0,
        temperature: 1.88,
        temperatureApparent: -0.69,
        uvHealthConcern: 0,
        uvIndex: 0,
        visibility: 9.9,
        weatherCode: 1001,
        windDirection: 10,
        windGust: 3.38,
        windSpeed: 2.38,
      },
    },
    location: {
      lat: 43.653480529785156,
      lon: -79.3839340209961,
      name: "Old Toronto, Toronto, Golden Horseshoe, Ontario, Canada",
      type: "administrative",
    },
  };

  console.log(weatherData, forecastData);

  return (
    <WeatherContext.Provider
      value={{
        weatherData: weatherData || mockData,
        forecastData: forecastData || mockData,
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
