"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MyPromptCardErrorProps {
  onRetry: () => void;
}

export default function MyPromptCardError({ onRetry }: MyPromptCardErrorProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4 text-center border border-border bg-card shadow-sm">
      <div className="p-3 rounded-full bg-destructive/10 text-destructive mb-4 shrink-0">
        <AlertCircle className="size-6" />
      </div>

      <h3 className="text-base font-bold text-foreground tracking-tight">
        Failed to load prompts
      </h3>

      <p className="text-xs text-muted-foreground mt-1.5 max-w-sm leading-relaxed font-medium">
        Something went wrong while synchronizing your prompt repository. Please
        check your connection and try again.
      </p>

      <Button
        type="button"
        variant="outline"
        onClick={onRetry}
        className="mt-5 border-border hover:bg-accent text-foreground text-xs font-semibold flex items-center gap-1.5 h-9 px-4 transition-transform hover:-translate-y-0.5"
      >
        <RefreshCw size={13} />
        Retry Connection
      </Button>
    </div>
  );
}
