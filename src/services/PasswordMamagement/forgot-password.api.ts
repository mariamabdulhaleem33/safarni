import type {
  ForgotPassFormData,
  ForgotPassResponse,
} from "@/types/PasswordManagement.types";
import api from "../api";

export const ForgotPassAPI = async (
  forgotPassData: ForgotPassFormData
): Promise<ForgotPassResponse> => {
  const response = await api.post<ForgotPassResponse>(
    "forgot-password",
    forgotPassData
  );
  return response.data;
};
