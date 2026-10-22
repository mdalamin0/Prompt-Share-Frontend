"use client";

import StatCard from "@/components/shared/dashboard/StatCard";
import { Terminal, Globe, Zap } from "lucide-react";
import { IDashboardStats } from "../user.types";

interface AnalyticsGridProps {
  stats?: IDashboardStats; 
}

export default function AnalyticsGrid({ stats }: AnalyticsGridProps) {
  const data = stats || {
    totalPrompts: 0,
    publicPrompts: 0,
    privatePrompts: 0,
    totalForksReceived: 0,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
      <StatCard
        title="Total Prompts"
        value={data.totalPrompts}
        subText="Prompt templates created by you"
        icon={Terminal}
        variant="default"
      />

      <StatCard
        title="Visibility Ratio"
        value={`${data.publicPrompts} / ${data.privatePrompts}`}
        subText="Public versus Private templates"
        icon={Globe}
        variant="primary"
      />

      <StatCard
        title="Total Clones Received"
        value={data.totalForksReceived}
        subText="Cloned by other users"
        icon={Zap}
        variant="success"
      />
    </div>
  );
}
