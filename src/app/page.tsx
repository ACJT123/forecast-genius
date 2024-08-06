import TodayHighlight from "./components/today-highlight/today-highlight";
import Weather from "./components/weather/weather";
import Forecast from "./components/forecast/forecast";
import { WeatherProvider } from "./context/WeatherContext";
import Suggests from "./components/suggests/suggests";

export default function Home() {
  return (
    // <WeatherProvider>
    <main className="4xs:flex 4xs:flex-col 4xs:items-center md:items-start md:flex-none md:grid md:grid-col-1 xl:grid-cols-3 gap-8 p-4">
        <Weather />
        <TodayHighlight />
        <Forecast />
        <Suggests />
    </main>
    // </WeatherProvider>
  );
}
