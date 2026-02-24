import SectionHeader from "../ui/SectionHeader";
import TourCard from "./TourCard";
import { TourCardSkeleton } from "@/pages/favourite/TourCardSkeleton";
import { availableToursData } from "@/api/availableTours";

const AvaliableTours = () => {

    return (
        <section className=" flex flex-col gap-3 my-8">
            <SectionHeader title="Available Tours" path="/compare" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
                {! availableToursData ? [1, 2].map((_, i) => {
                    return (
                        <TourCardSkeleton key={i} />
                    )
                }) :
                    availableToursData.map((trip, index) => {
                        return <TourCard isFavorite={false} variant="tour" price={trip.price} tourType={trip.duration} key={index} image={trip.image} title={trip.title} rating={trip.rating} location={trip.city} />
                    })
                }
            </div>
        </section>
    )
}

export default AvaliableTours
