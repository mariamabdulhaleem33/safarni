import type {
  NewPassFormData,
  NewPassResponse,
} from "@/types/PasswordManagement.types";
import api from "../api";

export const ResetPassAPI = async (
  NewPassFormData: NewPassFormData
): Promise<NewPassResponse> => {
  const response = await api.post<NewPassResponse>(
    "reset-password",
    NewPassFormData
  );
  return response.data;
};
