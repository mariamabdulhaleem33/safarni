import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "../../ui/input-group";
import { Loader2, MailIcon } from "lucide-react";
import { ForgotPassSchema } from "@/lib/schemas/passwordManage.schemas";
import { useForgotPassword } from "@/hooks/auth/passwordManagementHooks/useForgotPassword";

interface FormData {
  email: string;
}

const ForgotPassForm: FC = () => {
  const { mutate, isPending } = useForgotPassword();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(ForgotPassSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: FormData) => {
    mutate({ email: data.email });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full max-w-md">
      <InputGroupText className="self-start text-sm lg:text-lg text-neutral-700">
        Email
      </InputGroupText>
      <InputGroup className="w-full h-10 lg:h-12 rounded-sm shadow-xs">
        <InputGroupInput
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          disabled={isPending}
          className="w-full text-xs md:text-sm lg:text-lg"
        />
        <InputGroupAddon>
          <MailIcon size={20} />
        </InputGroupAddon>
      </InputGroup>
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      <InputGroupButton
        type="submit"
        disabled={isPending}
        className="w-full h-10 lg:h-12 bg-blue-800 text-white font-semibold rounded-sm hover:bg-blue-900"
      >
        {isPending ? <>Sending <Loader2 className="animate-spin" /></> : "Reset Password"}
      </InputGroupButton>
    </form>
  );
};

export default ForgotPassForm;