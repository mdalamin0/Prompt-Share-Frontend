import apiClient from "@/lib/apiClient";
import { PaginatedResponse, PromptParams } from "../user-dashboard/user.types";
import { ApiResponse } from "../auth/auth.types";
import { IClonePromptResponse, IPublicPrompt } from "./prompts.types";

export const getAllPublicPrompts = (params: PromptParams) => {
  return apiClient<ApiResponse<PaginatedResponse<IPublicPrompt>>>("/prompt", {
    params,
  });
};

export const clonePrompt = (promptId: string) => {
  return apiClient<ApiResponse<IClonePromptResponse>>(
    `prompt/clone-prompt-to-my-collection/${promptId}`,
    {
      method: "POST",
    },
  );
};