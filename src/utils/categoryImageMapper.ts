// Maps category keys to navigation paths

export const getCategoryNavigationPath = (key: string): string => {
  const navigationMap: Record<string, string> = {
    flights: "/flight-booking",
    cars: "/cars",
    tours: "/compare",
    hotels: "/hotel",
  };

  return navigationMap[key.toLowerCase()] || "/";
};


