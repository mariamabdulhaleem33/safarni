import { HeroTextSection } from "./HeroTextSection"
import { HeroImageCollage } from "./HeroImageCollage"

export const HeroSection = () => {
  return (
    <section className="w-full max-w-310 min-h-131.5 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0">
      <HeroTextSection />
      <HeroImageCollage />
    </section>
  )
}
