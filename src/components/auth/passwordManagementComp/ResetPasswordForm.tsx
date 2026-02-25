import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPassSchema } from "@/lib/schemas/passwordManage.schemas";
import PasswordInput from "./PasswordInput";
import { InputGroupButton } from "../../ui/input-group";
import { getAuth, updatePassword } from "firebase/auth";
import { toast } from "sonner";

interface FormData {
  password: string;
  password_confirmation: string;
}

const ResetPasswordForm: FC = () => {
  const auth = getAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(newPassSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (auth.currentUser) {
      try {
        await updatePassword(auth.currentUser, data.password);
        toast.success("Password reset successfully!");
        reset();
      } catch {
        toast.error("Failed to reset password.");
      }
    } else {
      toast.error("User not signed in. Retry forgot password.");
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
        error={errors.password_confirmation && <p>{errors.password_confirmation.message}</p>}
        isSubmitting={isSubmitting}
      />
      <InputGroupButton
        type="submit"
        disabled={isSubmitting}
        className="w-full h-10 lg:h-12 bg-blue-800 text-white font-semibold rounded-sm hover:bg-blue-900"
      >
        {isSubmitting ? "Processing..." : "Reset Password"}
      </InputGroupButton>
    </form>
  );
};

export default ResetPasswordForm;