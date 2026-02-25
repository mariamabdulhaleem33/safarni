import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPassSchema } from "@/lib/schemas/passwordManage.schemas";
import { useForgotPassword } from "@/hooks/auth/passwordManagementHooks/useForgotPassword";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "../../ui/input-group";
import { MailIcon, Loader2 } from "lucide-react";
import AuthButton from "../AuthButton";

interface FormData {
  email: string;
}

const ForgotPassForm: FC = () => {
  const { mutate, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ForgotPassSchema),
  });

  const onSubmit = (data: FormData) => {
    mutate({ email: data.email });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full max-w-md">
      <InputGroupText>Email</InputGroupText>

      <InputGroup>
        <InputGroupInput
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          disabled={isPending}
        />
        <InputGroupAddon>
          <MailIcon size={18} />
        </InputGroupAddon>
      </InputGroup>

      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <AuthButton className="auth-button bg-[#1E429F] text-white hover:bg-[#163585] mb-6" disabled={isPending}>
        {isPending ? (
          <>
            Sending <Loader2 className="animate-spin ml-2" />
          </>
        ) : (
          "Reset Password"
        )}
      </AuthButton>
    </form>
  );
};

export default ForgotPassForm;