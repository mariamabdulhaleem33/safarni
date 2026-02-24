export interface Recommendation {
  id: string;
  title: string;
  location: string;
  rating: number;
  image: string;
  isFavorite: boolean;
}

import pyramids from "@/assets/pyramids.jpg";
import TheCitadelofSaladin from "@/assets/TheCitadelofSaladin.jpg";
import KarnakTemple from "@/assets/KarnakTemple.jpg";
import LibraryofAlexandria from "@/assets/LibraryofAlexandria.jpg";

export const recommendations: Recommendation[] = [
  {
    id: "1",
    title: "The Pyramids",
    location: "Giza",
    rating: 4.8,
    image: pyramids,
    isFavorite: false,
  },
  {
    id: "2",
    title: "The Citadel of Saladin",
    location: "Cairo",
    rating: 4.8,
    image: TheCitadelofSaladin,
    isFavorite: false,
  },
  {
    id: "3",
    title: "Karnak Temple",
    location: "Luxor",
    rating: 4.3,
    image: KarnakTemple,
    isFavorite: false,
  },
  {
    id: "4",
    title: "Library of Alexandria",
    location: "Alexandria",
    rating: 4.8,
    image: LibraryofAlexandria,
    isFavorite: false,
  },
];