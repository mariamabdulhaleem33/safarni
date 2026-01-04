import { ArrowIcon } from "../icons/ArrowIcon";

export const HeroTextSection = () => {
  return (
    <div
      className="w-full max-w-[513px] min-h-[349px] flex flex-col"
      style={{ gap: "16px" }}
    >
      <div className="w-full max-w-[513px] min-h-[231px] relative">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[51px] leading-[150%] font-semibold"
          style={{ fontFamily: "Poppins" }}
        >
          Visit The Most{" "}
          <span className="text-[#1E429F]">Beautiful Places</span> In The World.
        </h1>
        <div
          className="absolute hidden lg:block"
          style={{
            top: "130px",
            left: "431px",
            width: "73.20093026243926px",
            height: "70.72792297488314px",
            transform: "rotate(2deg)",
          }}
        >
          <ArrowIcon />
        </div>
      </div>
      <p
        className="w-full max-w-[513px] min-h-[102px] text-base sm:text-lg lg:text-[20px] leading-[170%] font-normal"
        style={{
          fontFamily: "Poppins",
          color: "#4B5563",
        }}
      >
        "Explore stunning destinations around the globe. Find travel
        inspiration, top attractions, and plan your next adventure—all from one
        platform."
      </p>
    </div>
  );
};
