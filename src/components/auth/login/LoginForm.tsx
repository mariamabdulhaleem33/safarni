import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi"
import AuthHeading from "../AuthHeading"
import AuthDesc from "../AuthDesc"
import AuthSocialButtons from "../AuthSocialButtons"
import Separator from "./Separator"
import AuthButton from "../AuthButton"
import ForgotPassword from "./ForgotPassword"
import AuthRedirect from "../AuthRedirect"

const LoginForm = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white text-left">
        <div className="hidden lg:block mb-2">
          <AuthHeading className="text-[28px]">Welcome Again</AuthHeading>
          <AuthDesc className="text-[18px]">
            welcome back! please fill your Data
          </AuthDesc>
        </div>
        {/* Login Form */}
        <form>
          {/* Email Field */}
          <div className="mb-4.5 sm:mb-4">
            <label className="label">Email</label>
            <div className="relative">
              <div className="input-icon-container">
                <div className="p-1">
                  <HiOutlineMail className="text-gray-500 text-lg" />
                </div>
              </div>
              <input
                type="email"
                placeholder="kneeDue@untitledui.com"
                className="auth-input "
              />
            </div>
          </div>
          {/* Password Field */}
          <div className="mb-2">
            <label className="label">Password</label>
            <div className="relative">
              <div className="input-icon-container">
                <div className="p-1 rounded">
                  <HiOutlineLockClosed className="text-gray-500 text-lg" />
                </div>
              </div>
              <input
                type="password"
                placeholder="************"
                className="auth-input"
              />
            </div>
          </div>
          <ForgotPassword />
          <AuthButton className="auth-button bg-[#1E429F] text-white hover:bg-[#163585] mb-6">
            Log In
          </AuthButton>
        </form>

        <Separator />
        <AuthSocialButtons />
        <AuthRedirect variant="signup" />
      </div>
    </div>
  )
}
export default LoginForm
