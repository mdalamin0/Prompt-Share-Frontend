import apiClient from "@/lib/apiClient";
import { ApiResponse } from "../auth/auth.types";
import { IDashboardStats, IPrompt, IPromptFormData, PaginatedResponse, PromptParams } from "./user.types";

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

export const createPrompt = (payload: IPromptFormData) => {
  return apiClient<ApiResponse<IPromptFormData>>("/prompt/create", {
    method: "POST",
    body: payload,
  });
};

export const deletePrompt = (promptId: string) => {
  return apiClient(`/prompt/${promptId}`, {
    method: "DELETE",
  });
}

