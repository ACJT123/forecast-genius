import { data } from "@/app/data";
import CardSm from "./card-sm";
import Image from "next/image";
import { useWeather } from "@/app/context/WeatherContext";

export default function Humidity() {
  const { forecastData } = useWeather();

  const data = forecastData?.forecastData.timelines.daily[0];

  return (
    <CardSm>
      <div>Humidity</div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl">
            {data?.values.humidityMax}
          </span>

          <span className="text-xs opacity-50">&nbsp;%</span>
        </div>

        <div className="flex flex-col gap-2 opacity-50">
          <Image
            width="20"
            height="20"
            src="https://img.icons8.com/ios/100/FFFFFF/blur.png"
            alt="water"
          />

          <p className="max-w-[200px]">
            The dew point is {data?.values.dewPointAvg}
            <sup>°</sup>C right now
          </p>
        </div>
      </div>
    </CardSm>
  );
}
