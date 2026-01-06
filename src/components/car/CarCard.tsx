import type { Car } from "@/types/car";
import {useNavigate} from "react-router-dom"

type Props = {
  car: Car;
};

export function CarCard({ car }: Props) {

   const navigate = useNavigate();
  return (
    <div className="relative rounded-xl  bg-white p-5 h-[200px] border-white border shadow-md  overflow-hidden">
      {/* Content */}
      <div className="flex flex-col gap-4 max-w-[60%]">
        {/* Name */}
        <h3 className="text-lg font-semibold">{car.name}</h3>

        {/* Specs */}
        <div className="flex gap-4 text-sm mt-5 text-gray-500">
          <span>{car.transmission}</span>
          <span> | {car.seats} seats</span>
          <span> | {car.fuel}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate(`/cars/${car.id}/pick-up`)}
           className="flex-1 py-2 px-4 rounded-lg bg-[#1E429F] hover:bg-[#1E429F]/80 text-white cursor-pointer">
            Rent Now
          </button>
          <button onClick={() => navigate(`/cars/${car.id}`)} className="flex-1 py-2 px-4 rounded-lg border cursor-pointer border-[#1E429F] text-[#1E429F]">
            Detail
          </button>
        </div>
      </div>

      {/* Image */}
      <img
        src={car.image}
        alt={car.name}
        className="absolute right-3 -top-10  w-52 h-40 object-contain"
      />
    </div>
  );
}
