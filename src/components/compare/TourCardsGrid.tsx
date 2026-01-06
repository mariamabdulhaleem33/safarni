import TourCard from "./TourCard"

export default function TourCardsGrid() {
  const places = [
    {
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=400&fit=crop",
      name: "Paris Evening Cruise",
      startTime: "6:00",
      endTime: "9:00",
      price: 75,
      description: "Enjoy a romantic evening cruise in Paris.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1766773549088-62b781012d36?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Iconic Paris Tour",
      startTime: "10:00",
      endTime: "1:00",
      price: 50,
      description: "Explore Paris's iconic landmarks and hidden gems in Paris.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=400&fit=crop",
      name: "Paris Art & Culture Tour",
      startTime: "2:00",
      endTime: "5:00",
      price: 60,
      description:
        "Discover Paris's artistic side with visits to renowned museums in Paris.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=400&fit=crop",
      name: "Paris Historical Sites",
      startTime: "9:00",
      endTime: "12:00",
      price: 45,
      description:
        "Explore the historic heart of Paris, including Notre Dame and the Latin Quarter in Paris.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1587422023429-24edff4116a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Paris Louvre Museum Tour",
      startTime: "1:00",
      endTime: "4:00",
      price: 55,
      description:
        "A guided tour of the Louvre Museum, showcasing Paris's art.",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Paris Evening Cruise",
      startTime: "6:00",
      endTime: "9:00",
      price: 75,
      description: "Enjoy a romantic evening cruise in Paris.",
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {places.map((place, index) => (
        <TourCard key={index} place={place} />
      ))}
    </div>
  )
}
