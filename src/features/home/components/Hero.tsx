"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="container-app max-w-5xl mx-auto pt-16 sm:pt-24 pb-12 text-center px-4 relative z-10">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-primary border border-border/40 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
        <Sparkles size={11} /> The Prompt Engineers Network
      </div>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tighter leading-[1.05] max-w-4xl mx-auto">
        Deploy, Share and Fork <br />
        <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
          Production AI Prompts.
        </span>
      </h1>

      <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed font-medium">
        Stop copying prompts from random text files. Standardize your prompt
        repository, build dynamic variable injections, and sync templates with
        developers worldwide.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 w-full max-w-xs sm:max-w-none mx-auto">
        <Button
          variant="default"
          nativeButton={false}
          render={<Link href="/dashboard/user/my-prompts/create" />}
          className="h-11 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold px-6 flex items-center justify-center gap-1.5 shadow-lg shadow-primary/10 transition-transform hover:-translate-y-0.5"
        >
          <span>Launch Studio Workspace</span>
          <ArrowRight size={13} strokeWidth={2.5} />
        </Button>

        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/prompts" />}
          className="h-11 w-full sm:w-auto border border-border/60 text-foreground text-xs font-semibold px-6 hover:bg-accent"
        >
          Browse Public Registry
        </Button>
      </div>
    </section>
  );
}
