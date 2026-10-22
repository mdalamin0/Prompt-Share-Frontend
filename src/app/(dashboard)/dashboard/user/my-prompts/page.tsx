"use client";

import { useState } from "react";
import { Plus, Terminal } from "lucide-react";
import useDebounce from "@/hooks/debounce.hook";
import { useMyPrompts } from "@/features/user-dashboard/hooks/user.hooks";
import TablePagination from "@/components/shared/dashboard/Pagination";
import SectionHeader from "@/components/shared/dashboard/SectionHeader";
import DataSearch from "@/components/shared/dashboard/DataSearch";
import StatusTabs from "@/components/shared/dashboard/StatusTabs";
import EmptyState from "@/components/shared/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import MyPromptCard from "@/features/user-dashboard/components/MyPromptCard";
import MyPromptCardSkeleton from "@/features/user-dashboard/components/MyPromptCardSkeleton";
import MyPromptCardError from "@/features/user-dashboard/components/MyPromptCardError";


const categoryTabs = [
  { value: "ALL", label: "All" },
  { value: "code", label: "Code" },
  { value: "text", label: "Text" },
  { value: "image", label: "Image" },
];

const MyPromptsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);
  const [tab, setTab] = useState<"ALL" | "code" | "text" | "image">("ALL");

  const queryParams = {
    page,
    limit: 9,
    ...(tab === "ALL" ? {} : { category: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const {
    data: promptsResponse,
    isPending: promptsLoading,
    isError: promptsError,
    refetch,
  } = useMyPrompts(queryParams);

  const prompts = promptsResponse?.data?.data ?? [];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setTab(value as "ALL" | "code" | "text" | "image");
    setPage(1);
  };

  return (
    <section className="">
      <div className="container-app">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            title="My Prompts"
            description="View, manage, and edit the AI prompt templates created by you."
          />
          <Button type="button" onClick={() => {}}>
            <Plus className=" size-4" />
            Create Prompt
          </Button>
        </div>

        <div className="mt-6 space-y-6">
          <div className="page-section flex flex-col items-center justify-between gap-4 sm:flex-row">
            <DataSearch
              value={search}
              onChange={handleSearchChange}
              placeholder="Search prompts..."
            />

            <StatusTabs
              value={tab}
              onValueChange={handleCategoryChange}
              items={categoryTabs}
            />
          </div>

          {promptsLoading ? (
            <MyPromptCardSkeleton />
          ) : promptsError ? (
            <MyPromptCardError onRetry={() => refetch()} />
          ) : prompts.length === 0 ? (
            <div className="app-card">
              <EmptyState
                icon={Terminal}
                title="No prompts found"
                description={
                  search || tab !== "ALL"
                    ? "No prompts match your current search or category filter."
                    : "You haven't created any prompt templates in your workspace yet."
                }
                actionLabel="Create Prompt"
                onAction={() => (
                  <Button type="button" onClick={() => {}}>
                    <Plus className="mr-2 size-4" />
                    Create Prompt
                  </Button>
                )}
              />
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {prompts.map((prompt) => (
                  <MyPromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>

              {prompts.length > 0 && (
                <div className="flex justify-center pt-2">
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
};

export default MyPromptsPage;
