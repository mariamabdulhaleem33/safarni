import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NewPassFormData } from "@/types/PasswordManagement.types";
import { newPassSchema } from "@/lib/schemas/passwordManage.schemas";
import PasswordRule from "./PasswordRule";
import { InputGroupButton } from "../ui/input-group";
import PasswordInput from "./PasswordInput";
import { useResetPassword } from "@/hooks/password-management/useResetPassword";
import { Loader2 } from "lucide-react";

type NewPassFormProp = {
  user_id: number;
  otp: string;
};

const NewPassForm: FC<NewPassFormProp> = ({ user_id, otp }) => {
  const { mutate, isPending } = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<NewPassFormData>({
    resolver: zodResolver(newPassSchema),
  });
  const password = watch("password") || "";
  const isPasswordLengthValid = password.length >= 8;
  const isPasswordFormatValid = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
    password
  );
  const NewPassFormInputs = [
    {
      label: "Password",
      type: "password",
      placeholder: "Enter new password",
      register: { ...register("password") },
      isSubmitting: isPending,
      error: errors.password && (
        <p className="text-red-500 self-start">{errors.password.message}</p>
      ),
    },
    {
      label: "confirm Password",
      type: "password",
      placeholder: "Enter new password again",
      register: { ...register("password_confirmation") },
      isSubmitting: isPending,
      error: errors.password_confirmation && (
        <p className="text-red-500 self-start">
          {errors.password_confirmation.message}
        </p>
      ),
    },
  ];

  const passRules = [
    {
      valid: isPasswordLengthValid,
      message: "Must contain at least 8 characters",
    },
    {
      valid: isPasswordFormatValid,
      message: "Must contain one special character",
    },
  ];

  const onSubmit = (data: NewPassFormData) => {
    mutate({
      ...data,
      user_id,
      otp,
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-2 items-center w-full"
    >
      {NewPassFormInputs.map((el, i) => {
        return (
          <PasswordInput
            key={i}
            label={el.label}
            isSubmitting={el.isSubmitting}
            error={el.error}
            register={el.register}
            placeholder={el.placeholder}
            type={el.type}
          />
        );
      })}
      <div className="w-full flex flex-col items-start justify-center gap-2">
        {passRules.map((el, i) => (
          <PasswordRule key={i} valid={el.valid} message={el.message} />
        ))}
      </div>
      <InputGroupButton
        type="submit"
        disabled={isPending}
        className="w-full h-12 rounded-sm text-xl font-semibold bg-blue-800 text-white cursor-pointer hover:text-white hover:bg-blue-900"
      >
        {isPending ? (
          <>
            Processing <Loader2 className="animate-spin" />
          </>
        ) : (
          "Reset Password"
        )}
      </InputGroupButton>
    </form>
  );
};
export default NewPassForm;
