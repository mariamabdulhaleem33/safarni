import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi"
import AuthDesc from "../AuthDesc"
import AuthHeading from "../AuthHeading"

import AuthButton from "../AuthButton"
import Separator from "../login/Separator"
import AuthSocialButtons from "../AuthSocialButtons"
import AuthRedirect from "../AuthRedirect"
import { IoPersonOutline } from "react-icons/io5"
import ValidationRules from "./ValidationRules"

export default function SignUpForm() {
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
          {/* Name Field */}
          <div className="mb-4.5 sm:mb-4">
            <label className="label">Name</label>
            <div className="relative">
              <div className="input-icon-container">
                <div className="p-1">
                  <IoPersonOutline className="text-gray-500 text-lg" />
                </div>
              </div>
              <input
                type="text"
                placeholder="Hussain Abdelkawy"
                className="auth-input"
              />
            </div>
          </div>
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
          <div className="mb-4">
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
          <ValidationRules />
          <AuthButton className="auth-button bg-[#1E429F] text-white hover:bg-[#163585] mb-6">
            Sign Up
          </AuthButton>
        </form>

        <Separator />
        <AuthSocialButtons />
        <AuthRedirect variant="signin" />
      </div>
    </div>
  )
}
