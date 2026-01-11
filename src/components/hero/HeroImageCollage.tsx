import heroImg1 from "../../assets/hero-img1.jpg";
import heroImg2 from "../../assets/hero-img2.jpg";
import heroImg3 from "../../assets/hero-img3.jpg";
import heroImg4 from "../../assets/hero-img4.jpg";
import heroImg5 from "../../assets/hero-img5.jpg";

export const HeroImageCollage = () => {
  return (
    <div className="w-full max-w-[595px] min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[526px] flex items-end justify-center lg:justify-end gap-1.5 sm:gap-2 md:gap-3 lg:gap-6">
      {/* Left Column */}
      <div className="flex flex-col flex-[0.38] sm:flex-none sm:w-[180px] md:w-[200px] lg:w-[231px] h-auto sm:h-[350px] md:h-[400px] lg:h-[526px] justify-end gap-1.5 sm:gap-2 md:gap-3 lg:gap-6">
        <img
          src={heroImg1}
          alt="Travel destination 1"
          className="w-full h-auto aspect-[231/251] sm:h-[170px] md:h-[190px] lg:h-[251px] object-cover rounded-tl-[12px] sm:rounded-tl-[20px] md:rounded-tl-[24px] lg:rounded-tl-[32px]"
        />
        <img
          src={heroImg2}
          alt="Travel destination 2"
          className="w-full h-auto aspect-[231/251] sm:h-[170px] md:h-[190px] lg:h-[251px] object-cover rounded-lg sm:rounded-xl md:rounded-2xl"
        />
      </div>

      {/* Middle Column */}
      <div className="flex flex-col flex-[0.32] sm:flex-none sm:w-[160px] md:w-[180px] lg:w-[194px] h-[280px] sm:h-[320px] md:h-[360px] lg:h-[416px] justify-end gap-1.5 sm:gap-2 md:gap-3 lg:gap-6">
        <img
          src={heroImg3}
          alt="Travel destination 3"
          className="w-full h-auto aspect-[194/221] sm:h-[150px] md:h-[170px] lg:h-[221px] object-cover rounded-tr-lg sm:rounded-tr-xl md:rounded-tr-2xl rounded-br-lg sm:rounded-br-xl md:rounded-br-2xl rounded-bl-lg sm:rounded-bl-xl md:rounded-bl-2xl"
        />
        <img
          src={heroImg4}
          alt="Travel destination 4"
          className="w-full h-auto aspect-[194/171] sm:h-[120px] md:h-[130px] lg:h-[171px] object-cover rounded-lg sm:rounded-xl md:rounded-2xl"
        />
      </div>

      {/* Right Column */}
      <div className="flex flex-[0.3] sm:flex-none sm:w-[90px] md:w-[105px] lg:w-[122px] h-[230px] sm:h-[250px] md:h-[265px] lg:h-[303px]">
        <img
          src={heroImg5}
          alt="Travel destination 5"
          className="w-full h-full object-cover rounded-tr-[16px] sm:rounded-tr-[24px] md:rounded-tr-[32px] lg:rounded-tr-[40px] rounded-br-[16px] sm:rounded-br-[24px] md:rounded-br-[32px] lg:rounded-br-[40px]"
        />
      </div>
    </div>
  );
};
