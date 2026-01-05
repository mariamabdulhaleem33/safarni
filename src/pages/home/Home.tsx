import { HeroSection } from "../../components/hero/HeroSection";
import { CategoriesSection } from "../../components/categories";
import Recommendation from "@/components/home/Recommendation";
import AvaliableTours from "@/components/home/AvaliableTours";

export const Home = () => {
  return (
    <div className="w-full max-w-[1240px] flex flex-col mx-auto px-4 sm:px-6 md:px-8 lg:px-0 min-h-[2000.94px] pt-[166px] pb-10 gap-20">
      <HeroSection />
      <CategoriesSection />
      <Recommendation />
      <AvaliableTours />
    </div>
  );
};
