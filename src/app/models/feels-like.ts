export const feelsLikeMessage = (value: number) => {
    if (value < 0) {
      return "Bitterly cold, stay warm!";
    } else if (value < 10) {
      return "Very cold, dress in layers!";
    } else if (value < 20) {
      return "Chilly, a jacket is recommended.";
    } else if (value < 30) {
      return "Comfortable weather, enjoy your day!";
    } else if (value < 40) {
      return "Warm, stay hydrated!";
    } else if (value < 50) {
      return "Hot, take precautions against heat!";
    } else {
      return "Extreme heat, avoid outdoor activities!";
    }
  };
  