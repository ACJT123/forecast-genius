import { data } from "@/app/data";
import CardSm from "./card-sm";
import Image from "next/image";
import { visibilityMessage } from "@/app/models/visibility";
import { useWeather } from "@/app/context/WeatherContext";

export default function Visibility() {
  const { todayHighlight } = useWeather();

  if (!todayHighlight) return;

  const { value, msg } = todayHighlight?.visibility;

  return (
    <CardSm>
      <div>Visibility</div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl">{value}</span>

          <span className="text-xs opacity-50">&nbsp;km</span>
        </div>

        <div className="flex flex-col gap-2 opacity-50">
          <Image
            width="20"
            height="20"
            src="https://img.icons8.com/ios/100/FFFFFF/invisible.png"
            alt="invisible"
          />

          <p className="max-w-[180px]">{msg}</p>
        </div>
      </div>
    </CardSm>
  );
}
