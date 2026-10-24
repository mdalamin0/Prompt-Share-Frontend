import React from "react";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="fixed inset-0 z- flex items-center justify-center bg-background p-4 select-none">
      {/* Background Ambient Glow Tracer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-destructive/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative bg-card text-card-foreground border border-border/60 p-8 sm:p-10 max-w-md w-full text-center rounded-2xl shadow-xl flex flex-col items-center">
        {/* Massive 404 Visual Indicator Header Area */}
        <div className="text-6xl sm:text-7xl font-black tracking-tighter text-destructive/90 select-none animate-pulse mb-3 font-mono">
          404
        </div>

        {/* Status Headings & Code Typography */}
        <div className="space-y-2 mb-6 w-full">
          <h1 className="text-lg sm:text-xl font-black text-foreground tracking-tight">
            Execution Model Missing
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed font-medium px-2">
            The pathway or shared AI prompt repository workspace you are
            attempting to compile does not exist or has been moved to a private
            zone.
          </p>
        </div>

        {/* Pseudocode Error Terminal Box Window */}
        <div className="w-full bg-muted/40 border border-border/40 font-mono text-[11px] text-muted-foreground p-3 text-left mb-6 select-none rounded-none leading-relaxed">
          <div className="flex items-center gap-1.5 text-destructive/80 font-bold mb-1.5 border-b border-border/20 pb-1">
            <Terminal size={12} /> console.error()
          </div>
          <span className="text-foreground/70 font-semibold">&gt; STATUS:</span>{" "}
          404_NOT_FOUND <br />
          <span className="text-foreground/70 font-semibold">
            &gt; MESSAGE:
          </span>{" "}
          Request pathway unresolved. <br />
          <span className="text-foreground/70 font-semibold">
            &gt; ACTION:
          </span>{" "}
          Terminating current stack tracing.
        </div>

        {/* Global Action CTA Back Navigation Trigger */}
        <div className="w-full pt-2 border-t border-border flex flex-col gap-2">
          <Button
            variant="default"
            nativeButton={false}
            render={<Link href="/" />}
            className="h-10 w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft size={13} strokeWidth={2.5} />
            <span>Back to Home</span>
          </Button>

          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/prompts" />}
            className="h-9 w-full text-muted-foreground hover:text-foreground text-xs font-semibold"
          >
            Browse Public Prompts
          </Button>
        </div>
      </div>
    </section>
  );
}
