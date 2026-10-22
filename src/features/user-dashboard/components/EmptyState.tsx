"use client";

import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No prompts found",
  description = "Your repository is currently empty. Head to My Prompts workspace to deploy a new AI template workflow.",
}: EmptyStateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-border rounded-2xl bg-zinc-50/10 dark:bg-zinc-900/5 transition-colors duration-200">
      <div className="p-3 rounded-2xl bg-secondary border border-border text-primary mb-3 shrink-0">
        <FolderOpen className="size-6" strokeWidth={1.8} />
      </div>
      <h4 className="text-sm font-bold text-foreground tracking-tight">
        {title}
      </h4>
      <p className="text-xs text-muted-foreground mt-1 max-w-sm leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
}
