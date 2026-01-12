import type {
  NewPassFormData,
  NewPassResponse,
} from "@/types/passwordManagement.types";
import api from "@/api/axios";

export const ResetPassAPI = async (
  NewPassFormData: NewPassFormData
): Promise<NewPassResponse> => {
  const response = await api.post<NewPassResponse>(
    "reset-password",
    NewPassFormData
  );
  return response.data;
};
