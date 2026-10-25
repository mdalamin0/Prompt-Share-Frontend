import apiClient from "@/lib/apiClient";
import { ApiResponse } from "../auth/auth.types";
import { IUpdateProfilePayload, IUpdateProfileResponse } from "./profile.types";

export const updateProfileImage = (formData: FormData) => {
  return apiClient("/user/profile-image", {
    method: "PATCH",
    body: formData,
  });
};

export const updateProfileFields = (payload: IUpdateProfilePayload) => {
  return apiClient<ApiResponse<IUpdateProfileResponse>>(
    "/auth/me",
    {
      method: "PATCH",
      body: payload,
    },
  );
};
