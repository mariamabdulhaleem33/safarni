import { Link } from "react-router-dom"
import { SlArrowLeft } from "react-icons/sl"

import AuthLogo from "./AuthLogo"
import { logo } from "@/assets"

type AuthHeaderProps = {
  variant: "welcome" | "login" | "signup" | "forgotPassword"
}
export default function AuthHeader({ variant }: AuthHeaderProps) {
  const backDestinations = {
    welcome: "/welcome",
    login: "/",
    signup: "/",
    forgotPassword: "/login",
  }

  if (variant === "welcome")
    return (
      <header className="w-full flex justify-center lg:justify-end lg:pr-40">
        <div className="flex flex-col justify-center items-center">
          <div className="lg:w-24.5 w-60">
            <img className="w-full" src={logo} alt="logo" />
          </div>
          <span className="font-poppins font-semibold text-[27px] leading-[100%] tracking-normal text-center text-[#1E429F]">
            Safarni
          </span>
        </div>
      </header>
    )
  if (variant === "login")
    return (
      <header className="flex flex-row-reverse justify-around items-center">
        <div className="hidden lg:block">
          <AuthLogo className="lg:w-24.5 w-60" />
        </div>
        <div className="w-9 h-9 rounded-full bg-[#F3F4F6] flex justify-center items-center text-3 font-200 text-[#0D0D0D]">
          <Link to={backDestinations[variant]}>
            <SlArrowLeft />
          </Link>
        </div>
      </header>
    )
}
