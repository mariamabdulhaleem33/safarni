import { useEffect, useState } from "react";
import { tours as mockTours } from "./data";
import type { Tour } from "./types";
import { TourCard } from "./TourCard";
import { TourCardSkeleton } from "./TourCardSkeleton";
export const Favorites = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate API call
  useEffect(() => {
      setTours(mockTours);
      setLoading(false);
  }, []);

  const toggleFavorite = (id: number) => {
    setTours((prev) =>
      prev.map((tour) =>
        tour.id === id
          ? { ...tour, favorite: !tour.favorite }
          : tour
      )
    );
  };

  return (
    <div className="min-h-screen mt-20 bg-gray-50 max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-xl font-semibold mb-6 text-center">Favorite</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <TourCardSkeleton key={i} />
            ))
          : tours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onToggleFavorite={toggleFavorite}
              />
            ))}
      </div>
    </div>
  );
};
