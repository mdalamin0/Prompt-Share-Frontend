import { LayoutDashboard, Settings, Users } from "lucide-react";

export const adminRoutes = [
  {
    name: "Analytics",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    name: "User Management",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/dashboard/admin/profile",
    icon: Settings,
  },
];
