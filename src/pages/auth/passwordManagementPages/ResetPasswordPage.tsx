import Logo from "@/components/ui/Logo";
import forgotPassImg from "@/assets/forgotPassImg.png";
import type { FC } from "react";
import { Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ResetPasswordForm from "@/components/auth/passwordManagementComp/ResetPasswordForm";
import BackButton from "@/components/backButton";

const ResetPasswordPage: FC = () => {
  return (
    <div className="auth-component-layout">
      <Logo style="lg:self-end" />
      <div className="auth-content-layout">
        <div className="hidden md:w-1/2 md:flex flex-col justify-center gap-2">
          <BackButton />
          <img
            src={forgotPassImg}
            alt="reset password img"
            className="w-full self-start object-contain"
          />
        </div>
        <div className="w-full px-3 md:px-10 flex flex-col items-center gap-3 lg:gap-5 md:w-1/2">
          <Lock size={28} color="#AFAFAF" />
          <div className="flex flex-col items-center gap-2 lg:gap-3">
            <h4 className="text-gray-900 text-xl lg:text-3xl font-medium text-center">
              Set new password
            </h4>
            <p className="text-gray-500 text-xs lg:text-lg text-center w-[80%]">
              Your New Password Must be Different to Previously Used Password
            </p>
          </div>
          <ResetPasswordForm />
          <Link
            className="flex justify-center items-center gap-1 md:gap-2 cursor-pointer"
            to="/auth/login"
          >
            <ArrowLeft className="text-gray-400" />
            <p className="text-sm lg:text-lg font-medium text-gray-900">
              Back To Log In
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
