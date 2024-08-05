import TodayHighlight from "./components/today-highlight/today-highlight";
import Weather from "./components/weather/weather";
import Forecast from "./components/forecast/forecast";
import { WeatherProvider } from "./context/WeatherContext";
import Suggests from "./components/suggests/suggests";

export default function Home() {
  return (
    // <WeatherProvider>
    <main className="grid grid-cols-3 gap-8 p-4">
      <Weather />
      <TodayHighlight />
      <Forecast />
      <Suggests />
    </main>
    // </WeatherProvider>
  );
}
