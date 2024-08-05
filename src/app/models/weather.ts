export const determineWeatherConditions = (values: any) => {
  const isStormy =
    values?.rainIntensity > 0 ||
    values?.sleetIntensity > 0 ||
    values?.snowIntensity > 0;
  const isCloudy = values?.cloudCover > 0;
  const hasPrecipitation = values?.precipitationProbability > 0;
  const isWindy = values?.windSpeed > 5; // Example threshold for windy conditions
  const isHumid = values?.humidity > 80; // Example threshold for high humidity

  if (isStormy) {
    return "stormy";
  } else if (isCloudy) {
    return "cloudy";
  } else if (hasPrecipitation) {
    return "rainy";
  } else if (isWindy) {
    return "windy";
  } else if (isHumid) {
    return "humid";
  } else {
    return "clear";
  }
};
