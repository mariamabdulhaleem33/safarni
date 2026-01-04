import heroImg1 from "../../assets/hero-img1.jpg";
import heroImg2 from "../../assets/hero-img2.jpg";
import heroImg3 from "../../assets/hero-img3.jpg";
import heroImg4 from "../../assets/hero-img4.jpg";
import heroImg5 from "../../assets/hero-img5.jpg";

export const HeroImageCollage = () => {
  return (
    <div
      className="w-full max-w-[595px] min-h-[526px] flex items-end justify-center lg:justify-end"
      style={{ gap: "24px" }}
    >
      {/* Left Column */}
      <div
        className="flex flex-col w-full sm:w-[231px] h-auto sm:h-[526px] justify-end"
        style={{ gap: "24px" }}
      >
        <img
          src={heroImg1}
          alt="Travel destination 1"
          className="w-full sm:w-[231px] h-auto sm:h-[251px] object-cover rounded-tl-[32px]"
        />
        <img
          src={heroImg2}
          alt="Travel destination 2"
          className="w-full sm:w-[231px] h-auto sm:h-[251px] object-cover rounded-2xl"
        />
      </div>

      {/* Middle Column */}
      <div
        className="hidden sm:flex flex-col w-[194px] h-[416px] justify-end"
        style={{ gap: "24px" }}
      >
        <img
          src={heroImg3}
          alt="Travel destination 3"
          className="w-[194px] h-[221px] object-cover rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
        />
        <img
          src={heroImg4}
          alt="Travel destination 4"
          className="w-[194px] h-[171px] object-cover rounded-2xl"
        />
      </div>

      {/* Right Column */}
      <div className="hidden md:block w-[122px] h-[303px]">
        <img
          src={heroImg5}
          alt="Travel destination 5"
          className="w-[122px] h-[303px] object-cover rounded-tr-[40px] rounded-br-[40px]"
        />
      </div>
    </div>
  );
};
