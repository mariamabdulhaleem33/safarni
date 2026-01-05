import safarniIcon from "../../../assets/safarni-icon.png";

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-2 w-18.5 min-h-22.75">
      <img
        src={safarniIcon}
        alt="Safarni logo"
        className="w-15 h-14 shrink-0 block"
      />
      <span className="w-18.5 h-6.75 text-primary-700 font-semibold text-lg leading-none text-center font-poppins">
        Safarni
      </span>
    </div>
  );
};

