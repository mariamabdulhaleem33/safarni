import TourOptionSelector from "./TourOptionSelector"

export default function TourOptionsPanel() {
  const placeOptions = [
    {
      id: "1",
      name: "Paris Evening Cruise",
      price: 75,
      duration: "3 hours",
      highlights: "Evening cruise",
      availability: "Available",
      guide: "Local guide",
      transportation: "Boat",
    },
    {
      id: "2",
      name: "Paris Evening Cruise",
      price: 75,
      duration: "3 hours",
      highlights: "Evening cruise",
      availability: "Available",
      guide: "Local guide",
      transportation: "Boat",
    },
    {
      id: "3",
      name: "Paris Art & Culture Tour",
      price: 60,
      duration: "3 hours",
      highlights: "Museums",
      availability: "Available",
      guide: "Art historian",
      transportation: "Walking",
    },
    {
      id: "4",
      name: "Paris Louvre Museum Tour",
      price: 55,
      duration: "3 hours",
      highlights: "Louvre Museum",
      availability: "Available",
      guide: "Art expert",
      transportation: "Walking",
    },
    {
      id: "5",
      name: "Paris Historical Sites",
      price: 45,
      duration: "3 hours",
      highlights: "Notre Dame,r",
      availability: "Available",
      guide: "Historian",
      transportation: "Walking",
    },
    {
      id: "6",
      name: "Paris Evening Cruise",
      price: 75,
      duration: "3 hours",
      highlights: "Evening cruise",
      availability: "Available",
      guide: "Local guide",
      transportation: "Boat",
    },
  ]

  return <TourOptionSelector placeOptions={placeOptions} />
}
