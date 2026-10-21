"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import type { UserRoleType } from "@/features/auth/auth.types";
import { useGetMe } from "@/features/auth/hooks/auth.hooks";
import AccessDenied from "./AccessDenied";
import AuthLoading from "./AuthLoading";

interface PageGuardProps {
  children: ReactNode;
  role: UserRoleType;
}

export default function PageGuard({ children, role }: PageGuardProps) {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();
  const user = data?.data;

  useEffect(() => {
    if (isPending) return;

    if (isError || !user) {
      router.replace("/login");
      return;
    }

    if (user.role !== role) {
      router.replace("/login");
    }
  }, [isPending, isError, user, role, router]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user) {
    return <AuthLoading label="Redirecting" />;
  }

  if (user && user.role === role) {
    return <>{children}</>;
  }

  return <AccessDenied role={user?.role} />;
}
