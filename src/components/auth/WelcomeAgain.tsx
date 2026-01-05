import AuthHeading from "./AuthHeading"
import AuthDesc from "./AuthDesc"

export default function WelcomeAgain() {
  return (
    <div className="lg:hidden flex flex-col items-center">
      <AuthHeading className="sm:text-[28px] text-[18px]">
        Welcome Again
      </AuthHeading>
      <AuthDesc className="mt-3 sm:mt-4 sm:mb-6 mb-5 sm:text-[21px] text-[14px]">
        welcome back! please fill your Data
      </AuthDesc>
    </div>
  )
}
