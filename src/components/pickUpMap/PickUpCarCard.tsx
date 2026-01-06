import type { Car } from "@/types/car";
import { useNavigate } from "react-router-dom";

interface Props {
  car: Car;
}

const PickUpCarCard = ({ car }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="
        absolute bottom-6 left-1/2 -translate-x-1/2
        w-[500px] max-w-[95%]
        bg-white rounded-2xl
        shadow-xl
        px-6 py-5
        z-[999]
      "
    >
      {/* TOP */}
      <div className="flex items-start justify-between">
        {/* LEFT INFO */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {car.name}
          </h3>

          <div className="flex gap-8 mt-2 text-sm text-gray-500">
            <span>{car.transmission}</span>
            <span>{car.seats} seats</span>
            <span>{car.fuel}</span>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <img
          src={car.image}
          alt={car.name}
          className="w-36 h-auto object-contain -top-0 -translate-y-1/2 right-0 z-10 absolute" 
        />
      </div>

      {/* PRICES */}
      <div className="flex justify-between mt-5">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">
            ${car.hourPrice}
          </span>{" "}
          per hour
        </p>

        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">
            ${car.price}
          </span>{" "}
          per day
        </p>
      </div>

      {/* CONFIRM */}
      <button
        onClick={() => navigate(
          "/payment",{
            state: {
              car,
            }
          }
        )}
        className="
          mt-5 w-full
          bg-[#1E429F] hover:bg-[#163585]
          text-white text-sm font-semibold
          py-3 rounded-xl
          transition
          cursor-pointer
        "
      >
        Confirm
      </button>
    </div>
  );
};

export default PickUpCarCard;