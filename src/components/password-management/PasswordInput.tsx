import type { FC, ReactNode } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";
import { LockIcon } from "lucide-react";

type PasswordInputProps = {
  label: string;
  isSubmitting: boolean;
  type: string;
  placeholder: string;
  register: object;
  error: ReactNode | undefined
};

const PasswordInput: FC<PasswordInputProps> = ({
  label,
  isSubmitting,
  type,
  placeholder,
  register,
  error
}) => {
  return (
    <div className="w-full flex flex-col justify-center gap-2">
      <InputGroupText className="self-start text-lg text-neutral-700">
        {label}
      </InputGroupText>
      <InputGroup className={` w-full h-12 rounded-sm shadow-xs`}>
        <InputGroupInput
          disabled={isSubmitting}
          type={type}
          placeholder={placeholder}
          {...register}
        />
        <InputGroupAddon>
          <LockIcon size={20} />
        </InputGroupAddon>
      </InputGroup>
      {error}
    </div>
  );
};
export default PasswordInput;
