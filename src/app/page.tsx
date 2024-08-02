import Image from "next/image";
import { data } from "./data";
import Card from "./components/today-highlight/card";
import TodayHighlight from "./components/today-highlight/today-highlight";
import WindStatus from "./components/today-highlight/wind-status";
import Weather from "./components/weather/weather";

export default function Home() {
  return (
    <main className="grid grid-cols-3 gap-8 p-4">
      <Weather />
      <TodayHighlight />
    </main>
  );
}
