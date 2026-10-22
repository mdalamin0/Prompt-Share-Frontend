"use client";

import StatCardSkeleton from "@/components/shared/dashboard/StatCardSkeleton";
import ActivitySkeleton from "@/features/user-dashboard/components/ActivitySkeleton";
import AnalyticsGrid from "@/features/user-dashboard/components/AnalyticsGrid";

import DashboardOverviewAddon from "@/features/user-dashboard/components/DashboardOverviewAddon";
import {
  useDashboardStats,
  useMyPrompts,
} from "@/features/user-dashboard/hooks/user.hooks";

export default function UserDashboard() {
  const { data: statsResponse, isPending: statsPending } = useDashboardStats();
  const stats = statsResponse?.data;

  const { data: promptsResponse, isPending: promptsPending } = useMyPrompts();
  const prompts = promptsResponse?.data?.data || [];
console.log(statsResponse?.data);

  return (
    <div className="container-app  w-full block">
      <div className="page-header mb-8">
        <div>
          <h1 className="page-title text-foreground">Analytics Overview</h1>
          <p className="page-description text-muted-foreground">
            Real-time performance metrics and insights for your shared prompt
            repository.
          </p>
        </div>
      </div>

      {statsPending ? <StatCardSkeleton/> : <AnalyticsGrid stats={stats} />}

      {promptsPending ? (
        <ActivitySkeleton />
      ) : (
        <DashboardOverviewAddon
          prompts={prompts}
          totalPrompts={promptsResponse?.data?.meta.totalPages || 0}
        />
      )}
    </div>
  );
}
