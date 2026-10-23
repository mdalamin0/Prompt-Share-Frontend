"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PromptStudioForm from "@/features/user-dashboard/components/PromptStudioForm";
import {
  useSinglePrompt,
  useUpdatePrompt,
} from "@/features/user-dashboard/hooks/user.hooks";
import MyPromptCardError from "@/features/user-dashboard/components/MyPromptCardError";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { IPromptFormData } from "@/features/user-dashboard/user.types";

export default function EditPromptPage() {
  const params = useParams();
  const router = useRouter();
  const promptId = params.id as string;

  const {
    data: promptResponse,
    isPending: isFetchPending,
    isError,
    refetch,
  } = useSinglePrompt(promptId);
  const promptData = promptResponse?.data;

  const { mutate: modifyPrompt, isPending: isUpdatePending } =
    useUpdatePrompt();

  const handleFormSubmit = (formData: IPromptFormData) => {
    modifyPrompt(
      { id: promptId, payload: formData },
      {
        onSuccess: () => {
          toast.success(
            "Prompt updated and deployed successfully!",
          );
          router.push("/dashboard/user/my-prompts");
        },
        onError: () => {
          toast.error("Update Failed", {
            description:
              "Could not sync template changes with server. Please try again.",
          });
        },
      },
    );
  };

  if (isFetchPending) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <Spinner className="w-8 h-8 text-primary" />
        <p className="text-xs text-muted-foreground font-medium animate-pulse">
          Synchronizing studio workspace data...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <section className="page-section">
        <div className="container-app max-w-4xl mx-auto px-4">
          <MyPromptCardError onRetry={() => refetch()} />
        </div>
      </section>
    );
  }

  return (
    <section className="page-section w-full min-h-screen block">
      <div className="container-app max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground mb-4">
          <Link
            href="/dashboard/user"
            className="hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link
            href="/dashboard/user/my-prompts"
            className="hover:text-foreground transition-colors"
          >
            My Prompts
          </Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-foreground font-semibold">Edit</span>
        </div>

        {/* Back Title Action Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              nativeButton={false}
              render={<Link href="/dashboard/user/my-prompts" />}
              className="size-9 border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent shrink-0 shadow-sm"
              aria-label="Back to prompts list"
            >
              <ArrowLeft size={16} />
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                Modify Prompt Workspace
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Edit and patch your production prompt model controls.
              </p>
            </div>
          </div>
        </div>

        {/* Form Integration */}
        <div className="w-full">
          <PromptStudioForm
            mode="edit"
            initialData={promptData}
            onSubmit={handleFormSubmit}
            isPending={isUpdatePending}
          />
        </div>
      </div>
    </section>
  );
}
