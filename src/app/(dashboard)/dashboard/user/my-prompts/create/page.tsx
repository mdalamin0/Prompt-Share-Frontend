"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PromptStudioForm from "@/features/user-dashboard/components/PromptStudioForm";
import { useCreatePrompt } from "@/features/user-dashboard/hooks/user.hooks";
import { toast } from "sonner";
import { IPromptFormData } from "@/features/user-dashboard/user.types";

export default function CreatePromptPage() {
  const router = useRouter();
  const { mutate: deployPrompt, isPending } = useCreatePrompt();

  const handleFormSubmit = (formData: IPromptFormData) => {
    deployPrompt(formData, {
      onSuccess: () => {
        toast.success("Prompt deployed successfully to your repository!");
        router.push("/dashboard/user/my-prompts");
      },
      onError: () => {
        toast.error("Deployment Failed", {
          description:
            "Could not establish server connection. Please try again.",
        });
      },
    });
  };

  return (
    <section className="page-section w-full min-h-screen block">
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
        <span className="text-foreground font-semibold">Create</span>
      </div>
      <div className="container-app max-w-4xl mx-auto px-4 sm:px-6">
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
                Create Prompt Studio
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Build and launch a specialized AI interaction script model.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <PromptStudioForm
            mode="create"
            onSubmit={handleFormSubmit}
            isPending={isPending}
          />
        </div>
      </div>
    </section>
  );
}
