import { HeroTextSection } from "./HeroTextSection"
import { HeroImageCollage } from "./HeroImageCollage"

export const HeroSection = () => {
  return (
    <section className="w-full max-w-310 min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-131.5 flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 md:gap-10 lg:gap-16 xl:gap-0 px-4 sm:px-6 md:px-8 lg:px-0">
      <HeroTextSection />
      <HeroImageCollage />
    </section>
  )
}
