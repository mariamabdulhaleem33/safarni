

import { useParams } from "react-router-dom";
import PickUpMap from "@/components/pickUpMap/PickUpMap";
import { CARS } from "@/services/car.mock";

const PickUpPage = () => {
  const { id } = useParams();

  const car = CARS.find(
    (c) => c.id === Number(id)
  );

  if (!car) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      {/* Map */}
      <PickUpMap car={car} />

      {/* Floating Card */}
      {/* <PickUpCarCard car={car} /> */}
    </div>
  );
};

export default PickUpPage;