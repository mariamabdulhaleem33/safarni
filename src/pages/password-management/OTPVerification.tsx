import Logo from "@/components/ui/Logo";
import OTPVerifyImg from "@/assets/OTPVerifyImg.png";
import type { FC } from "react";
import { Mail } from "lucide-react";
import OTPForm from "@/components/password-management/OTPForm";
import { Navigate, useLocation } from "react-router-dom";
import BackButton from "@/components/backButton";

const OTPVerification: FC = () => {
  const location = useLocation();
  const email = location.state.email;
  const user_id = location.state.user_id;

  if (!email || !user_id) {
    return <Navigate to="/auth/forgot-password" replace />;
  }

  return (
    <div className="auth-component-layout">
      <Logo style="lg:self-end" />
      <div className="auth-content-layout">
        <div className="hidden md:w-1/2 md:flex flex-col justify-center gap-2">
          <BackButton/>
          <img
            src={OTPVerifyImg}
            className="w-full self-start object-contain"
          />
        </div>
        <div className="w-full px-3 md:px-12.5 flex flex-col items-center gap-3 lg:gap-6 md:w-1/2">
          <Mail size={28} color="#AFAFAF" />
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-gray-900 text-xl lg:text-3xl font-medium text-center">Verify Code</h4>
            <p className="text-gray-500 text-sm lg:text-lg text-center">
              Please enter the code we just sent to email
            </p>
            <p className="text-gray-900 text-sm lg:text-lg font-medium">{email}</p>
          </div>
          <OTPForm user_id={user_id} email={email} />
          
        </div>
      </div>
    </div>
  );
};
export default OTPVerification;
