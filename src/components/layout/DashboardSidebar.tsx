"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import { UserRoleType } from "@/features/auth/auth.types";
import { dashboardNavigation } from "@/routes/navigation";
import { useAuthLogout } from "@/features/auth/hooks/useAuthLogout";

interface DashboardSidebarProps {
  role: UserRoleType;
  open: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({
  role,
  open,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const navigation = dashboardNavigation[role] || [];

  const { handleLogout, isPending } = useAuthLogout();
  

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-card text-card-foreground p-5 transition-colors duration-200">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between px-2 ">
          <Logo />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="flex flex-col gap-1 w-full">
          {navigation.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.href;
            return (
              <Button
                key={route.href}
                variant={isActive ? "secondary" : "ghost"}
                nativeButton={false}
                render={<Link href={route.href} />}
                onClick={onClose}
                className={`w-full justify-start flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "text-primary font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={18} />
                {route.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-border w-full">
        <Button
          variant="ghost"
          disabled={isPending}
          onClick={() => handleLogout(onClose)}
          className="w-full justify-start flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-destructive hover:text-destructive/90 hover:bg-destructive/10"
        >
          <LogOut size={18} />
          {isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {open && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden w-full h-full border-none p-0 cursor-default outline-none bg-transparent"
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <aside
        className={`fixed bottom-0 top-0 left-0 z-50 w-64 border-r border-border transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex fixed top-0 bottom-0 left-0 w-64 border-r border-border z-40">
        <div className="w-full h-full">{sidebarContent}</div>
      </aside>
    </>
  );
}
