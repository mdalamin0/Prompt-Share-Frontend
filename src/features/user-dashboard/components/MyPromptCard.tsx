"use client";

import React from "react";
import {
  Terminal,
  FileText,
  Image as ImageIcon,
  GitFork,
  Edit3,
  Trash2,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IPrompt } from "../user.types";

interface MyPromptCardProps {
  prompt: IPrompt;
}

export default function MyPromptCard({ prompt }: MyPromptCardProps) {
  const getCategoryIcon = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory === "image") return ImageIcon;
    if (lowerCategory === "text") return FileText;
    return Terminal;
  };

  const Icon = getCategoryIcon(prompt.category);

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(prompt.template);
      toast.success("Prompt template copied to clipboard!");
    } catch {
      toast.error("Failed to copy template. Please try again.");
    }
  };

  return (
    <div className="group bg-card text-card-foreground border border-border/60 p-6 flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5 shadow-sm rounded-xl">
      <div>
        {/* Top Meta Info */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-full bg-secondary text-primary shrink-0">
              <Icon size={14} strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                {prompt.title}
              </h3>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5 block">
                {prompt.category}
              </span>
            </div>
          </div>

          {/* Visibility Status Badge */}
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
              prompt.isPublic
                ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/25"
                : "bg-zinc-500/5 text-muted-foreground border-border"
            }`}
          >
            {prompt.isPublic ? "Public" : "Private"}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {prompt.description}
        </p>

        {/* Fixed Template Window with Permanent Copy Button */}
        <div className="relative rounded-lg overflow-hidden mb-4 border border-border/40 bg-muted/30">
          <div className="p-4 font-mono text-[11px] text-muted-foreground line-clamp-3 select-none leading-relaxed pr-12 pb-5 whitespace-pre-wrap">
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
            <Copy size={13} />
          </Button>
        </div>

        {/* Dynamic Tags Grid Area */}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-5">
            {prompt.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-0.5 bg-secondary text-secondary-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer System & CTA Management Actions */}
      <div className="pt-4 border-t border-border flex items-center justify-between gap-4 mt-auto">
        {/* Fork Stats Counter Indicator */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium select-none">
          <GitFork size={13} strokeWidth={2} />
          <span>{prompt.forkCount || 0} forks</span>
        </div>

        {/* Modify & Management Action Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-foreground hover:bg-accent"
            aria-label="Edit prompt"
          >
            <Edit3 size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            aria-label="Delete prompt"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
