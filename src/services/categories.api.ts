import api from "@/api/axios";
import type { CategoriesResponse } from "@/types/category.types";

export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await api.get<CategoriesResponse>("categories");
  return response.data;
};
