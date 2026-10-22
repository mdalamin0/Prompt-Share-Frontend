import apiClient from "@/lib/apiClient";
import { ApiResponse } from "../auth/auth.types";
import { IDashboardStats, IPrompt, PaginatedResponse, PromptParams } from "./user.types";

export const getDashboardStats = () => {
  return apiClient<ApiResponse<IDashboardStats>>("prompt/dashboard-stats", {
    method: "GET",
  });
};

export const getMyPrompts = (params: PromptParams) => {
  return apiClient<ApiResponse<PaginatedResponse<IPrompt>>>(
    "/prompt/my-prompts",
    {
      params,
    },
  );
};

