import type {
  ForgotPassFormData,
  ForgotPassResponse,
} from "@/types/passwordManagement.types";
import api from "@/api/axios";

export const ForgotPassAPI = async (
  forgotPassData: ForgotPassFormData
): Promise<ForgotPassResponse> => {
  const response = await api.post<ForgotPassResponse>(
    "forgot-password",
    forgotPassData
  );
  return response.data;
};
