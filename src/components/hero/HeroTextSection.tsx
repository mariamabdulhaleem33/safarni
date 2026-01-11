import { ArrowIcon } from "../icons/ArrowIcon";

export const HeroTextSection = () => {
  return (
    <div className="w-full max-w-[513px] flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
      <div className="w-full max-w-[513px] relative">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[51px] leading-tight sm:leading-snug md:leading-[1.4] lg:leading-[1.5] font-semibold font-poppins">
          Visit The Most{" "}
          <span className="text-[var(--color-primary-700)]">
            Beautiful Places
          </span>{" "}
          In The World.
        </h1>
        <div
          className="absolute hidden xl:block top-[130px] left-[431px] w-[73.2px] h-[70.7px]"
          style={{ transform: "rotate(2deg)" }}
        >
          <ArrowIcon />
        </div>
      </div>
      <p className="w-full max-w-[513px] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-[1.6] md:leading-[1.7] font-normal font-poppins text-[var(--color-gray-600)]">
        "Explore stunning destinations around the globe. Find travel
        inspiration, top attractions, and plan your next adventure—all from one
        platform."
      </p>
    </div>
  );
};
