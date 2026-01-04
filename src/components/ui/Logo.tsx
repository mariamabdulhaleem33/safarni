import type { FC } from "react";
import logo from "@/assets/Logo.png";

type LogoProps = {
  style: string;
};

const Logo: FC<LogoProps> = ({ style }) => {
  return <img className={style} src={logo} alt="Safarni Logo" />;
};
export default Logo;
