"use client";

import SelectComponent from "../general/select";

export default function WeatherConditionMap() {
  const handleChange = (value: string) => {
    // setForecastType(value.toLowerCase());
  };

  return (
    <main className="col-span-2">
      <div className="flex items-center justify-between">
        <h1 className="capitalize">Weather Condition Map</h1>
        <SelectComponent
          options={[
            { value: "Daily", label: "Daily" },
            { value: "Hourly", label: "Hourly" },
            { value: "Minutely", label: "Minutely" },
          ]}
          handleChange={handleChange}
        />
      </div>
      <div className="bg-[#2a2c30] rounded-2xl mt-4 py-4"></div>
    </main>
  );
}
