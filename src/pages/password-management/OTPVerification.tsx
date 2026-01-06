import Logo from "@/components/ui/Logo";
import OTPVerifyImg from "@/assets/OTPVerifyImg.png";
import type { FC } from "react";
import { ChevronLeft, Mail } from "lucide-react";
import OTPForm from "@/components/password-management/OTPForm";
import { Link, useLocation } from "react-router-dom";

const OTPVerification: FC = () => {

const location = useLocation();
const email = location.state?.email;
  return (
    <div className="auth-component-layout">
      <Logo style="self-end" />
      <div className="auth-content-layout">
        <div className="w-[50%] flex flex-col gap-4">
          <div className="w-fit rounded-full p-4 bg-gray-100">
            <Link to="/auth/forgot-password">
            <ChevronLeft />
            </Link>
          </div>
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
          <OTPForm />
        </div>
      </div>
    </div>
  );
};
export default OTPVerification;
