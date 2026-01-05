import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HotelCardProps {
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
  totalPrice?: number;
  nights?: number;
  image: string;
  amenities?: string[];
  className?: string;
  onClick?: () => void;
}

const HotelCard = ({
  name,
  location,
  rating,
  pricePerNight,
  totalPrice,
  nights = 1,
  image,
  amenities = [],
  className,
  onClick,
}: HotelCardProps) => {
  const displayPrice = totalPrice || pricePerNight * nights;

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex flex-col rounded-2xl bg-white overflow-hidden shadow-lg transition-all hover:shadow-xl cursor-pointer border border-gray-200",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow">
          <div className="flex items-baseline">
            <span className="font-bold text-gray-900 text-lg">
              ${displayPrice.toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm ml-1">
              {totalPrice ? "total" : "/night"}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg">{name}</h3>
            <div className="flex items-center mt-1">
              <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-600 text-sm">{location}</span>
            </div>
          </div>
          <div className="flex items-center bg-white px-2 py-1 rounded">
            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
            <span className="text-gray-700 font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {amenities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 pt-0">
        <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

export default HotelCard;