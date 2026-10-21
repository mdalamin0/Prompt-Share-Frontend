"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLogout } from "./auth.hooks"; 
import { useRouter } from "next/navigation";

export const useAuthLogout = () => {
  const { mutate: logout, isPending } = useLogout();
  const queryClient = useQueryClient();
  const router = useRouter();


  const handleLogout = (onSuccessCallback?: () => void) => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully");
        
        queryClient.removeQueries({ queryKey: ["user"] });

         toast.success("Logged out successfully");

         router.refresh();
        
        if (onSuccessCallback) onSuccessCallback();
        
      },
      onError: () => {
        toast.error("Log Out Failed", {
          id: "logout",
          description: "Something went wrong, Please try again.",
        });
      },
    });
  };

  return { handleLogout, isPending };
};
