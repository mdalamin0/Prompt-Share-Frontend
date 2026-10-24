import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/60 dark:bg-zinc-950/60 backdrop-blur-md select-none pointer-events-none">
      <div className="relative flex flex-col items-center p-8 text-center max-w-xs w-full">
        {/* Glow Ambient Layer behind the Spinner */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-primary/10 rounded-full blur-2xl animate-pulse" />

        {/* Central Core Premium Spinner Module */}
        <div className="relative mb-5 flex items-center justify-center">
          {/* Custom Dual-Ring Modern CSS Spinner */}
          <div className="w-10 h-10 border-[2.5px] border-muted rounded-full" />
          <div
            className="absolute top-0 w-10 h-10 border-[2.5px] border-transparent border-t-primary rounded-full animate-spin"
            style={{ animationDuration: "0.7s" }}
          />

          {/* Innermost Core Pulsing Dot */}
          <div className="absolute w-2 h-2 bg-primary rounded-full animate-ping" />
        </div>

        {/* Dynamic Animated Status Typography */}
        <h3 className="text-xs font-black text-foreground uppercase tracking-widest animate-pulse">
          Loading Workspace
        </h3>

        {/* Subtle Luxury Tech Border Tracer */}
        <p className="text-[10px] text-muted-foreground font-medium mt-1.5 opacity-70">
          Syncing execution model...
        </p>
      </div>
    </div>
  );
}
