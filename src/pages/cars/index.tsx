
import { useState } from "react";

import BrandCard from "@/components/car/BrandCard";
import { CarCard } from "@/components/car/CarCard";
import { BRANDS, CARS } from "@/services/car.mock";
import SearchBox from "@/components/Search/SearchBox";
import BackButton from "@/components/backButton";

const CarsPage = () => {
  const [search, setSearch] = useState("");

  const filteredCars = CARS.filter((car) =>
    `${car.name} ${car.brand}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    // <PageLayout>
    <div className="mx-auto max-w-7xl px-6 py-6">
      {/* Header */}
      <section className="mb-12 flex items-center gap-4">
        <BackButton />
        <SearchBox value={search} onChange={setSearch} />
      </section>

      {/* Brands */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold">Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
          {BRANDS.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>

      {/* Cars */}
      <section className="mt-10">
        <h2 className="mb-6 text-lg font-semibold">Popular Cars</h2>

        {filteredCars.length === 0 ? (
          <p className="text-center text-gray-500">
            No cars found
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>
      </div>
    // </PageLayout>
  );
};

export default CarsPage;