import { LucideIcon, Plus } from "lucide-react";

import { cn } from "cn";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "empty-state flex min-h-72 flex-col items-center justify-center px-6 py-10 text-center",
        className,
      )}
    >
      {/* Icon */}
      <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/15 bg-primary/5 text-primary shadow-sm">
        <Icon className="size-6" strokeWidth={1.8} />
      </div>

      {/* Content */}
      <div className="mt-5 max-w-md">
        <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Action */}
      {actionLabel && onAction && (
        <Button type="button" onClick={onAction} className="mt-5">
          <Plus />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
