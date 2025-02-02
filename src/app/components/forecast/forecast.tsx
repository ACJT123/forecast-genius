"use client";

import "./style.scss";
import { useState } from "react";
import List from "./list";
import SelectComponent from "../general/select";

export default function Forecast() {
  const [forecastType, setForecastType] = useState("daily");

  const handleChange = (value: string) => {
    setForecastType(value.toLowerCase());
  };

  return (
    <main className="">
      <div className="flex items-center justify-between">
        <h1 className="capitalize">{forecastType} Forecast</h1>
        <SelectComponent
          options={[
            { value: "Daily", label: "Daily" },
            { value: "Hourly", label: "Hourly" },
            // { value: "Minutely", label: "Minutely" }, // temporarily removed
          ]}
          handleChange={handleChange}
          defaultValue="Daily"
        />
      </div>
      <div className="bg-[#2a2c30] rounded-2xl mt-4 py-4">
        <List selectedForecastType={forecastType} />
      </div>
    </main>
  );
}
