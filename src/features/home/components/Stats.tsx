"use client";

import React from "react";
import { Terminal, GitFork, Users } from "lucide-react";

export default function Stats() {
  return (
    <section className="container-app max-w-6xl mx-auto py-12  relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full bg-card border border-border/60 p-6 sm:p-8 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4 p-2">
          <div className="p-3 rounded-xl bg-primary/15 text-primary border border-primary/20 shrink-0">
            <Terminal size={18} />
          </div>
          <div>
            <h4 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              142K+
            </h4>
            <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">
              Prompts Saved
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-2 border-t sm:border-t-0 sm:border-x border-border/40 sm:px-6">
          <div className="p-3 rounded-xl bg-purple-500/15 text-purple-500 border border-purple-500/20 shrink-0">
            <GitFork size={18} />
          </div>
          <div>
            <h4 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              89K+
            </h4>
            <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">
              Successful Cloned
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-2 border-t sm:border-t-0 border-border/40 sm:pl-6">
          <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-500 border border-emerald-500/20 shrink-0">
            <Users size={18} />
          </div>
          <div>
            <h4 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              24K+
            </h4>
            <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">
              Active Engineers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
