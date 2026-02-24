export interface Tour {
  id: string;
  title: string;
  city: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  isFavorite: boolean;
}

import luxor from "@/assets/luxor.jpg";
import dahab from "@/assets/dahab.jpg";
import Fayoum from "@/assets/Fayoum.jpeg";
import MarsaAlam from "@/assets/MarsaAlam.jpeg";

export const availableToursData: Tour[] = [
  {
    id: "t1",
    title: "Full Day Tour",
    city: "Luxor",
    duration: "1 Day",
    price: 150,
    rating: 4.3,
    image: luxor,
    isFavorite: false,
  },
  {
    id: "t2",
    title: "Full Day Tour",
    city: "Dahab",
    duration: "1 Day",
    price: 250,
    rating: 4.5,
    image: dahab,
    isFavorite: false,
  },
  {
    id: "t3",
    title: "Full Day Tour",
    city: "Fayoum",
    duration: "1 Day",
    price: 200,
    rating: 4.2,
    image: Fayoum,
    isFavorite: false,
  },
  {
    id: "t4",
    title: "Full Day Tour",
    city: "Marsa Alam",
    duration: "1 Day",
    price: 220,
    rating: 4.8,
    image: MarsaAlam,
    isFavorite: false,
  },
];