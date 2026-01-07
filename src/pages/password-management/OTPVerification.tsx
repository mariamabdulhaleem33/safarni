import Logo from "@/components/ui/Logo";
import OTPVerifyImg from "@/assets/OTPVerifyImg.png";
import type { FC } from "react";
import { Mail } from "lucide-react";
import OTPForm from "@/components/password-management/OTPForm";
// import { Navigate, useLocation } from "react-router-dom";
import BackButton from "@/components/backButton";

const OTPVerification: FC = () => {
  // const location = useLocation();
  const email = "mariam@gmail.com";
  const user_id = 4;

  // if (!email || !user_id) {
  //   return <Navigate to="/auth/forgot-password" replace />;
  // }

  return (
    <div className="auth-component-layout">
      <Logo style="self-end" />
      <div className="auth-content-layout">
        <div className="w-[50%] flex flex-col gap-4">
          <BackButton/>
          <img
            src={OTPVerifyImg}
            className="h-[85vh] self-start object-contain"
          />
        </div>
        <div className="px-12.5 flex flex-col items-center gap-6 w-1/2">
          <Mail size={28} color="#AFAFAF" />
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-gray-900 text-3xl font-medium">Verify Code</h4>
            <p className="text-gray-500 text-lg">
              Please enter the code we just sent to email
            </p>
            <p className="text-gray-900 font-medium">{email}</p>
          </div>
          <OTPForm user_id={user_id} email={email} />
        </div>
      </div>
    </div>
  );
};
export default OTPVerification;
