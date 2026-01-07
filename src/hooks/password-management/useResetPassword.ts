import { useMutation } from "@tanstack/react-query";

import {
  type NewPassFormData,
  type NewPassResponse,
} from "@/types/PasswordManagement.types";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ResetPassAPI } from "@/services/PasswordMamagement/reset-password.api";

interface ApiError {
  errors: string;
}

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation<NewPassResponse, AxiosError<ApiError>, NewPassFormData>({
    mutationFn: ResetPassAPI,

    onSuccess: () => {
      toast.success("Your password has been reset successfully");
      navigate("/auth/success");
    },

    onError: (error) => {
      const message = error.response?.data?.errors || "Something went wrong";
      toast.error(message);
      console.log(error);
    },
  });
};
