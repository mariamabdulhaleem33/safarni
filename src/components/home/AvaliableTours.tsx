import type { TourCardProps } from "@/types/home.type";
import SectionHeader from "../ui/SectionHeader";
import TourCard from "./TourCard";

const AvaliableTours = () => {
    const toursData: TourCardProps[] = [
    {
        variant: 'tour',
        image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=500&h=400&fit=crop&q=80',
        rating: 4.3,
        location: 'Luxor',
        title: 'Full Day Tour',
        price: 150
    },
    {
        variant: 'tour',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=400&fit=crop&q=80',
        title: 'Full Day Tour',
        rating: 4.5,
        location: 'Dahab',
        price: 250
    },
    {
        variant: 'tour',
        image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=500&h=400&fit=crop&q=80',
        title: 'Full Day Tour',
        rating: 4.2,
        location: 'Fayoum',
        price: 200
    },
    {
        variant: 'tour',
        image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=500&h=400&fit=crop&q=80',
        title: 'Full Day Tour',
        rating: 4.6,
        location: 'Marsa Alam',
        price: 220
    }
];
    return (
        <section className=" flex flex-col gap-3 my-8">
            <SectionHeader title="Available Tours" path="/" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {toursData.map((trip, index) => {
                    return <TourCard variant={trip.variant} key={index} image={trip.image} title={trip.title} rating={trip.rating} location={trip.location} price={trip.price} />
                })}
            </div>
        </section>
    )
}

export default AvaliableTours
