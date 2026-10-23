import { PromptParams } from "@/features/user-dashboard/user.types";
import { useQuery } from "@tanstack/react-query";
import { getAllPublicPrompts } from "../prompts.api";

export const usePublicPrompts = (params: PromptParams) => {
  return useQuery({
    queryKey: ["prompts", params],
    queryFn: () => getAllPublicPrompts(params),
    staleTime: 5 * 60 * 1000, 
  });
};
