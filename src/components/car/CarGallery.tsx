import type { Car } from "@/types/car";
import BackButton from "../backButton";

interface CarGalleryProps {
  car: Car;
}
const CarGallery = ({ car }: CarGalleryProps) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center relative">
      <img src={car.image} alt="car" className="max-w-full object-contain" />

      {/* arrows */}
      <div className="absolute bottom-4 flex gap-2">
        <button className="w-8 h-8 rounded-full bg-white shadow">◀</button>
        <button className="w-8 h-8 rounded-full bg-white shadow">▶</button>
      </div>
    </div>
  );
};

export default CarGallery;
