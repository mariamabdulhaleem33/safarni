import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPassSchema } from "@/lib/schemas/passwordManage.schemas";
import PasswordInput from "./PasswordInput";
import { confirmPasswordReset, getAuth } from "firebase/auth";
import { toast } from "sonner";
import { useSearchParams, useNavigate } from "react-router-dom";
import AuthButton from "../AuthButton";

interface FormData {
  password: string;
  password_confirmation: string;
}

const ResetPasswordForm: FC = () => {
  const auth = getAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const oobCode = searchParams.get("oobCode");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(newPassSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (!oobCode) {
      toast.error("Invalid or expired reset link");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, data.password);
      toast.success("Password reset successfully");
      navigate("/auth/success");
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full max-w-md">
      <PasswordInput
        label="New Password"
        type="password"
        placeholder="Enter new password"
        register={register("password")}
        error={errors.password && <p>{errors.password.message}</p>}
        isSubmitting={isSubmitting}
      />

      <PasswordInput
        label="Confirm Password"
        type="password"
        placeholder="Confirm new password"
        register={register("password_confirmation")}
        error={errors.password_confirmation && (
          <p>{errors.password_confirmation.message}</p>
        )}
        isSubmitting={isSubmitting}
      />

      <AuthButton className="auth-button bg-[#1E429F] text-white hover:bg-[#163585] mb-6" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Reset Password"}
      </AuthButton>
    </form>
  );
};

export default ResetPasswordForm;