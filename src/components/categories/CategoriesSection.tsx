import { CategoryCard } from "./CategoryCard";
import { useCategories } from "@/hooks/useCategories";
import { getCategoryNavigationPath } from "@/utils/categoryImageMapper";
import { useNavigate } from "react-router-dom";

export const CategoriesSection = () => {
  const { data: categories, isLoading, error } = useCategories();
  const navigate = useNavigate();

  const handleCategoryClick = (key: string) => {
    const path = getCategoryNavigationPath(key);
    navigate(path);
  };

  // Show loading state
  if (isLoading) {
    return (
      <section className="w-full max-w-[1240px] flex flex-col min-h-[300px] sm:min-h-[350px] md:min-h-[407.94px] gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="w-full h-auto min-h-[30px] sm:min-h-[35px] md:min-h-[38px]">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[25px] leading-none font-medium font-poppins text-[var(--color-gray-900)]">
            Categories
          </h2>
        </div>
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-0 lg:flex lg:justify-between min-h-[250px] sm:min-h-[280px] md:min-h-[321.94px]">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex flex-col w-full max-w-[243.96px] mx-auto min-h-[200px] sm:min-h-[250px] md:min-h-[280px] lg:min-h-[321.94px] gap-2 sm:gap-3 md:gap-[13.94px] animate-pulse"
            >
              <div className="w-full aspect-square max-w-[150px] sm:max-w-[180px] md:max-w-[210px] lg:max-w-[243.96px] max-h-[150px] sm:max-h-[180px] md:max-h-[210px] lg:max-h-[243.96px] rounded-full bg-gray-200 mx-auto"></div>
              <div className="w-full max-w-[250.93px] mx-auto min-h-[40px] sm:min-h-[50px] md:min-h-[60px]">
                <div className="h-6 sm:h-7 md:h-8 lg:h-10 w-20 sm:w-24 md:w-28 lg:w-32 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="w-full max-w-[1240px] flex flex-col min-h-[300px] sm:min-h-[350px] md:min-h-[407.94px] gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="w-full h-auto min-h-[30px] sm:min-h-[35px] md:min-h-[38px]">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[25px] leading-none font-medium font-poppins text-[var(--color-gray-900)]">
            Categories
          </h2>
        </div>
        <div className="text-center text-gray-500 py-8">
          Failed to load categories. Please try again later.
        </div>
      </section>
    );
  }

  // If no categories, return null or empty state
  if (!categories || categories.length === 0) {
    return null;
  }

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
            key={category.id}
            image={category.image}
            label={category.key.charAt(0).toUpperCase() + category.key.slice(1)}
            onClick={() => handleCategoryClick(category.key)}
          />
        ))}
      </div>
    </section>
  );
};
