import { History, LayoutDashboard, Settings, Terminal, UserRound, Users } from "lucide-react";

export const userRoutes = [
  {
    name: "Analytics",
    href: "/dashboard/user",
    icon: LayoutDashboard,
  },
  {
    name: "My Prompts",
    href: "/dashboard/user/my-prompts",
    icon: Terminal,
  },
  {
    name: "Settings",
    href: "/dashboard/user/profile",
    icon: Settings,
  },
];
