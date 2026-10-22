"use client";


export default function ActivitySkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full mt-8 animate-pulse">
      {/* Left List Skeleton Section */}
      <div className="lg:col-span-3 bg-card border border-border/60 p-6 rounded-2xl min-h-64 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-3 w-56 bg-muted rounded" />
            </div>
            <div className="h-4 w-20 bg-muted rounded" />
          </div>

          <div className="flex flex-col gap-3">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-2xl border border-border/40 bg-zinc-50/10 dark:bg-zinc-900/5"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="size-8 bg-muted rounded-2xl shrink-0" />
                  <div className="w-full space-y-2">
                    <div className="h-4 w-1/3 bg-muted rounded" />
                    <div className="h-3 w-16 bg-muted rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="h-5 w-12 bg-muted rounded-full" />
                  <div className="h-4 w-8 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Tracker Skeleton Section */}
      <div className="lg:col-span-1 flex flex-col gap-5 w-full">
        <div className="bg-card border border-border/60 p-5 rounded-2xl min-h-[140px] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-8 bg-muted rounded" />
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full" />
            <div className="h-3 w-full bg-muted rounded mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
