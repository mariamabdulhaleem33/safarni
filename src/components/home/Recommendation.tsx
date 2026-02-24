import SectionHeader from "../ui/SectionHeader";
import TourCard from "./TourCard";
import { TourCardSkeleton } from "@/pages/favourite/TourCardSkeleton";
import { recommendations } from "@/api/recomindations";

const Recommendation = () => {
  return (
    <section className="flex flex-col gap-3">
      <SectionHeader title="Recommendation" path="/compare" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {!recommendations
          ? [1, 2, 3, 4].map((_, i) => {
              return <TourCardSkeleton key={i} />;
            })
          : recommendations.map((trip, index) => {
              return (
                <TourCard
                  isFavorite={trip.isFavorite}
                  variant="recommendation"
                  key={index}
                  image={trip.image}
                  title={trip.title}
                  rating={trip.rating}
                  location={trip.location}
                />
              );
            })}
      </div>
    </section>
  );
};

export default Recommendation;
