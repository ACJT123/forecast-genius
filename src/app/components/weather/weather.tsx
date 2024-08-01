import { weatherData } from "@/app/data";
import { determineWeatherConditions } from "@/app/models/weather";
import { DateTime } from "luxon";
import Image from "next/image";

export default function Weather() {
  const temp = weatherData.data.values.temperature;
  const location = weatherData.location.name;
  const time = weatherData.data.time;

  return (
    <main className="bg-[#2a2c30] rounded-2xl p-8">
      <div className="rounded-full p-4 bg-black/50 w-fit ml-auto">
        <Image
          width="30"
          height="30"
          src="https://img.icons8.com/ios/100/FFFFFF/search--v1.png"
          alt="search--v1"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Image
          width="100"
          height="100"
          src={"/sun-cloud.png"}
          alt="search--v1"
        />
        <div>
          <span className="text-[50px]">
            {temp} <sup>°C</sup>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Image
            width="40"
            height="40"
            src="https://img.icons8.com/ios/100/FFFFFF/storm--v1.png"
            alt="storm--v1"
          />
          <span className="capitalize">
            {determineWeatherConditions(weatherData.data.values)}
          </span>
        </div>

        <hr className="h-0" />

        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-2">
            <Image
              width="20"
              height="20"
              src="https://img.icons8.com/ios/100/FFFFFF/marker--v1.png"
              alt="marker--v1"
            />
            {location}
          </div>
          <div className="flex items-start gap-2">
            <Image
              width="20"
              height="20"
              src="https://img.icons8.com/ios/100/FFFFFF/calendar--v1.png"
              alt="calendar--v1"
            />
            {DateTime.fromISO(time).toFormat("dd LLLL, yyyy t")}
          </div>
        </div>
      </div>
    </main>
  );
}
