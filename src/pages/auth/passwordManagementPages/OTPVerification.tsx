
import Logo from "@/components/ui/Logo"
import OTPVerifyImg from "@/assets/OTPVerifyImg.png"
import { Mail } from "lucide-react"
import OTPForm from "@/components/auth/passwordManagementComp/OTPForm"
import { Navigate, useLocation } from "react-router-dom"
import BackButton from "@/components/backButton"

const OTPVerification = () => {
  const location = useLocation()
  const email = location.state?.email
  const uid = location.state?.uid

  if (!email || !uid) {
    return <Navigate to="/auth/signup" replace />
  }

  return (
    <div className="auth-component-layout">
      <Logo style="lg:self-end" />
      <div className="auth-content-layout">
        <div className="hidden md:flex md:w-1/2 flex-col gap-2">
          <BackButton />
          <img src={OTPVerifyImg} className="object-contain" />
        </div>

        <div className="md:w-1/2 w-full flex flex-col items-center gap-6">
          <Mail size={28} color="#AFAFAF" />
          <h4 className="text-xl lg:text-3xl font-medium">Verify Email</h4>
          <p className="text-gray-500">{email}</p>
          <OTPForm email={email} />
        </div>
      </div>
    </div>
  )
}

export default OTPVerification