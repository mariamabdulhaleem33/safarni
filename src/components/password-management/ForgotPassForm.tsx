import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";
import { Loader2, MailIcon } from "lucide-react";
import type { ForgotPassFormData } from "@/types/PasswordManagement.types";
import { ForgotPassSchema } from "@/lib/schemas/passwordManage.schemas";
import { useForgotPassword } from "@/hooks/password-management/useForgotPassword";

const ForgotPassForm: FC = () => {
  const { mutate, isPending } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPassFormData>({
    resolver: zodResolver(ForgotPassSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data: ForgotPassFormData) => {
    mutate(data);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 items-center w-full"
    >
      <div className="w-full">
        <InputGroupText className="self-start text-lg text-neutral-700">
          Email
        </InputGroupText>
        <InputGroup className={` w-full h-12 rounded-sm shadow-xs`}>
          <InputGroupInput
            disabled={isPending}
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          <InputGroupAddon>
            <MailIcon size={20} />
          </InputGroupAddon>
        </InputGroup>
      </div>
      {errors.email && (
        <p className="text-red-500 self-start">{errors.email.message}</p>
      )}
      <InputGroupButton
        type="submit"
        disabled={isPending}
        className="w-full h-12 rounded-sm text-xl font-semibold bg-blue-800 text-white cursor-pointer hover:text-white hover:bg-blue-900"
      >
        {isPending ? <>Sending<Loader2  className="animate-spin" /></> : "Reset Password"}
      </InputGroupButton>
    </form>
  );
};
export default ForgotPassForm;
