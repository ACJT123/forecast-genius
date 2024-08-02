import TodayHighlight from "./components/today-highlight/today-highlight";
import Weather from "./components/weather/weather";
import Forecast from "./components/forecast/forecast";

export default function Home() {
  return (
    <main className="grid grid-cols-3 gap-8 p-4">
      <Weather />
      <TodayHighlight />
      <Forecast />
    </main>
  );
}
