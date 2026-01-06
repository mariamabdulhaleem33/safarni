import type { Car } from "@/types/car";
import type { Brand } from "@/types/brand";
import image1 from "../assets/mrdes.png"
import image2 from "../assets/BMW.png"
import image3 from "../assets/Geely.png"
import image4 from "../assets/Jeep.png"
import image5 from "../assets/Porsche.png"
import image6 from "../assets/Subaru.png"
import image7 from "../assets/Renault.png"
import image8 from "../assets/Blacok.png"
import image9 from "../assets/GLA250SUV.png"
import image10 from "../assets/VolvoXC40.png"
import image11 from "../assets/VolvoXC41.png"

export const BRANDS: Brand[] = [
  {
    id: 1,
    name: "Mercedes",
    logo: image1,
    count: 50,
  },
  {
    id: 2,
    name: "BMW",
    logo: image2,
    count: 50,
  },
  {
    id: 3,
    name: "Geely",
    logo: image3,
    count: 50,
  },
  {
    id: 4,
    name: "Jeep",
    logo: image4,
    count: 50,
  },
  {
    id: 5,
    name: "Porsche",
    logo: image5,
    count: 50,
  },
  {
    id: 6,
    name: "Subaru",
    logo: image6,
    count: 50,
  },
  {
    id: 7,
    name: "Renault",
    logo:  image7,
    count: 50,
  },

]

export const CARS: Car[] = [
  {
    id: 1,
    name: "Mercedes",
    image:
      image8,
    transmission: "Manual",
    seats: 5,
    fuel: "Diesel",
  },
  {
    id: 2,
    name: "Audi",
    image:
      image9,
    transmission: "Automatic",
    seats: 5,
    fuel: "Diesel",
  },
  {
    id: 3,
    name: "BMW",
    image:
      image10,
    transmission: "Automatic",
    seats: 5,
    fuel: "Diesel",
  },
  {
    id: 4,
    name: "Mercedes",
    image:
      image11,
    transmission: "Automatic",
    seats: 5,
    fuel: "Diesel",
  }
];
