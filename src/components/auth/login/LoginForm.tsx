import AuthHeading from "../AuthHeading"
import AuthDesc from "../AuthDesc"
import AuthSocialButtons from "../AuthSocialButtons"
import Separator from "../Separator"
import AuthButton from "../AuthButton"
import ForgotPassword from "./ForgotPassword"
import AuthRedirect from "../AuthRedirect"
import AuthInput from "../AuthInput"
import { useLogin } from "@/hooks/auth/useLogin"

const LoginForm = () => {
  const { handleSubmit, onSubmit, inputs } = useLogin()
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white text-left">
        <div className="hidden lg:block mb-2">
          <AuthHeading className="text-[28px]">Welcome Again</AuthHeading>
          <AuthDesc>welcome back! please fill your Data</AuthDesc>
        </div>
        {/* Login Form */}
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
