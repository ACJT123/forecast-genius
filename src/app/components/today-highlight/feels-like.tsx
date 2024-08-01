import { data } from "@/app/data";
import CardSm from "./card-sm";
import Image from "next/image";
import { feelsLikeMessage } from "@/app/models/feels-like";

// feels like = temperature apparent
export default function FeelsLike() {
  const tempApp = data.timelines.daily[0].values.temperatureApparentAvg;

  return (
    <CardSm>
      <div>Visibility</div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl">{tempApp}</span>
          <span className="text-xs opacity-50">
            <sup>°</sup> C
          </span>
        </div>
        <div className="flex flex-col gap-2 opacity-50">
          <Image
            width="20"
            height="20"
            src="https://img.icons8.com/ios/100/FFFFFF/thermometer.png"
            alt="thermometer"
          />
          <p className="max-w-[180px]">{feelsLikeMessage(tempApp)}</p>
        </div>
      </div>
    </CardSm>
  );
}
