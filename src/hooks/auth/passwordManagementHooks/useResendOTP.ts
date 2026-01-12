import { useMutation } from "@tanstack/react-query";
import { ForgotPassAPI } from "@/services/passwordMamagementServices/forgot-password.api";
import { AxiosError } from "axios";
import type { ForgotPassResponse } from "@/types/passwordManagement.types";
import { toast } from "sonner";

interface ApiError {
  message: string;
}

export const useResendOTP = () => {
  return useMutation<
    ForgotPassResponse,
    AxiosError<ApiError>,
    { email: string }
  >({
    mutationFn: ForgotPassAPI,

    onSuccess: () => {
      toast.success("OTP sent again to your email");
    },

    onError: (error) => {
      const message = error.response?.data?.message || "Failed to resend OTP";
      toast.error(message);
    },
  });
};
