export const WEATHER_CODES = {
  1000: "Clear, Sunny",
  1100: "Mostly Clear",
  1101: "Partly Cloudy",
  1102: "Mostly Cloudy",
  1001: "Cloudy",
  2000: "Fog",
  2100: "Light Fog",
  4000: "Drizzle",
  4001: "Rain",
  4200: "Light Rain",
  4201: "Heavy Rain",
  5000: "Snow",
  5001: "Flurries",
  5100: "Light Snow",
  5101: "Heavy Snow",
  6000: "Freezing Drizzle",
  6001: "Freezing Rain",
  6200: "Light Freezing Rain",
  6201: "Heavy Freezing Rain",
  7000: "Ice Pellets",
  7101: "Heavy Ice Pellets",
  7102: "Light Ice Pellets",
  8000: "Thunderstorm",
};

export const WEATHER_IMAGES = {
  CLOUDY: "https://img.icons8.com/fluency/48/cloud.png",
  PARTLY_CLOUDY: "https://img.icons8.com/fluency/48/partly-cloudy-day.png",
  FOG: "https://img.icons8.com/fluency/48/foggy-night-1.png",
  HEAVY_RAIN: "https://img.icons8.com/fluency/48/intense-rain.png",
  LIGHT_RAIN: "https://img.icons8.com/fluency/48/light-rain.png",
  SNOW: "https://img.icons8.com/fluency/48/snow.png",
  LIGHT_SNOW: "https://img.icons8.com/fluency/48/light-snow.png",
  THUNDERSTORM: "https://img.icons8.com/fluency/48/storm.png",
};

export const renderWeatherIcon = (weatherCode: number) => {
  switch (weatherCode) {
    case 1000:
    case 1001:
      return WEATHER_IMAGES.CLOUDY;
    case 1100:
    case 1101:
    case 1102:
      return WEATHER_IMAGES.PARTLY_CLOUDY;
    case 2000:
    case 2100:
      return WEATHER_IMAGES.FOG;
    case 4000:
    case 4200:
    case 6000:
    case 6200:
    case 7000:
    case 7102:
      return WEATHER_IMAGES.LIGHT_RAIN;
    case 4001:
    case 4201:
    case 6001:
    case 6201:
    case 7101:
      return WEATHER_IMAGES.HEAVY_RAIN;
    case 5000:
    case 5001:
    case 5101:
      return WEATHER_IMAGES.SNOW;
    case 5100:
      return WEATHER_IMAGES.LIGHT_SNOW;
    default:
      return WEATHER_IMAGES.THUNDERSTORM;
  }
};
