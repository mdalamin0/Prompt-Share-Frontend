"use client";

import { Sparkles, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePublicPrompts } from "@/features/prompts/hooks/prompt.hooks";
import PublicPromptCardSkeleton from "@/features/prompts/components/PublicPromptCardSkeleton";
import PublicPromptCardError from "@/features/prompts/components/PublicPromptCardError";
import EmptyState from "@/components/shared/dashboard/EmptyState";
import PublicPromptCard from "@/features/prompts/components/PublicPromptCard";

export default function FeaturedPrompts() {
  const queryParams = {
    limit: 6,
    sortBy: "forkCount", 
    sortOrder: "desc" as const,
  };

  const {
    data: promptsResponse,
    isPending: promptsLoading,
    isError: promptsError,
    refetch,
  } = usePublicPrompts(queryParams);

  const prompts = promptsResponse?.data?.data ?? [];

  return (
    <section className="w-full page-section bg-background  select-none">
      <div className="container-app ">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 w-full">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={10} className="animate-pulse" /> Curated
                Registry
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Featured Asset Workspace
            </h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-md leading-relaxed font-medium">
              Explore the platform's most forked production-grade matrices
              combined with volatile engineering assets.
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            nativeButton={false}
            render={<Link href="/prompts" />}
            className="h-9 w-fit text-xs font-bold gap-1.5 text-muted-foreground hover:text-foreground shrink-0 border border-border/40 bg-card/40 shadow-sm self-start sm:self-auto transition-transform hover:-translate-y-0.5"
          >
            <span>Browse All Prompts</span>
            <ArrowRight size={13} strokeWidth={2.5} />
          </Button>
        </div>

        {promptsLoading ? (
          <PublicPromptCardSkeleton />
        ) : promptsError ? (
          <PublicPromptCardError onRetry={() => refetch()} />
        ) : prompts.length === 0 ? (
          <div className="app-card">
            <EmptyState
              icon={Compass}
              title="Global repository template missing"
              description="The public prompt registry database workspace is currently empty."
            />
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full mx-auto">
            {prompts.map((prompt) => (
              <PublicPromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
