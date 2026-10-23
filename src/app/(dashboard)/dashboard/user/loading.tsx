"use client";

import StatCardSkeleton from "@/components/shared/dashboard/StatCardSkeleton";
import ActivitySkeleton from "@/features/user-dashboard/components/ActivitySkeleton";

const OverviewSkeleton = () => {
  return (
    <div className="container-app w-full block animate-pulse">
      <div className="page-header mb-8">
        <div className="space-y-2">
          <div className="h-8 w-56 rounded-md bg-muted/60" />
          <div className="h-4 w-96 rounded-md bg-muted/40" />
        </div>
      </div>

      <StatCardSkeleton />

      <ActivitySkeleton />
    </div>
  );
};

export default OverviewSkeleton;
