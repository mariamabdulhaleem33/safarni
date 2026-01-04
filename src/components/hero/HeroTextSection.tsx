import { ArrowIcon } from "../icons/ArrowIcon";

export const HeroTextSection = () => {
  return (
    <div className="w-full max-w-[513px] min-h-[349px] flex flex-col gap-4">
      <div className="w-full max-w-[513px] min-h-[231px] relative">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[51px] leading-[1.5] font-semibold font-poppins">
          Visit The Most{" "}
          <span className="text-[var(--color-primary-700)]">
            Beautiful Places
          </span>{" "}
          In The World.
        </h1>
        <div
          className="absolute hidden lg:block top-[130px] left-[431px] w-[73.2px] h-[70.7px]"
          style={{ transform: "rotate(2deg)" }}
        >
          <ArrowIcon />
        </div>
      </div>
      <p className="w-full max-w-[513px] min-h-[102px] text-base sm:text-lg lg:text-xl leading-[1.7] font-normal font-poppins text-[var(--color-gray-600)]">
        "Explore stunning destinations around the globe. Find travel
        inspiration, top attractions, and plan your next adventure—all from one
        platform."
      </p>
    </div>
  );
};
