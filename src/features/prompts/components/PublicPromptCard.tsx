"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Terminal,
  FileText,
  Image as ImageIcon,
  GitFork,
  Eye,
  Copy,
  UserRound,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IPublicPrompt } from "../prompts.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useClonePrompt } from "../hooks/prompt.hooks";
import { useGetMe } from "@/features/auth/hooks/auth.hooks";
import VariableModal from "./VariableModal";

interface PublicPromptCardProps {
  prompt: IPublicPrompt;
}

export default function PublicPromptCard({ prompt }: PublicPromptCardProps) {
  const router = useRouter();
  const { data } = useGetMe();
  const { mutate: executeFork, isPending: isForkPending } = useClonePrompt();
  const user = data?.data;

  const [varModalOpen, setVarModalOpen] = useState(false);
  const [extractedVars, setExtractedVars] = useState<string[]>([]);

  const getCategoryIcon = (category: string) => {
    const lowerCategory = category ? category.toLowerCase() : "";
    if (lowerCategory === "image") return ImageIcon;
    if (lowerCategory === "text") return FileText;
    return Terminal;
  };

  const getCategoryLavel = (category: string) => {
    const lowerCategory = category ? category.toLowerCase() : "";
    if (lowerCategory === "image") return "Image";
    if (lowerCategory === "text") return "Text";
    return "Code";
  };

  const Icon = getCategoryIcon(prompt.category);
  const CLavel = getCategoryLavel(prompt.category);

  const handleTestPromptClick = () => {
    const regex = /{{(.*?)}}/g;
    const matches: string[] = [];

    const allMatches = prompt.template.matchAll(regex);

    for (const match of allMatches) {
      const variableName = match[1];
      if (variableName && !matches.includes(variableName)) {
        matches.push(variableName);
      }
    }

    if (matches.length > 0) {
      setExtractedVars(matches);
      setVarModalOpen(true);
    } else {
      router.push(
        `/prompts/live-chat?prompt=${encodeURIComponent(prompt.template)}`,
      );
    }
  };

  const handleVariableConfirm = (compiledPrompt: string) => {
    setVarModalOpen(false);
    router.push(
      `/prompts/live-chat?prompt=${encodeURIComponent(compiledPrompt)}`,
    );
  };

  const handleForkTemplate = () => {
    if (!user || !user.id) {
      toast.error("Authentication required", {
        description:
          "Please sign in to clone this prompt template into your workspace.",
      });
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "/prompts";

      router.push(`/login?next=${encodeURIComponent(currentPath)}`);
      return;
    }

    executeFork(prompt.id, {
      onSuccess: () => {
        toast.success("Prompt successfully cloned to your profile!");
      },
      onError: () => {
        toast.error("Clone Failed", {
          description:
            "Could not establish connection to the prompt cluster. Please try again.",
        });
      },
    });
  };

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(prompt.template);
      toast.success("Prompt template copied to clipboard!");
    } catch {
      toast.error("Failed to copy template. Please try again.");
    }
  };

  const isAlreadyForked = !!user?.id && prompt.isForkedByCurrentUser;

  return (
    <>
      <div className="group bg-card text-card-foreground border border-border/60 p-4 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5 shadow-sm rounded-xl w-full box-border">
        <div className="w-full min-w-0">
          <div className="flex items-center justify-between gap-3 mb-4 w-full">
            <div className="flex items-center gap-2 min-w-0">
              {prompt.user?.image ? (
                <Avatar className="size-8 border border-border shrink-0">
                  <AvatarImage
                    src={prompt.user.image}
                    alt={prompt.user.name || "User"}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-secondary text-xs font-bold text-primary">
                    {prompt.user?.name ? (
                      prompt.user.name.charAt(0).toUpperCase()
                    ) : (
                      <UserRound className="size-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="size-8 rounded-full bg-secondary border border-border text-primary flex items-center justify-center font-bold text-xs shrink-0 select-none">
                  {prompt.user?.name
                    ? prompt.user.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
              <div className="min-w-0">
                <span className="text-xs font-bold text-foreground block truncate max-w-[100px] xs:max-w-[140px] sm:max-w-xs">
                  {prompt.user?.name || "Anonymous Engr"}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium block">
                  {prompt.createdAt
                    ? new Date(prompt.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "Recent"}
                </span>
              </div>
            </div>

            <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 border border-border/20 flex items-center gap-1">
              <p className="text-[10px] font-bold uppercase tracking-wider">
                {CLavel}
              </p>
              <Icon size={12} strokeWidth={2.2} />
            </div>
          </div>

          <div className="space-y-1.5 mb-4 w-full min-w-0">
            <h3
              title={prompt.title}
              className="text-sm font-black text-foreground truncate group-hover:text-primary transition-colors"
            >
              {prompt.title}
            </h3>
            <p
              title={prompt.description}
              className="text-xs text-muted-foreground line-clamp-2 leading-relaxed break-words"
            >
              {prompt.description}
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden mb-4 border border-border/40 bg-muted/30 w-full">
            <div className="p-4 font-mono text-[11px] text-muted-foreground line-clamp-3 select-none leading-relaxed pr-10 pb-5 whitespace-pre-wrap break-all">
              {prompt.template}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleCopyTemplate}
              className="absolute top-2 right-2 size-7 text-muted-foreground hover:text-foreground border border-border/40 bg-background shadow-sm"
              aria-label="Copy prompt template"
            >
              <Copy size={12} />
            </Button>
          </div>

          {prompt.tags && prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-5 w-full">
              {prompt.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 mt-auto w-full">
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium select-none shrink-0">
            <div className="flex items-center gap-1">
              <GitFork size={13} />
              <span>{prompt.forkCount || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={13} />
              <span>{prompt.forkCount || 0}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleTestPromptClick}
              className="h-8 text-xs font-bold px-2.5 border-border bg-background hover:bg-accent text-foreground shadow-sm flex items-center gap-1 transition-transform hover:-translate-y-0.5"
            >
              <Play size={11} strokeWidth={3} className="text-primary" />
              <span>Test</span>
            </Button>

            <Button
              type="button"
              onClick={handleForkTemplate}
              disabled={isAlreadyForked || isForkPending}
              className={`h-8 text-xs font-bold px-3 shadow-sm flex items-center gap-1 transition-transform hover:-translate-y-0.5 min-w-[100px] ${
                isAlreadyForked
                  ? "bg-zinc-500/10 text-muted-foreground border border-border cursor-not-allowed shadow-none hover:translate-y-0"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              }`}
            >
              <GitFork size={12} strokeWidth={2.5} />
              <span>
                {isForkPending
                  ? "Cloning..."
                  : isAlreadyForked
                    ? "Saved"
                    : "Save Prompt"}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {varModalOpen && (
        <VariableModal
          isOpen={varModalOpen}
          onClose={() => setVarModalOpen(false)}
          templateText={prompt.template}
          variables={extractedVars}
          onConfirm={handleVariableConfirm}
        />
      )}
    </>
  );
}
