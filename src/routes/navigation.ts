import { UserRole } from "@/features/auth/auth.types";
import { userRoutes } from "./user.routes";
import { adminRoutes } from "./admin.routes";

export const dashboardNavigation = {
  [UserRole.USER]: userRoutes,
  [UserRole.ADMIN]: adminRoutes,
} as const;
