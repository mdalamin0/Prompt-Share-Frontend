"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import type { UserRoleType } from "@/features/auth/auth.types";
import { useGetMe } from "@/features/auth/hooks/auth.hooks";
import AccessDenied from "./AccessDenied";
import AuthLoading from "./AuthLoading";

interface IProps {
  children: ReactNode;
  roles: UserRoleType[];
}

export default function RoleGuard({ children, roles }: IProps) {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();
  const user = data?.data;

  const isAuthorized = !!user && roles.includes(user.role);

  useEffect(() => {
    if (isPending) return;
    if (isError || !user) {
      router.replace("/login");
    }
  }, [isPending, isError, user, router]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user) {
    return <AuthLoading label="Redirecting" />;
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied role={user.role} />;
}
