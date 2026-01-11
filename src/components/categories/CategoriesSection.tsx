import { CategoryCard } from "./CategoryCard";
import flightImage from "../../assets/flight.jpg";
import carsImage from "../../assets/cars.jpg";
import toursImage from "../../assets/tours.jpg";
import hotelImage from "../../assets/hotel.jpg";

export const CategoriesSection = () => {
  const categories = [
    { image: flightImage, label: "Flight", navigateTo: "Flight_Booking" },
    { image: carsImage, label: "Cars", navigateTo: "Cars_Booking" },
    { image: toursImage, label: "Tours", navigateTo: "Tours_Booking" },
    { image: hotelImage, label: "Hotel", navigateTo: "Hotel_Booking" },
  ];

  const handleCategoryClick = (navigateTo: string) => {
    // Handle navigation - you can implement routing here
    console.log(`Navigate to: ${navigateTo}`);
  };

  return (
    <section className="w-full max-w-[1240px] flex flex-col min-h-[300px] sm:min-h-[350px] md:min-h-[407.94px] gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-0">
      {/* Title */}
      <div className="w-full h-auto min-h-[30px] sm:min-h-[35px] md:min-h-[38px]">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[25px] leading-none font-medium font-poppins text-[var(--color-gray-900)]">
          Categories
        </h2>
      </div>

      {/* Content */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-0 lg:flex lg:justify-between min-h-[250px] sm:min-h-[280px] md:min-h-[321.94px]">
        {categories.map((category) => (
          <CategoryCard
            key={category.label}
            image={category.image}
            label={category.label}
            onClick={() => handleCategoryClick(category.navigateTo)}
          />
        ))}
      </div>
    </section>
  );
};
