import safarniIcon from "../../../assets/safarni-icon.png";

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-[8px] w-[74px] min-h-[91px]">
      <img
        src={safarniIcon}
        alt="Safarni logo"
        className="min-w-[60px] min-h-[56px] flex-shrink-0"
        style={{ width: "60px", height: "56px", display: "block" }}
      />
      <span
        className="w-[74px] h-[27px] text-[#1E429F] font-semibold text-[18px] leading-[100%] text-center"
        style={{ fontFamily: "Poppins" }}
      >
        Safarni
      </span>
    </div>
  );
};

