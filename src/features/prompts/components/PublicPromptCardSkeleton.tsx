/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";


export default function PublicPromptCardSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 w-full animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div 
          key={index} 
          className="bg-card border border-border/60 p-6 flex flex-col justify-between min-h-[290px] rounded-xl"
        >
          <div>
            {/* Top Header Panel Skeleton: Author Identity */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2.5 w-full">
                <div className="size-7 rounded-full bg-muted shrink-0" />
                <div className="space-y-1.5 w-1/3">
                  <div className="h-3 w-full bg-muted rounded" />
                  <div className="h-2 w-12 bg-muted rounded" />
                </div>
              </div>
              <div className="size-7 rounded-full bg-muted shrink-0" />
            </div>

            {/* Title & Description Skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="space-y-1.5">
                <div className="h-3 w-full bg-muted rounded" />
                <div className="h-3 w-4/5 bg-muted rounded" />
              </div>
            </div>

            {/* Template Window Skeleton */}
            <div className="h-16 w-full bg-muted/40 border border-border/40 rounded-none mb-4" />

            {/* Tags Skeleton */}
            <div className="flex gap-1.5 mb-5">
              <div className="h-4 w-12 bg-muted rounded" />
              <div className="h-4 w-14 bg-muted rounded" />
              <div className="h-4 w-10 bg-muted rounded" />
            </div>
          </div>

          {/* Footer Stats & Button Skeleton */}
          <div className="pt-4 border-t border-border flex items-center justify-between gap-4 mt-auto">
            <div className="flex items-center gap-3 shrink-0">
              <div className="h-3 w-8 bg-muted rounded" />
              <div className="h-3 w-8 bg-muted rounded" />
            </div>
            <div className="h-8 w-24 bg-muted rounded shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
}
