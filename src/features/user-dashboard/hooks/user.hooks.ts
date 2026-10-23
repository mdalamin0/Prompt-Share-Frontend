import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPrompt, deletePrompt, getDashboardStats, getMyPrompts, getPromptById, updatePrompt } from "../user.api";
import { PromptParams } from "../user.types";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000,
  });
};


export const useMyPrompts = (params: PromptParams) => {
  return useQuery({
    queryKey: ["prompts", params],
    queryFn: () => getMyPrompts(params),
    staleTime: 5 * 60 * 1000,
  });
};


export const useSinglePrompt = (id: string) => {
  return useQuery({
    queryKey: ["my-prompt", id],
    queryFn: () => getPromptById(id),
    enabled: !!id,
    staleTime: 0, 
  });
};


export const useCreatePrompt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
};

export const useUpdatePrompt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePrompt,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["my-prompt", variables.id] });
    },
  });
};

export const useDeletePrompt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (promptId: string) => deletePrompt(promptId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
};
