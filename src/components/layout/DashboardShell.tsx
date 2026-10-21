"use client";

import { type ReactNode, useState } from "react";
import type {  UserRoleType } from "@/features/auth/auth.types";
import { useGetMe } from "@/features/auth/hooks/auth.hooks";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardShellProps {
  children: ReactNode;
  role: UserRoleType;
}

export default function DashboardShell({
  children,
  role,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data } = useGetMe();
  const user = data?.data;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-primary/5 blur-3xl transition-colors duration-200" />
        <div className="absolute -bottom-40 -right-32 size-[28rem] rounded-full bg-chart-1/5 blur-3xl transition-colors duration-200" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0.02_250/0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0.02_250/0.035)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,oklch(1_0_0/0.025)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.025)_1px,transparent_1px)]" />
      </div>

      <div className="flex min-h-screen">
        <DashboardSidebar
          role={role}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col md:pl-64 w-full">
          <DashboardHeader
            user={user}
            onMenuClick={() => setSidebarOpen(true)}
          />

          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 w-full block">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
