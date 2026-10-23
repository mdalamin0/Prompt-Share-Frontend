import apiClient from "@/lib/apiClient";
import { PaginatedResponse, PromptParams } from "../user-dashboard/user.types";
import { ApiResponse } from "../auth/auth.types";
import { IPublicPrompt } from "./prompts.types";

export const getAllPublicPrompts = (params: PromptParams) => {
  return apiClient<ApiResponse<PaginatedResponse<IPublicPrompt>>>(
    "/prompt",
    {
      params,
    },
  );
};