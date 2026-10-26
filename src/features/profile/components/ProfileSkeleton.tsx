"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <section className="page-section w-full min-h-screen block animate-fade-in select-none">
      <div className="container-app px-4 sm:px-6 mx-auto max-w-5xl">
        <div className="mb-6 flex items-center gap-3 border-b border-border/40 pb-5">
          <Skeleton className="size-10 rounded-xl" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>

        <div className="space-y-6 mt-6">
          <div className="w-full bg-card text-card-foreground border border-border/60 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full min-w-0">
              <div className="relative shrink-0">
                <Skeleton className="size-20 rounded-full" />
              </div>

              <div className="flex flex-col items-center sm:items-start min-w-0 w-full space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-3 w-36" />
                <div className="pt-1">
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <Skeleton className="h-9 w-full sm:w-32 rounded-xl" />
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 w-full items-start">
            <div className="w-full bg-card text-card-foreground border border-border/60 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded" />
                  <Skeleton className="h-4 w-44" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="p-4 bg-muted/30 border border-border/40 flex items-center gap-3.5 min-w-0 sm:col-span-2 rounded-xl">
                  <Skeleton className="size-8 rounded-xl shrink-0" />
                  <div className="min-w-0 w-full space-y-1.5">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>

                <div className="p-4 bg-muted/30 border border-border/40 flex items-center gap-3.5 min-w-0 rounded-xl">
                  <Skeleton className="size-8 rounded-xl shrink-0" />
                  <div className="min-w-0 w-full space-y-1.5">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>

                <div className="p-4 bg-muted/30 border border-border/40 flex items-center gap-3.5 min-w-0 rounded-xl">
                  <Skeleton className="size-8 rounded-xl shrink-0" />
                  <div className="min-w-0 w-full space-y-1.5">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>

                <div className="p-4 bg-muted/30 border border-border/40 flex items-center gap-3.5 min-w-0 rounded-xl">
                  <Skeleton className="size-8 rounded-xl shrink-0" />
                  <div className="min-w-0 w-full space-y-1.5">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                <div className="p-4 bg-muted/30 border border-border/40 flex items-center gap-3.5 min-w-0 rounded-xl">
                  <Skeleton className="size-8 rounded-xl shrink-0" />
                  <div className="min-w-0 w-full space-y-1.5">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                <div className="p-4 bg-muted/30 border border-border/40 flex items-center gap-3.5 min-w-0 sm:col-span-2 rounded-xl">
                  <Skeleton className="size-8 rounded-xl shrink-0" />
                  <div className="min-w-0 w-full space-y-1.5">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
