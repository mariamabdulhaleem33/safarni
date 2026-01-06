import AuthDesc from "../AuthDesc"
import AuthHeading from "../AuthHeading"
import AuthButton from "../AuthButton"
import Separator from "../Separator"
import AuthSocialButtons from "../AuthSocialButtons"
import AuthRedirect from "../AuthRedirect"
import ValidationRules from "./ValidationRules"
import AuthInput from "../AuthInput"
import { useSignup } from "@/hooks/auth/useSignup"

export default function SignUpForm() {
  const { handleSubmit, onSubmit, inputs, hasPasswordError, passwordValue } =
    useSignup()
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white text-left">
        <div className="hidden lg:block mb-2">
          <AuthHeading className="text-[28px]">Welcome Again</AuthHeading>
          <AuthDesc>welcome back! please fill your Data</AuthDesc>
        </div>
        {/* Sign Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {inputs.map((input) => (
            <AuthInput
              key={input.id}
              label={input.label}
              type={input.type}
              placeholder={input.placeholder}
              icon={input.icon}
              error={input.error}
              register={input.register}
            />
          ))}

          <ValidationRules
            isPasswordError={hasPasswordError}
            passwordValue={passwordValue}
          />
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
