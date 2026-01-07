import Logo from "@/components/ui/Logo";
import forgotPassImg from "@/assets/forgotPassImg.png";
import type { FC } from "react";
import { KeyRound } from "lucide-react";
import ForgotPassForm from "@/components/password-management/ForgotPassForm";

import BackButton from "@/components/backButton";

const ForgotPassword: FC = () => {
  return (
    <div className="auth-component-layout">
      <Logo style="self-end" />
      <div className="auth-content-layout">
        <div className="w-[50%] flex flex-col gap-4">
          <BackButton/>
          <img
            src={forgotPassImg}
            className="h-[85vh] self-start object-contain"
          />
        </div>
        <div className="px-12.5 flex flex-col items-center gap-6 w-1/2">
          <KeyRound size={28} color="#AFAFAF" />
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-gray-900 text-3xl font-medium">
              Forgot Password?
            </h4>
            <p className="text-gray-500 text-lg">
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
