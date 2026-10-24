"use client";

import { Code2, ShieldCheck, Zap, GitFork, Terminal } from "lucide-react";

export default function Features() {
  return (
    <div className="w-full relative z-10">
      {/* Features Grid */}
      <section className="container-app max-w-6xl mx-auto py-16 border-t border-border/40">
        <div className="text-center max-w-md mx-auto mb-12">
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            Built for Professional AI Integration
          </h2>
          <p className="text-xs text-muted-foreground mt-1 font-medium">
            Everything you need to orchestrate modular generation scripts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          <div className="bg-card border border-border/60 p-6 rounded-2xl shadow-sm">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 w-fit mb-4">
              <Code2 size={16} />
            </div>
            <h3 className="text-sm font-bold text-foreground tracking-tight">
              Dynamic Variable Injector
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed font-medium">
              Wrap your prompt tokens in {"{{ role }}"} or {"{{ context }}"}.
              Our interactive studio instantly maps them for on-demand
              reusability.
            </p>
          </div>

          <div className="bg-card border border-border/60 p-6 rounded-2xl shadow-sm">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20 w-fit mb-4">
              <GitFork size={16} />
            </div>
            <h3 className="text-sm font-bold text-foreground tracking-tight">
             Save Own Profile By One-Click
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed font-medium">
              Found a masterpiece model in the public hub? Clone it instantly to
              your workspace repository with an aggregated fork system tracking.
            </p>
          </div>

          <div className="bg-card border border-border/60 p-6 rounded-2xl shadow-sm">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 w-fit mb-4">
              <ShieldCheck size={16} />
            </div>
            <h3 className="text-sm font-bold text-foreground tracking-tight">
              Granular Release Controls
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed font-medium">
              Keep your core commercial backend scripts locked down as private
              slot repository, or deploy open-source releases to the global
              feed.
            </p>
          </div>
        </div>
      </section>

      {/* Mock Code Studio Terminal Box */}
      <section className="container-app max-w-4xl mx-auto pb-24 px-4">
        <div className="bg-card border border-border p-4 sm:p-5 rounded-2xl shadow-2xl flex flex-col w-full min-w-0">
          <div className="flex items-center justify-between pb-3 border-b border-border/40 mb-4 select-none">
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-destructive/60" />
              <div className="size-2.5 rounded-full bg-amber-500/60" />
              <div className="size-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1">
              <Terminal size={11} /> promptshare-model-builder.sh
            </div>
          </div>

          <div className="font-mono text-[11px] sm:text-xs text-muted-foreground bg-muted/30 border border-border/40 p-4 rounded-xl leading-relaxed whitespace-pre-wrap break-all select-none">
            <span className="text-primary font-bold">1</span> Act as a Senior{" "}
            <span className="text-foreground font-bold bg-secondary/80 px-1.5 py-0.5 rounded border border-border/40">
              {"{ role }"}
            </span>{" "}
            Developer. <br />
            <span className="text-primary font-bold">2</span> Analyze this
            legacy{" "}
            <span className="text-foreground font-bold bg-secondary/80 px-1.5 py-0.5 rounded border border-border/40">
              {"{ framework }"}
            </span>{" "}
            codebase for N+1 queries. <br />
            <span className="text-primary font-bold">3</span> Output target
            optimization trace:{" "}
            <span className="text-purple-400">{"{ code }"}</span> --mode=strict
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-border/40">
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1">
              <Zap size={12} className="text-amber-500" /> Compiled output: 100%
              Type-Safe SaaS Script Model
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-emerald-500/5 text-emerald-500 border-emerald-500/25">
              Ready to Deploy
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
