import Image from "next/image";
import { data } from "./data";
import Card from "./components/today-highlight/card";
import TodayHighlight from "./components/today-highlight/today-highlight";

export default function Home() {
  return (
    <main>
      <TodayHighlight />
    </main>
  );
}
