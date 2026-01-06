import { useParams } from "react-router-dom";
import { CARS } from "@/services/car.mock";

import CarGallery from "@/components/car/CarGallery";
import CarSpecs from "@/components/car/CarSpecs";
import RentPlanCard from "@/components/car/RentPlanCard";
import LocationInput from "@/components/car/LocationInput";
import PickUpButton from "@/components/car/PicKUpButton";
import BackButton from "@/components/backButton";

const CarDetailsPage = () => {
  const { id } = useParams();

  const car = CARS.find((c) => c.id === Number(id));

  if (!car) {
    return <div className="p-8">Car not found</div>;
  }

  return (
    <div className="container mx-auto px-3 py-4">
      <div className="mb-2">
        <BackButton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left */}
        <CarGallery car={car} />

        {/* Right */}
        <div className="space-y-6">
          <CarSpecs />
            <>
                <h1 className="text-2xl font-semibold">Plan</h1>
          <RentPlanCard
            icon="hourly"
            price={10}
            title="Hourly Rent"
            desc="Best for business appointments"
            active
          />

          <RentPlanCard
            icon="daily"
            price={80}
            title="Daily Rent"
            desc="Best for long trips"
          />
          </>
          <LocationInput />
          <PickUpButton />
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
