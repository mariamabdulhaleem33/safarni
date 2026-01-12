import Logo from "@/components/ui/Logo";
import forgotPassImg from "@/assets/forgotPassImg.png";
import type { FC } from "react";
import { KeyRound } from "lucide-react";
import ForgotPassForm from "@/components/auth/passwordManagementComp/ForgotPassForm";

import BackButton from "@/components/backButton";

const ForgotPassword: FC = () => {
  return (
    <div className="auth-component-layout">
      <Logo style="lg:self-end" />
      <div className="auth-content-layout">
        <div className="hidden md:w-1/2 md:flex flex-col justify-center gap-2">
          <BackButton />
          <img
            src={forgotPassImg}
            alt="forgot password img"
            className="w-full self-start object-contain"
          />
        </div>
        <div className="w-full px-3 md:px-12.5 flex flex-col items-center gap-6 md:w-1/2">
          <KeyRound size={28} color="#AFAFAF" />
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-gray-900 text-xl lg:text-3xl font-medium text-center">
              Forgot Password?
            </h4>
            <p className="text-gray-500 text-sm lg:text-lg text-center">
              please enter your email to reset that password
            </p>
          </div>
          <ForgotPassForm />
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
