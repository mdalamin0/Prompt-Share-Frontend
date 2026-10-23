import MyPromptCardSkeleton from "@/features/user-dashboard/components/MyPromptCardSkeleton";


const MyPromptLoadingPage = () => {
  return (
    <div className="container-app animate-pulse">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-md bg-muted/60" />
          <div className="h-4 w-80 rounded-md bg-muted/40" />
        </div>
        <div className="h-10 w-36 rounded-md bg-muted/60" />
      </div>

      <div className="mt-6 space-y-6">
        <div className="page-section flex flex-col items-center justify-between gap-4 sm:flex-row">

          <div className="h-10 w-full rounded-md bg-muted/50 sm:w-72" />

          <div className="flex gap-2">
            <div className="h-9 w-20 rounded-md bg-muted/50" />
            <div className="h-9 w-24 rounded-md bg-muted/50" />
            <div className="h-9 w-16 rounded-md bg-muted/50" />
          </div>
        </div>
        <div className="mt-8">
          <MyPromptCardSkeleton/>
         
        </div>
      </div>
    </div>
  );
};

export default MyPromptLoadingPage;
