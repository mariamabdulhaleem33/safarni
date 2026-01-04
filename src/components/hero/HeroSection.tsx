import { HeroTextSection } from "./HeroTextSection";
import { HeroImageCollage } from "./HeroImageCollage";

export const HeroSection = () => {
  return (
    <section className="w-full max-w-[1240px] min-h-[526px] flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0">
      <HeroTextSection />
      <HeroImageCollage />
    </section>
  );
};

