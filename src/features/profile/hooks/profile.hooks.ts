import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileFields, updateProfileImage } from "../profile.api";

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileImage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileFields,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); 
    },
  });
};