import type { FC } from "react";
import OTPInput from "../ui/OTPInput";
import { Button } from "../ui/button";
import { useOTPTimer } from "@/hooks/useOTPTimer";
import { otpSchema } from "@/lib/schemas/passwordManage.schemas";
import { type OTPFormValues } from "@/types/PasswordManagement.types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const OTPForm: FC = () => {

  const navigate = useNavigate();
  const { isRunning, seconds, resend } = useOTPTimer();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues:{
      otp: ""
    }
  });


  const handleClick = () => {
    resend();
  };

  const onSubmit = (data: OTPFormValues) => {
    console.log(data);
    navigate("/auth/new-password");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 items-center w-full"
    >
      <p className="text-gray-900 text-2xl font-medium">
        {isRunning ? `00:${seconds}` : "00:00"}
      </p>
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <OTPInput value={field.value} onChange={field.onChange} />
        )}
      />
      {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
      <p className="text-lg">
        OTP not receive?{" "}
        <button
          onClick={handleClick}
          disabled={isRunning}
          className={`${
            isRunning ? "cursor-not-allowed" : "text-blue-800 cursor-pointer"
          } underline`}
        >
          send again
        </button>
      </p>
      <Button className="w-full h-12 rounded-sm text-xl font-semibold bg-blue-800 text-white cursor-pointer hover:text-white hover:bg-blue-900">
        Verify
      </Button>
    </form>
  );
};
export default OTPForm;
