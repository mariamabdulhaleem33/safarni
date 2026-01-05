import { welcome } from "@/assets"
import AuthPageTemplate from "../AuthPageTemplate"
import AuthButton from "@/components/auth/AuthButton"
import AuthHeading from "@/components/auth/AuthHeading"
import AuthDesc from "@/components/auth/AuthDesc"
import AuthHeader from "@/components/auth/AuthHeader"
import { Link } from "react-router-dom"

export default function WelcomePage() {
  return (
    <div className="h-screen flex flex-col justify-center">
      <AuthHeader variant="welcome" />
      <main className="">
        <AuthPageTemplate image={welcome}>
          <AuthHeading>Welcome</AuthHeading>
          <AuthDesc className="mt-3 sm:mt-4 sm:mb-6 mb-5">
            Safarni is your all-in-one travel guide. Discover destinations,
            compare trip prices, book flights, hotels, car rentals, and local
            tours — all through one interactive experience.
          </AuthDesc>
          <Link to="/signup">
            <AuthButton className="bg-[#1E429F] hover:bg-[#163585] text-white">
              Sign Up
            </AuthButton>
          </Link>
          <Link to="/login">
            <AuthButton className="bg-white border-[#1E429F] border hover:bg-white text-[#1E429F]">
              Log In
            </AuthButton>
          </Link>
        </AuthPageTemplate>
      </main>
    </div>
  )
}
