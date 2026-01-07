import type { RecommendationCardProps } from "@/types/home.type";
import SectionHeader from "../ui/SectionHeader"
import TourCard from "./TourCard"


const Recommendation = () => {
    const recommendationsData: RecommendationCardProps[] = [
        {
            image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=500',
            title: 'The Pyramids',
            rating: 4.8,
            location: 'Giza',
            variant: "recommendation"
        },
        {
            image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=500',
            title: 'The Citadel of Saladin',
            rating: 4.8,
            location: 'Cairo',
            variant: "recommendation"
        },
        {
            image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=500',
            title: 'Karnak Temple',
            rating: 4.3,
            location: 'Luxor',
            variant: "recommendation"
        },
        {
            image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500',
            title: 'Library of Alexandria',
            rating: 4.8,
            location: 'Alexandria',
            variant: "recommendation"
        }
    ];
    return (
        <section className="flex flex-col gap-3">
            <SectionHeader title="Recommendation" path="/" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {recommendationsData.map((trip, index) => {
                    return <TourCard variant={trip.variant} key={index} image={trip.image} title={trip.title} rating={trip.rating} location={trip.location} />
                })}
            </div>
        </section>
    )
}

export default Recommendation
