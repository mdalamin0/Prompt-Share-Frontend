import { PromptParams } from "@/features/user-dashboard/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clonePrompt, getAllPublicPrompts } from "../prompts.api";

export const usePublicPrompts = (params: PromptParams) => {
  return useQuery({
    queryKey: ["prompts", params],
    queryFn: () => getAllPublicPrompts(params),
    staleTime: 5 * 60 * 1000, 
  });
};


export const useClonePrompt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clonePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      queryClient.invalidateQueries({ queryKey: ["my-prompt"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
};
