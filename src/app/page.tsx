import Image from "next/image";
import { data } from "./data";
import Card from "./components/today-highlight/card";
import TodayHighlight from "./components/today-highlight/today-highlight";
import WindStatus from "./components/today-highlight/wind-status";

export default function Home() {
  return (
    <main>
      <TodayHighlight />

    </main>
  );
}
