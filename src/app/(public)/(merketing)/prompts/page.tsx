"use client";

import { useState } from "react";
import { Compass } from "lucide-react";
import useDebounce from "@/hooks/debounce.hook";
import { usePublicPrompts } from "@/features/prompts/hooks/prompt.hooks";
import SectionHeader from "@/components/shared/dashboard/SectionHeader";
import DataSearch from "@/components/shared/dashboard/DataSearch";
import StatusTabs from "@/components/shared/dashboard/StatusTabs";
import EmptyState from "@/components/shared/dashboard/EmptyState";
import TablePagination from "@/components/shared/dashboard/Pagination";
import PublicPromptCard from "@/features/prompts/components/PublicPromptCard";
import PublicPromptCardSkeleton from "@/features/prompts/components/PublicPromptCardSkeleton";
import PublicPromptCardError from "@/features/prompts/components/PublicPromptCardError";

const categoryTabs = [
  { value: "ALL", label: "All Hub" },
  { value: "code", label: "Code" },
  { value: "text", label: "Text" },
  { value: "image", label: "Image" },
];

export default function ExplorePromptsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);
  const [tab, setTab] = useState<"ALL" | "code" | "text" | "image">("ALL");
  const [sortBy, setSortBy] = useState<"createdAt" | "forkCount">("createdAt");

  const queryParams = {
    page,
    limit: 9,
    sortBy,
    sortOrder: "desc" as const,
    ...(tab === "ALL" ? {} : { category: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const {
    data: promptsResponse,
    isPending: promptsLoading,
    isError: promptsError,
    refetch,
  } = usePublicPrompts(queryParams);

  const prompts = promptsResponse?.data?.data ?? [];
  const meta = promptsResponse?.data?.meta ?? {
    page: 1,
    limit: 9,
    total: 0,
  };
   const start = (meta.page - 1) * meta.limit + 1;
   const end = Math.min(meta.page * meta.limit, meta.total);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setTab(value as "ALL" | "code" | "text" | "image");
    setPage(1);
  };

  return (
    <section className="page-section  w-full min-h-screen block">
      <div className="container-app ">
        <SectionHeader
          title="Explore AI Models"
          description="Discover, deploy, and fork production-ready prompt engineering templates crafted by the global engineering community."
        />

        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border/40 pb-5">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:max-w-xl">
              <DataSearch
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by title, description or tags..."
                className="w-full"
              />

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as "createdAt" | "forkCount");
                  setPage(1);
                }}
                className="h-10 w-full sm:w-44 bg-muted/40 border border-border px-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary text-foreground rounded-full"
              >
                <option value="createdAt">Latest Releases</option>
                <option value="forkCount">Most Popular (Forked)</option>
              </select>
            </div>

            <StatusTabs
              value={tab}
              onValueChange={handleCategoryChange}
              items={categoryTabs}
              className="shrink-0"
            />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {start}–{end}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {meta.total}
              </span>{" "}
              gears
            </p>
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
                description={
                  search || tab !== "ALL"
                    ? "No public prompts match your specified search keywords or filtered engine classifications."
                    : "The public prompt registry database workspace is currently empty."
                }
              />
            </div>
          ) : (
            <>
              <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full mx-auto ">
                {prompts.map((prompt) => (
                  <PublicPromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>

              {prompts.length > 0 && (
                <div className="flex justify-center pt-4">
                  <TablePagination
                    totalPages={promptsResponse?.data?.meta?.totalPages ?? 1}
                    page={page}
                    handlePageChange={setPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
