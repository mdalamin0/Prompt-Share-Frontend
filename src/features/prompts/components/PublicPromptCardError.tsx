"use client";

import React from "react";
import { Compass, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PublicPromptCardErrorProps {
  onRetry: () => void;
}

export default function PublicPromptCardError({ onRetry }: PublicPromptCardErrorProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 px-4 text-center border border-border bg-card shadow-sm rounded-xl">
      <div className="p-3 rounded-full bg-destructive/10 text-destructive mb-4 shrink-0">
        <Compass className="size-6 animate-spin" style={{ animationDuration: '3s' }} />
      </div>
      
      <h3 className="text-base font-bold text-foreground tracking-tight">
        Failed to sync public registry
      </h3>
      
      <p className="text-xs text-muted-foreground mt-1.5 max-w-sm leading-relaxed font-medium">
        We encountered a network timeout while accessing the global AI prompt models. Please verify your connection or click retry to reload.
      </p>

      <Button
        type="button"
        onClick={onRetry}
        className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-9 px-4 flex items-center gap-1.5 shadow-sm transition-transform hover:-translate-y-0.5"
      >
        <RefreshCw size={13} />
        Retry Feed
      </Button>
    </div>
  );
}
