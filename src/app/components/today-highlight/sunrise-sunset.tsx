"use client";

import { useWeather } from "@/app/context/WeatherContext";
import { convertTo12Hour } from "@/app/util/date";
import { Spin } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import Card from "./card";

export default function SunriseSunset() {
  const { todayHighlight } = useWeather();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const convert = async () => {
      const data = todayHighlight?.riseAndSet;

      if (!data) return;

      const sunrise = await convertTo12Hour(data?.sunrise);
      const sunset = await convertTo12Hour(data?.sunset);
      const moonrise = await convertTo12Hour(data?.moonrise);
      const moonset = await convertTo12Hour(data?.moonset);

      setData({ sunrise, sunset, moonrise, moonset });
    };

    convert();
  }, [todayHighlight]);

  return (
    <Card className="">
      {data ? (
        <>
          <div>Rise and Set</div>

          <div className="grid grid-cols-2 justify-items-center text-center gap-x-[30px] mt-8">
            <div>
              <h1 className="text-lg">Sunrise</h1>

              <Image
                width="80"
                height="80"
                src="https://img.icons8.com/fluency/96/sunrise.png"
                alt="sunrise"
              />

              <h2>{data?.sunrise}</h2>
            </div>

            <div>
              <h1 className="text-lg">Sunset</h1>

              <Image
                width="80"
                height="80"
                src="https://img.icons8.com/fluency/96/sunset.png"
                alt="sunset"
              />

              <h2>{data?.sunset}</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 justify-items-center text-center mt-8 gap-x-[30px]">
            <div>
              <h1 className="text-lg">Moonrise</h1>

              <Image
                width="80"
                height="80"
                src="https://img.icons8.com/fluency/96/moonrise.png"
                alt="moonrise"
              />

              <h2>{data?.moonrise}</h2>
            </div>

            <div>
              <h1 className="text-lg">Moonset</h1>

              <Image
                width="80"
                height="80"
                src="https://img.icons8.com/fluency/96/moonset.png"
                alt="moonset"
              />

              <h2>{data?.moonset}</h2>
            </div>
          </div>
        </>
      ) : (
        <Spin />
      )}
    </Card>
  );
}
