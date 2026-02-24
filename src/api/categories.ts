export interface Category {
  id: string;
  title: string;
  image: string;
}

import flight from "@/assets/flight.jpg";
import cars from "@/assets/cars.jpg";
import tours from "@/assets/tours.jpg";
import hotel from "@/assets/hotel.jpg"; 

export const categories: Category[] = [
  {
    id: "flights",
    title: "Flight",
    image: flight,
  },
  {
    id: "cars",
    title: "Cars",
    image: cars ,
  },
  {
    id: "tours",
    title: "Tours",
    image: tours,
  },
  {
    id: "hotels",
    title: "Hotel",
    image: hotel,
  },
];