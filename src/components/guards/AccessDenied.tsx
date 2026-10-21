import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserRoleType } from "@/features/auth/auth.types";

export default function AccessDenied({ role }: { role: UserRoleType }) {
  const dashboardRoute =
    role === "USER"
      ? "/dashboard/user"
        : role === "ADMIN"
          ? "/dashboard/admin"
          : "/";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-6 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/3 size-72 -translate-x-1/2 rounded-full bg-destructive/5 blur-3xl" />
        <div className="absolute -right-24 top-10 size-64 rounded-full bg-chart-4/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 size-64 rounded-full bg-destructive/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive sm:size-20 sm:rounded-3xl">
          <LockKeyhole className="size-7 sm:size-9" strokeWidth={1.6} />
        </div>

        <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-destructive/15 bg-destructive/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-destructive sm:mt-7 sm:text-xs">
          <ShieldAlert className="size-4" strokeWidth={2} />
          Access Restricted
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:mt-4 sm:text-4xl">
          Access denied
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-5 text-muted-foreground sm:mt-4 sm:text-base sm:leading-6">
          You don&apos;t have permission to access this workspace. Please return
          to your dashboard or sign in with an authorized account.
        </p>

        <div className="mt-5 flex flex-col justify-center gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
          <Button
            variant="outline"
            size={"lg"}
            nativeButton={false}
            render={<Link href="/" />}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Button>

          <Button
            size={"lg"}
            nativeButton={false}
            className={"sm:px-5"}
            render={<Link href={dashboardRoute} />}
          >
            Go to Your Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
