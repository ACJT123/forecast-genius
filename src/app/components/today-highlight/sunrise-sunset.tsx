import Card from "./card";
import { data } from "@/app/data";
import { DateTime } from "luxon";
import GaugeComponent from "react-gauge-component";

export default function SunriseSunset() {
  const sunrise = DateTime.fromISO(data.timelines.daily[0].values.sunriseTime, {
    zone: "utc",
  });
  const sunset = DateTime.fromISO(data.timelines.daily[0].values.sunsetTime, {
    zone: "utc",
  });

  const convertTo12Hour = (value: number) => {
    return DateTime.fromObject(
      {
        hour: value,
      },
      { zone: "utc" }
    ).toFormat("h a");
  };

  return (
    <Card>
      <div>Sunrise & Sunset</div>

      <GaugeComponent
        className="sunrise-sunset"
        arc={{
          gradient: true,
          padding: 0.01,
          width: 0.05,
          subArcs: [
            {
              limit: sunrise.hour,
              color: "#FFC62D",
            },
            {
              limit: sunset.hour,
              color: "#FF8157",
            },
          ],
        }}
        pointer={{ type: "blob", animationDelay: 0, width: 15 }}
        labels={{
          valueLabel: {
            formatTextValue: (value) => convertTo12Hour(value),
          },
          tickLabels: {
            type: "inner",
            defaultTickValueConfig: {
              formatTextValue: (value) => convertTo12Hour(value),
            },
          },
        }}
        value={DateTime.now().hour}
        type="semicircle"
        minValue={sunrise.hour}
        maxValue={sunset.hour}
      />

      <div className="flex items-center justify-between px-[50px]">
        <div>Sunrise</div>
        <div>Sunset</div>
      </div>
    </Card>
  );
}
