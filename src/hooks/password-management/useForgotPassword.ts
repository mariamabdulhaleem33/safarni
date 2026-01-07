import { useMutation } from "@tanstack/react-query";

import {
  type ForgotPassFormData,
  type ForgotPassResponse,
} from "@/types/PasswordManagement.types";
import { AxiosError } from "axios";
import { ForgotPassAPI } from "@/services/PasswordMamagement/forgot-password.api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ApiError {
  message: string;
}

export const useForgotPassword = () => {
  const navigate = useNavigate();

  return useMutation<
    ForgotPassResponse,
    AxiosError<ApiError>,
    ForgotPassFormData
  >({
    mutationFn: ForgotPassAPI,

    onSuccess: (_data, variables) => {
      toast.success("OTP sent to email");
      navigate("/auth/otp-verify", {
        state: {
          email: variables.email,
          user_id:_data.data.user_id,
        },
      });
    },

    onError: (error) => {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      console.log(error);
    },
  });
};
