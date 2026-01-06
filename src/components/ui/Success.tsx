import type { FC } from "react";
import Logo from "./Logo";
import success from "@/assets/Success.png";
import check from "@/assets/check-circle.png";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";

const Success: FC = () => {
  return (
    <div className="auth-component-layout ">
      <Logo style="self-end" />
      <div className="auth-content-layout">
        <div className="w-[50%] flex flex-col justify-start gap-4">
          <div className="w-fit rounded-full p-4 bg-gray-100">
            <Link to="/auth/new-password">
              <ChevronLeft />
            </Link>
          </div>
          <img src={success} className="h-[85vh] self-start object-contain" />
        </div>
        <div className="px-12.5 flex flex-col items-center gap-6 w-1/2">
          <img src={check} alt="circle-check" />
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-gray-900 text-3xl font-medium">
              Password Reset
            </h4>
            <p className="text-gray-500 text-lg text-center">
              your password has been successfully reset click below to log in
              magically.
            </p>
          </div>
          <Button className="w-full h-12 rounded-sm text-xl font-semibold bg-blue-800 text-white cursor-pointer hover:text-white hover:bg-blue-900">
            <Link to="/login" className="w-full">Log In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Success;
