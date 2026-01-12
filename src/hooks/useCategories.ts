import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categories.api";
import type { Category } from "@/types/category.types";

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategories();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};


