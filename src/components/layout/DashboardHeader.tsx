"use client";

import React from "react";
import { Menu, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  user?: {
    name?: string;
    email?: string;
    image?: string | null;
    role?: "ADMIN" | "USER";
  };
  onMenuClick: () => void;
}

export default function DashboardHeader({
  user,
  onMenuClick,
}: DashboardHeaderProps) {
  const name = user?.name || "User";

  const userInitials = name
    .split(" ")
    .map((n: string) => n)
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 text-card-foreground transition-colors duration-200">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden text-muted-foreground hover:text-foreground"
        >
          <Menu size={20} />
        </Button>
        <div className="hidden min-w-0 sm:block">
          <p className="font-medium text-foreground">
            Welcome back, {name.split(" ")} 👋
          </p>
          <p className="text-xs text-muted-foreground">
            Manage your prompt workspace
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div className="flex items-center gap-2.5">
          <div className="hidden text-right md:block">
            <p className="text-xs font-semibold leading-none text-foreground">
              {user?.name || "Loading..."}
            </p>
            <p className="mt-1 text-[10px] font-medium leading-none text-muted-foreground capitalize">
              {user?.role?.toLowerCase() || "user"}
            </p>
          </div>

          {/* shadcn/ui Avatar with fallback typography */}
          <Avatar className="size-8 border border-border">
            <AvatarImage
              src={user?.image || undefined}
              alt={name}
              className="object-cover"
            />
            <AvatarFallback className="bg-secondary text-xs font-bold text-primary">
              {userInitials || <UserRound className="size-4" />}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
