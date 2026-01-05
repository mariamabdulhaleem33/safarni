import { Link } from "react-router-dom"
import { SlArrowLeft } from "react-icons/sl"

import AuthLogo from "./AuthLogo"

type AuthHeaderProps = {
  variant: "welcome" | "login" | "signup" | "forgotPassword"
}
export default function AuthHeader({ variant }: AuthHeaderProps) {
  const backDestinations = {
    welcome: "/dsdasd",
    login: "/",
    signup: "/",
    forgotPassword: "/login",
  }

  if (variant === "welcome")
    return (
      <header className="w-full flex justify-center lg:justify-end lg:pr-40">
        <AuthLogo className="lg:w-24.5 w-60" />
      </header>
    )
  if (variant === "login")
    return (
      <header className="flex flex-row-reverse justify-around items-center">
        <div className="hidden lg:block">
          <AuthLogo className="lg:w-24.5 w-60" />
        </div>
        <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex justify-center items-center text-xl font-200 text-[#0D0D0D]">
          <Link to={backDestinations[variant]}>
            <SlArrowLeft />
          </Link>
        </div>
      </header>
    )
}
