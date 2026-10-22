"use client";


export default function MyPromptCardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 w-full animate-pulse">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className="bg-card border border-border/60 p-5 flex flex-col justify-between min-h-[280px] rounded-xl"
        >
          <div>
            {/* Top Meta Header Skeleton */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2.5 w-full">
                <div className="size-8 bg-muted rounded-full shrink-0" />
                <div className="space-y-1.5 w-1/2">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-3 w-12 bg-muted rounded" />
                </div>
              </div>
              <div className="h-5 w-14 bg-muted rounded-full shrink-0" />
            </div>

            {/* Description Lines Skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-4/5 bg-muted rounded" />
            </div>

            {/* Code Block Box Skeleton */}
            <div className="h-16 w-full bg-muted/40 border border-border/40 rounded-none mb-4" />

            {/* Tags Skeleton */}
            <div className="flex gap-1.5 mb-5">
              <div className="h-4 w-12 bg-muted rounded" />
              <div className="h-4 w-10 bg-muted rounded" />
              <div className="h-4 w-14 bg-muted rounded" />
            </div>
          </div>

          {/* Footer Actions Skeleton */}
          <div className="pt-4 border-t border-border flex items-center justify-between gap-4 mt-auto">
            <div className="h-4 w-16 bg-muted rounded" />
            <div className="flex items-center gap-2">
              <div className="size-8 bg-muted rounded-full" />
              <div className="size-8 bg-muted rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
