export const visibilityMessage = (value: number) => {
  if (value < 1) {
    return "Fog is affecting visibility";
  } else if (value < 5) {
    return "Haze is affecting visibility";
  } else if (value < 10) {
    return "Mist is affecting visibility";
  } else if (value < 20) {
    return "Smoke is affecting visibility";
  } else {
    return "Visibility is clear";
  }
};
