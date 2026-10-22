"use client";


export default function StatCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="bg-card border border-border/60 p-6 rounded-2xl min-h-36 flex flex-col justify-between animate-pulse"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="h-4 w-28 bg-muted rounded" />
            <div className="size-8 bg-muted rounded-xl" />
          </div>
          <div className="mt-4">
            <div className="h-8 w-16 bg-muted rounded" />
            <div className="h-3 w-48 bg-muted rounded mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}
