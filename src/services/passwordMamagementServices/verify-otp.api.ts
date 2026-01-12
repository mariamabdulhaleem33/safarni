import type {
  OTPFormValues,
  OTPResponse,
} from "@/types/passwordManagement.types";
import api from "@/api/axios";
import { transformOTPResponse } from "@/utils/transformOTPResponse";

export const OTPVerifyAPI = async (
  OTPVerifyData: OTPFormValues
): Promise<OTPResponse> => {
  const response = await api.post<OTPResponse>("verify-otp", OTPVerifyData);
  return transformOTPResponse(response.data);
};
