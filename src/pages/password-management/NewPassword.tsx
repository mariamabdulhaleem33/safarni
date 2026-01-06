import Logo from "@/components/ui/Logo";
import forgotPassImg from "@/assets/forgotPassImg.png";
import type { FC } from "react";
import { ArrowLeft, ChevronLeft, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import NewPassForm from "@/components/password-management/NewPassForm";

const NewPassword: FC = () => {
  return (
    <div className="auth-component-layout">
      <Logo style="self-end" />
      <div className="auth-content-layout">
        <div className="w-[50%] flex flex-col gap-4">
          <div className="w-fit rounded-full p-4 bg-gray-100">
            <Link to="/auth/otp-verify">
              <ChevronLeft />
            </Link>
          </div>
          <img
            src={forgotPassImg}
            className="h-[90vh] self-start object-contain"
          />
        </div>
        <div className="px-12.5 flex flex-col items-center gap-4 w-1/2">
          <Lock size={28} color="#AFAFAF" />
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-gray-900 text-3xl font-medium">
              Set new password
            </h4>
            <p className="text-gray-500 text-lg text-center w-[90%]">
              Your New Password Must be Different to Previously Used Password
            </p>
          </div>
          <NewPassForm />
          <Link
            className="flex justify-center items-center gap-2 cursor-pointer"
            to="/login"
          >
            <ArrowLeft className="text-gray-400" />
            <p className="text-lg font-medium text-gray-900">Back To Log In</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NewPassword;
