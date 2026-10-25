"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { useGetMe } from "@/features/auth/hooks/auth.hooks";
import ProfileAccountInfo from "./ProfileAccountInfo";
import ProfileHeader from "./ProfileHeader";

export default function ProfilePage() {
  const { data } = useGetMe();
  const user = data?.data;
  const [isEditingName, setIsEditingName] = useState(false);

  if (!user) return null;

  return (
    <>
      <section className="page-section w-full min-h-screen block animate-fade-in">
        <div className="container-app px-4 sm:px-6 mx-auto max-w-5xl">
          {/* Top Page Header Panel */}
          <div className="mb-6 flex items-center gap-3 border-b border-border/40 pb-5 select-none">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                Profile Settings
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage your account credentials, image repository, and personal
                information.
              </p>
            </div>
          </div>

          <div className="space-y-6 mt-6">
            <ProfileHeader
              name={user.name}
              email={user.email}
              image={user.image}
              role={user.role}
              onEdit={() => setIsEditingName(true)}
            />

            <div className="grid gap-6 grid-cols-1 w-full items-start">
              <ProfileAccountInfo
                name={user.name}
                email={user.email}
                status={user.status}
                provider={user.provider}
                createdAt={user.createdAt}
                emailVerified={user.emailVerified}
                isEditing={isEditingName}
                setIsEditing={setIsEditingName}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
