"use client";

import React, { useState } from "react";
import {
  Mail,
  Calendar,
  Activity,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  User,
  Edit3,
  Save,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUpdateProfile } from "../hooks/profile.hooks";

interface ProfileAccountInfoProps {
  name: string;
  email: string;
  status: string;
  provider: string;
  emailVerified: boolean | null;
  createdAt: string;
  isEditing: boolean; 
  setIsEditing: (val: boolean) => void;
}

export default function ProfileAccountInfo({
  name,
  email,
  status,
  provider,
  emailVerified,
  createdAt,
  isEditing,
  setIsEditing,
}: ProfileAccountInfoProps) {
  const [updatedName, setUpdatedName] = useState(name);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recent";

  const handleSaveName = () => {
    const cleanName = updatedName.trim();
    if (!cleanName || cleanName.length < 2) {
      toast.error("Profile name must be at least 2 characters long.");
      return;
    }

    if (cleanName === name) {
      setIsEditing(false);
      return;
    }

    updateProfile(
      { name: cleanName },
      {
        onSuccess: (res) => {
          if (!res.success) {
            toast.error(res.message || "Failed to update profile name.");
            return;
          }
          toast.success("Identity profile name synchronized successfully!");
          setIsEditing(false);
        },
        onError: (error: any) => {
          toast.error(
            error?.data?.message ||
              error?.message ||
              "Failed to sync credentials.",
          );
        },
      },
    );
  };

  return (
    <div className="w-full bg-card text-card-foreground border border-border/60 p-6 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-5 select-none">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-primary" />
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
            Repository Core Information
          </h3>
        </div>

        {/* Inline Edit Trigger Action Button Control */}
        {!isEditing && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="h-7 text-[10px] font-bold px-2.5 flex items-center gap-1 text-muted-foreground hover:text-foreground border border-border/40 bg-background/50 shadow-sm"
          >
            <Edit3 size={11} /> <span>Edit Name</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {/* Dynamic Name Input or View Row Field */}
        <div className="p-4 bg-muted/30 border border-border/40 flex items-center gap-3.5 min-w-0 sm:col-span-2">
          <div className="p-2 bg-background border border-border text-muted-foreground shrink-0 rounded-xl">
            <User size={14} />
          </div>
          <div className="min-w-0 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0 w-full">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
                Identity Profile Name
              </span>

              {isEditing ? (
                <div className="mt-1.5 flex items-center gap-2 w-full max-w-md">
                  <Input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    disabled={isUpdating}
                    className="h-8 text-xs pl-3 w-full"
                    placeholder="Enter profile name"
                  />
                  <Button
                    type="button"
                    onClick={handleSaveName}
                    disabled={isUpdating}
                    className="h-8 bg-primary text-primary-foreground text-xs font-bold px-3 shrink-0 flex items-center gap-1 shadow-sm"
                  >
                    {isUpdating ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Save size={12} />
                    )}
                    <span>Save</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isUpdating}
                    onClick={() => {
                      setIsEditing(false);
                      setUpdatedName(name);
                    }}
                    className="h-8 size-8 border-border bg-transparent text-foreground hover:bg-accent shrink-0 p-0 flex items-center justify-center"
                  >
                    <X size={12} />
                  </Button>
                </div>
              ) : (
                <span className="text-xs font-bold text-foreground block truncate mt-0.5">
                  {name || "Anonymous Developer"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Email Metadata Grid Row */}
        <div className="p-4 bg-muted/30 border border-border/40 flex items-center gap-3.5 min-w-0">
          <div className="p-2 bg-background border border-border text-muted-foreground shrink-0 rounded-xl">
            <Mail size={14} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
              Communication Line
            </span>
            <span className="text-xs font-bold text-foreground block truncate mt-0.5">
              {email}
            </span>
          </div>
        </div>

        {/* Integration Provider Grid Row */}
        <div className="p-4 bg-muted/30 border border-border/40 flex items-center gap-3.5 min-w-0">
          <div className="p-2 bg-background border border-border text-muted-foreground shrink-0 rounded-xl">
            <ShieldCheck size={14} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
              Auth Provider
            </span>
            <span className="text-xs font-bold text-foreground block capitalize mt-0.5">
              {provider || "credentials"}
            </span>
          </div>
        </div>

        {/* Sync Status Grid Row */}
        <div className="p-4 bg-muted/30 border border-border/40 flex items-center gap-3.5 min-w-0">
          <div className="p-2 bg-background border border-border text-muted-foreground shrink-0 rounded-xl">
            <Activity size={14} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
              Workspace Matrix
            </span>
            <span
              className={`text-xs font-black block mt-0.5 uppercase tracking-wide ${
                status === "ACTIVE" ? "text-emerald-500" : "text-amber-500"
              }`}
            >
              {status || "ACTIVE"}
            </span>
          </div>
        </div>

        {/* Verification Status Grid Row */}
        <div className="p-4 bg-muted/30 border border-border/40 flex items-center gap-3.5 min-w-0">
          <div className="p-2 bg-background border border-border shrink-0 rounded-xl">
            {emailVerified ? (
              <CheckCircle2 size={14} className="text-emerald-500" />
            ) : (
              <XCircle size={14} className="text-amber-500" />
            )}
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
              Verification Node
            </span>
            <span
              className={`text-xs font-bold block mt-0.5 ${
                emailVerified ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {emailVerified ? "Verified Sync" : "Unverified Status"}
            </span>
          </div>
        </div>

        {/* Creation Timestamp Grid Row */}
        <div className="p-4 bg-muted/30 border border-border/40 flex items-center gap-3.5 min-w-0 sm:col-span-2">
          <div className="p-2 bg-background border border-border text-muted-foreground shrink-0 rounded-xl">
            <Calendar size={14} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
              Joined Node Timestamp
            </span>
            <span className="text-xs font-bold text-foreground block mt-0.5">
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
