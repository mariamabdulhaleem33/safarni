import { useMutation } from "@tanstack/react-query";

import {
  type OTPFormValues,
  type OTPResponse,
} from "@/types/PasswordManagement.types";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { OTPVerifyAPI } from "@/services/PasswordMamagement/verify-otp.api";

interface ApiError {
  errors: string;
}

export const useOTPVerify = () => {
  const navigate = useNavigate();

  return useMutation<
    OTPResponse,
    AxiosError<ApiError>,
    OTPFormValues
  >({
    mutationFn: OTPVerifyAPI,

    onSuccess: (_data, variables) => {
      toast.success("OTP Verified Successfully");
      navigate("/auth/new-password", {
        state: {
          user_id: _data.user_id,
          otp: variables.otp
        },
      });
    },

    onError: (error) => {
      const message = error.response?.data?.errors || "Something went wrong";
      toast.error(message);
      console.log(error)
    },
  });
};
