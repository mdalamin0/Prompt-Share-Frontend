import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getMyPrompts } from "../user.api";
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
