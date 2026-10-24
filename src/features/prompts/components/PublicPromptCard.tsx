"use client";

import React from "react";
import {
  Terminal,
  FileText,
  Image as ImageIcon,
  GitFork,
  Eye,
  Copy,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IPublicPrompt } from "../prompts.types";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PublicPromptCardProps {
  prompt: IPublicPrompt;
}

export default function PublicPromptCard({ prompt }: PublicPromptCardProps) {
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

  const handleForkTemplate = async () => {
    try {
      toast.success("Prompt successfully cloned to your repository workspace!");
    } catch {
      toast.error("Failed to fork template. Please try again.");
    }
  };

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
        {/* Top Header Panel: Author Identity & Category Icon */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            {prompt.user?.image ? (
             
              <Avatar className="size-8 border border-border">
                <AvatarImage
                  src={prompt.user.image}
                  alt={prompt.user.name || "User"}
                  className="object-cover"
                />
                <AvatarFallback className="bg-secondary text-xs font-bold text-primary">
                  {prompt.user?.name
                  ? prompt.user.name.charAt(0).toUpperCase()
                  :  <UserRound className="size-4" />}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="size-7 rounded-full bg-secondary border border-border text-primary flex items-center justify-center font-bold text-xs shrink-0 select-none">
                {prompt.user?.name
                  ? prompt.user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
            )}
            <div className="min-w-0">
              <span className="text-xs font-bold text-foreground block truncate max-w-[120px] sm:max-w-xs">
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

          <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary shrink-0 border border-border/20 flex items-center gap-1">
            <p className="text-xs">{CLavel}</p>
            <Icon size={13} strokeWidth={2.2} />
          </div>
        </div>

        {/* Prompt Title & Description */}
        <div className="space-y-1.5 mb-4">
          <h3 className="text-sm font-black text-foreground truncate group-hover:text-primary transition-colors">
            {prompt.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {prompt.description}
          </p>
        </div>

        {/* Template Code Script Window Container */}
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

        {/* Dynamic Tag Clouds badges */}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-5">
            {prompt.tags.map((tag: string) => (
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

      {/* Footer System Controls & Interactive Fork Action Button */}
      <div className="pt-4 border-t border-border flex items-center justify-between gap-4 mt-auto">
        {/* Engagement Stats indicators */}
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

        <Button
          type="button"
          onClick={handleForkTemplate}
          className="h-8 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold px-3 shadow-sm flex items-center gap-1 transition-transform hover:-translate-y-0.5"
        >
          <GitFork size={12} strokeWidth={2.5} />
          <span>Save Prompt</span>
        </Button>
      </div>
    </div>
  );
}
