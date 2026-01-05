import AuthHeader from "@/components/auth/AuthHeader"
import AuthPageTemplate from "../AuthPageTemplate"
import AuthHeading from "@/components/auth/AuthHeading"
import AuthDesc from "@/components/auth/AuthDesc"
import { login, logo } from "@/assets"
import { SlArrowLeft } from "react-icons/sl"
import { Link } from "react-router-dom"
import LoginForm from "@/components/auth/login/LoginForm"

export default function LoginPage() {
  return (
    <div className="h-screen relative flex flex-col justify-center">
      <div className="hidden lg:block">
        <AuthHeader variant="login" />
      </div>

      <div className="absolute sm:top-15.5 sm:left-15.5  top-12 left-7 sm:text-[25px] text-[19px] lg:hidden block">
        <Link to="/welcome">
          <SlArrowLeft />
        </Link>
      </div>
      <main>
        <AuthPageTemplate image={login}>
          <div className="lg:hidden flex flex-col items-center">
            <div className="lg:w-24.5 w-40 flex items-center mb-6">
              <img src={logo} alt="logo" />
            </div>
            <AuthHeading className="sm:text-[28px] text-[18px]">
              Welcome Again
            </AuthHeading>
            <AuthDesc className="mt-3 sm:mt-4 sm:mb-6 mb-5 sm:text-[21px] text-[14px]">
              welcome back! please fill your Data
            </AuthDesc>
          </div>
          <LoginForm />
        </AuthPageTemplate>
      </main>
    </div>
  )
}
