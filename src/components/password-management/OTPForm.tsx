import type { FC } from "react";
import OTPInput from "../ui/OTPInput";
import { Button } from "../ui/button";
import { useOTPTimer } from "@/hooks/password-management/useOTPTimer";
import { otpSchema } from "@/lib/schemas/passwordManage.schemas";
import { type OTPFormValues } from "@/types/PasswordManagement.types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOTPVerify } from "@/hooks/password-management/useOTPVerify";
import { Loader2 } from "lucide-react";
import { useResendOTP } from "@/hooks/password-management/useResendOTP";

type OTPFormProps = {
  user_id: number;
  email: string;
};

const OTPForm: FC<OTPFormProps> = ({ user_id, email }) => {
  const { isRunning, seconds, resend } = useOTPTimer();
  const { mutate, isPending } = useOTPVerify();
  const { mutate: resendOTP, isPending: isResending } = useResendOTP();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleClick = () => {
    resendOTP({ email });
    resend();
  };

  const onSubmit = (data: OTPFormValues) => {
    mutate({
      ...data,
      user_id,
    });
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col  gap-2 lg:gap-4 items-center w-full"
    >
      <p className="text-gray-900 text-lg lg:text-2xl font-medium">
        {isRunning ? `00:${seconds}` : "00:00"}
      </p>
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <OTPInput value={field.value} onChange={field.onChange} />
        )}
      />
      {errors.otp && <p className="text-red-500 text-sm md:text-md lg:text-lg">{errors.otp.message}</p>}
      <p className="text-sm lg:text-lg">
        OTP not receive?{" "}
        <button
          onClick={handleClick}
          disabled={isRunning || isResending}
          className={`${
            isRunning || isResending
              ? "cursor-not-allowed"
              : "text-blue-800 cursor-pointer"
          } underline`}
        >
          send again
        </button>
      </p>
      <Button
        type="submit"
        disabled={isPending || isResending}
        className="w-full h-10 lg:h-12 rounded-sm text-md lg:text-xl font-semibold bg-blue-800 text-white cursor-pointer hover:text-white hover:bg-blue-900"
      >
        {isPending ? (
          <>
            Verifying
            <Loader2 className="animate-spin" />
          </>
        ) : isResending ? (
          <>
            Resending <Loader2 className="animate-spin" />{" "}
          </>
        ) : (
          "Verify"
        )}
      </Button>
    </form>
  );
};
export default OTPForm;
