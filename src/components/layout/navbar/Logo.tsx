import safarniIcon from "../../../assets/safarni-icon.png";

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-2 w-[74px] min-h-[91px]">
      <img
        src={safarniIcon}
        alt="Safarni logo"
        className="w-[60px] h-[56px] flex-shrink-0 block"
      />
      <span className="w-[74px] h-[27px] text-[var(--color-primary-700)] font-semibold text-lg leading-none text-center font-poppins">
        Safarni
      </span>
    </div>
  );
};

