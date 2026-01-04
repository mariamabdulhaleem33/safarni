import type { FC } from "react";
import logo from "@/assets/Logo.png";

type LogoProps = {
  style: string;
  width?: string;
};

const Logo: FC<LogoProps> = ({ style, width }) => {
  return (
    <img
      className={`${style} ${width ? width : "w-[100px]"}`}
      src={logo}
      alt="Safarni Logo"
    />
  );
};
export default Logo;
