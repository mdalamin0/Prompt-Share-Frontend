import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getMyPrompts } from "../user.api";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000,
  });
};


export const useMyPrompts = () => {
  return useQuery({
    queryKey: ["prompts"],
    queryFn: getMyPrompts,
    staleTime: 5 * 60 * 1000, 
  });
};
