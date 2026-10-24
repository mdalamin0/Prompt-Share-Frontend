"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-card py-6 mt-auto relative z-10">
      <div className="container-app  flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
        <p className="text-[11px] text-muted-foreground font-medium">
          &copy; 2026 PromptShare Hub. Engineered with elite performance
          standards.
        </p>
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-semibold">
          <Link
            href="/prompts"
            className="hover:text-foreground transition-colors"
          >
            Global Hub
          </Link>
          <span className="opacity-30">|</span>
          <Link
            href="/dashboard/user"
            className="hover:text-foreground transition-colors"
          >
            Workspace
          </Link>
        </div>
      </div>
    </footer>
  );
}
