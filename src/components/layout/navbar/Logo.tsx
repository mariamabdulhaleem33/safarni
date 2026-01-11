import safarniIcon from "../../../assets/safarni-icon.png";

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1.5 w-11 sm:w-12 md:w-14 lg:w-16">
      <img
        src={safarniIcon}
        alt="Safarni logo"
        className="w-7 h-6 sm:w-8 sm:h-7 md:w-10 md:h-9 lg:w-12 lg:h-11 shrink-0 block"
      />
      <span className="w-11 sm:w-12 md:w-14 lg:w-16 h-3.5 sm:h-4 md:h-5 text-primary-700 font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base leading-none text-center font-poppins">
        Safarni
      </span>
    </div>
  );
};

