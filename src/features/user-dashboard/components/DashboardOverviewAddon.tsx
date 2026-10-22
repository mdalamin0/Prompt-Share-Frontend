"use client";

import React from "react";
import Link from "next/link";
import {
  Terminal,
  Eye,
  ArrowRight,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";
import { IPrompt } from "../user.types";



interface DashboardOverviewAddonProps {
  prompts?: IPrompt[];
  totalPrompts: number;
}

export default function DashboardOverviewAddon({
  prompts = [],
  totalPrompts,
}: DashboardOverviewAddonProps) {
  const latestPrompts = prompts.slice(0, 4);
  const limitCount = 40;
  const usagePercentage = Math.min(
    Math.round((totalPrompts / limitCount) * 100),
    100,
  );

 
const getCategoryIcon = (category: string) => {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory === "image") return ImageIcon;
  if (lowerCategory === "text") return FileText;
  return Terminal; 
};


  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full mt-8">
      {/* 1. Recent Activity Feed Section */}
      <div className="lg:col-span-3 bg-card border border-border/60 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-foreground tracking-tight">
                Recent Activity
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your latest created prompt templates.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href="/dashboard/user/my-prompts" />}
              className="text-xs text-primary font-semibold flex items-center gap-1 p-0 bg-transparent hover:bg-transparent"
            >
              View all prompts <ArrowRight size={14} />
            </Button>
          </div>

          {latestPrompts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-3">
              {latestPrompts.map((prompt) => {
                const Icon = getCategoryIcon(prompt.category);
                return (
                  <div
                    key={prompt.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-border/40 bg-zinc-50/30 dark:bg-zinc-900/10 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-secondary text-primary shrink-0">
                        <Icon size={14} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-foreground truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                          {prompt.title}
                        </h4>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider block mt-0.5">
                          {prompt.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          prompt.isPublic
                            ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/25"
                            : "bg-zinc-500/5 text-muted-foreground border-border"
                        }`}
                      >
                        {prompt.isPublic ? "Public" : "Private"}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground min-w-12 justify-end">
                        <Eye size={12} /> {prompt.views || 0}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 2. Repository Usage Limit Tracker */}
      <div className="lg:col-span-1 flex flex-col gap-5 w-full">
        <div className="bg-card border border-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between h-auto">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-foreground tracking-tight flex items-center gap-1">
                <ShieldCheck size={14} className="text-primary" /> Repository
                Limit
              </span>
              <span className="text-[11px] font-bold text-muted-foreground">
                {usagePercentage}%
              </span>
            </div>

            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>

            <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed font-medium">
              Using{" "}
              <span className="text-foreground font-semibold">
                {totalPrompts}
              </span>{" "}
              of {limitCount} allocated production prompt slots.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
