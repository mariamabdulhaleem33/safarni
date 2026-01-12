import { useMutation } from "@tanstack/react-query";

import {
  type ForgotPassFormData,
  type ForgotPassResponse,
} from "@/types/passwordManagement.types";
import { AxiosError } from "axios";
import { ForgotPassAPI } from "@/services/passwordMamagementServices/forgot-password.api";
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
      toast.success("OTP verified successfully!");
      navigate("/auth/new-password", {
        state: {
          email: variables.email,
          id: _data.data.user_id,
          otp:"1234"
        },
      });
    },

    onError: (error) => {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
  });
};
