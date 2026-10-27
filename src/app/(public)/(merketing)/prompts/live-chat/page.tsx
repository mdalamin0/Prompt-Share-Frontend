"use client";

import { useSearchParams } from "next/navigation";
import { ArrowLeft, Terminal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import LiveChatInterface from "@/features/prompts/components/LiveChatInterface";
import Link from "next/link";
import ThemeToggle from "@/components/shared/ThemeToggle";
export default function GlobalLiveChatPage() {
  const searchParams = useSearchParams();
  const initialPromptContext = searchParams.get("prompt") || "";

  return (
    <section className="fixed inset-0 z-50 flex flex-col bg-background text-foreground select-none">
      {/* Top Floating Control Bar */}
      <header className="h-16 border-b border-border/60 bg-card/50 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="outline"
            size="icon"
           nativeButton={false}
            render={<Link href="/" />}
            className="size-9 border-border bg-background text-muted-foreground hover:text-foreground shrink-0"
          >
            <ArrowLeft size={16} />
          </Button>
          <div className="min-w-0">
            <h1 className="text-sm font-black tracking-tight flex items-center gap-1.5">
              <Sparkles size={14} className="text-primary animate-pulse" /> Global AI Sandbox
            </h1>
            <p className="text-[10px] text-muted-foreground font-medium truncate">
              {initialPromptContext ? "Executing injected prompt node ruleset." : "Standalone active runtime console."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
        <ThemeToggle/>
        <div className="hidden text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-semibold sm:flex items-center gap-1 bg-secondary px-2.5 py-1 rounded-lg border border-border/20">
          <Terminal size={12} /> Live Console
        </div>
        </div>
      </header>

      {/* Mounting Reusable Module core block */}
      <LiveChatInterface initialPromptContext={initialPromptContext} />

    </section>
  );
}
