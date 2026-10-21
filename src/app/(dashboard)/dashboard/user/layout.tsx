import RoleGuard from "@/components/guards/RoleGuard";
import DashboardShell from "@/components/layout/DashboardShell";
import { UserRole } from "@/features/auth/auth.types";

export const instant = false

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard roles={[UserRole.USER]}>
      <DashboardShell role={UserRole.USER}>{children}</DashboardShell>
    </RoleGuard>
  );
}
