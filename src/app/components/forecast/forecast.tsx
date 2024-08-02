"use client";

import "./style.scss";
import ForecastSelect from "./select";
import { useState } from "react";
import List from "./list";

export default function Forecast() {
  const [forecastType, setForecastType] = useState("daily");

  const handleChange = (value: string) => {
    setForecastType(value.toLowerCase());
  };

  return (
    <main className="">
      <div className="flex items-center justify-between">
        <h1 className="capitalize">{forecastType} Forecast</h1>
        <ForecastSelect handleChange={handleChange} />
      </div>
      <div className="bg-[#2a2c30] rounded-2xl mt-4 py-4">
        <List selectedForecastType={forecastType} />
      </div>
    </main>
  );
}
