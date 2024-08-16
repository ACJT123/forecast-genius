import { data } from "@/app/data";
import CardSm from "./card-sm";
import Image from "next/image";
import { useWeather } from "@/app/context/WeatherContext";

export default function Humidity() {
  const { todayHighlight } = useWeather();

  if (!todayHighlight) return;

  const { value, dewPoint } = todayHighlight?.humidity;

  return (
    <CardSm title="Humidity">
      <div className="flex items-center gap-8">
        <div>
          <span className="text-3xl">{value}</span>

          <span className="text-xs opacity-50">&nbsp;%</span>
        </div>

        <div className="flex flex-col gap-2 opacity-50">
          {/* <Image
            width="20"
            height="20"
            src="https://img.icons8.com/ios/100/FFFFFF/blur.png"
            alt="water"
          /> */}

          <p className="w-fit text-sm text-right">
            The dew point is {dewPoint}
            <sup>°</sup>C right now
          </p>
        </div>
      </div>
    </CardSm>
  );
}
