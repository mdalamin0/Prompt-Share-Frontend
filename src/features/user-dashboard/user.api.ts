import apiClient from "@/lib/apiClient";
import { ApiResponse } from "../auth/auth.types";
import { IDashboardStats, IPrompt, PaginatedResponse } from "./user.types";

export const getDashboardStats = () => {
  return apiClient<ApiResponse<IDashboardStats>>("prompt/dashboard-stats", {
    method: "GET",
  });
};

export const getMyPrompts = () => {
  return apiClient<ApiResponse<PaginatedResponse<IPrompt>>>(
    "/prompt/my-prompts",
    {
      method: "GET",
    },
  );
};

