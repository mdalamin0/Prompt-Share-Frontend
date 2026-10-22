"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subText: string;
  icon: LucideIcon;
  variant?: "default" | "primary" | "success";
}

export default function StatCard({
  title,
  value,
  subText,
  icon: Icon,
  variant = "default",
}: StatCardProps) {
  const glowStyles = {
    default:
      "border-b-2 border-b-purple-500/50 shadow-[0_10px_30px_-15px_rgba(168,85,247,0.15)] dark:shadow-[0_10px_40px_-15px_rgba(168,85,247,0.2)]",
    primary:
      "border-b-2 border-b-blue-500/50 shadow-[0_10px_30px_-15px_rgba(59,130,246,0.15)] dark:shadow-[0_10px_40px_-15px_rgba(59,130,246,0.2)]",
    success:
      "border-b-2 border-b-emerald-500/50 shadow-[0_10px_30px_-15px_rgba(16,185,129,0.15)] dark:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.2)]",
  };

  const iconStyles = {
    default:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    primary:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    success:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  };

  const textGradientStyles = {
    default:
      "bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 dark:from-purple-400 dark:via-purple-300 dark:to-indigo-400",
    primary:
      "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 dark:from-blue-400 dark:via-blue-300 dark:to-cyan-400",
    success:
      "bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-400",
  };

  return (
    <div
      className={`relative bg-gradient-to-b from-card to-zinc-50/30 dark:from-card dark:to-zinc-900/10 text-card-foreground border border-border/80 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between min-h-36 group hover:-translate-y-1 ${glowStyles[variant]}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/[0.01] dark:to-primary/[0.03] rounded-2xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-4">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">
          {title}
        </span>
        <div
          className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300 ${iconStyles[variant]}`}
        >
          <Icon size={16} strokeWidth={2.5} />
        </div>
      </div>

      <div className="relative z-10 mt-5">
        <h3
          className={`text-4xl font-black tracking-tight bg-clip-text text-transparent leading-none ${textGradientStyles[variant]}`}
        >
          {value}
        </h3>
        <p className="text-xs text-muted-foreground mt-2.5 font-medium tracking-wide">
          {subText}
        </p>
      </div>
    </div>
  );
}
