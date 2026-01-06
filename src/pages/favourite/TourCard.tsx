import type { Tour } from "./types";
import { FaHeart, FaStar } from "react-icons/fa";

interface Props {
  tour: Tour;
  onToggleFavorite: (id: number) => void;
}

export const TourCard = ({ tour, onToggleFavorite }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <div className="relative">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-48 w-full object-cover"
        />

        <button
          onClick={() => onToggleFavorite(tour.id)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer"
        >
          <FaHeart
            className={`text-lg transition ${tour.favorite ? "text-red-500" : "text-gray-400"
              }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">

        <div className="flex justify-between items-center gap-1 text-sm">
          <h3 className="font-semibold text-gray-800">{tour.title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <FaStar className="text-yellow-400" />
            <span className="font-medium">{tour.rating}</span>
            <span className="text-gray-500">({tour.reviews})</span>
          </div>
        </div>

        {tour.pickup && (
          <p className="text-sm text-gray-500">Pickup Available</p>
        )}

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">{tour.duration}</span>
          <span className="font-semibold text-blue-600">
            From ${tour.price}
            <span className="text-gray-500 font-normal"> / person</span>
          </span>
        </div>
      </div>
    </div>
  );
};