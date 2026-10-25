import { History, LayoutDashboard, Settings, Terminal, User, UserRound, Users } from "lucide-react";

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
    name: "Profile",
    href: "/dashboard/user/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/dashboard/user/settings",
    icon: Settings,
  },
];
