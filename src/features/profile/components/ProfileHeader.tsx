"use client";

import React, { useRef } from "react";
import { User, Camera, Edit3, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useUpdateProfileImage } from "../hooks/profile.hooks";

interface ProfileHeaderProps {
  name: string;
  email: string;
  image?: string | null;
  role: string;
  onEdit: () => void;
}

interface FetchError {
  message?: string;
  data?: {
    message?: string;
  };
}

export default function ProfileHeader({
  name,
  email,
  image,
  role,
  onEdit,
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateProfileImage, isPending: updateProfilePending } =
    useUpdateProfileImage();

  const handleCameraClick = () => {
    if (updateProfilePending) return;
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Profile image must be smaller than 5MB.");
      event.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    updateProfileImage(formData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.error(res.message || "Failed to update profile image.");
          return;
        }
        toast.success(res.message || "Profile image updated successfully.");
        event.target.value = "";
      },
      onError: (error: FetchError) => {
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "Failed to update profile image.";
        toast.error(errorMessage);
        event.target.value = "";
      },
    });
  };

  return (
    <div className="w-full bg-card text-card-foreground border border-border/60 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full min-w-0">
        {/* Floating Custom Badge Avatar Workspace Controller */}
        <div className="relative select-none shrink-0">
          <Avatar className="size-20 border border-border bg-muted">
            <AvatarImage
              src={image ?? ""}
              alt={name}
              className="object-cover"
            />
            <AvatarFallback className="bg-secondary text-primary font-black text-xl">
              {name ? name.charAt(0).toUpperCase() : <User size={24} />}
            </AvatarFallback>
          </Avatar>

          {/* Floating Action Circle Badge at the bottom right corner */}
          <button
            type="button"
            disabled={updateProfilePending}
            onClick={handleCameraClick}
            className={`absolute bottom-0 right-0 size-7 bg-primary text-primary-foreground border-2 border-card flex items-center justify-center shadow-md transition-all rounded-full ${
              updateProfilePending
                ? "cursor-not-allowed opacity-85"
                : "hover:bg-primary/95 hover:scale-105 active:scale-95"
            }`}
            aria-label="Upload profile image"
          >
            {updateProfilePending ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Camera size={12} strokeWidth={2.5} />
            )}
          </button>
        </div>

        {/* Hidden Camera Input Trigger */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />

        {/* User Workspace Info Metadata */}
        <div className="text-center sm:text-left min-w-0 w-full">
          <h2 className="text-base font-black text-foreground truncate">
            {name || "Anonymous Developer"}
          </h2>
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {email}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2">
            <span className="text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Shield size={10} /> {role || "USER"}
            </span>
          </div>
        </div>
      </div>

      {/* Account Settings Editor Action CTA Button */}
      <div className="shrink-0 w-full sm:w-auto relative z-10">
        <Button
          type="button"
          onClick={onEdit}
          className="h-9 w-full sm:w-auto bg-primary text-primary-foreground text-xs font-bold px-4 flex items-center justify-center gap-1.5 shadow-sm transition-transform hover:-translate-y-0.5"
        >
          <Edit3 size={13} strokeWidth={2.5} />
          <span>Edit Credentials</span>
        </Button>
      </div>
    </div>
  );
}
