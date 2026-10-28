"use client";

import  { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Terminal,
  LogIn,
  Home,
  UserPlus,
  LogOut,
  LayoutDashboard,
  HelpCircle,
  MessageSquareText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../shared/Logo";
import ThemeToggle from "../shared/ThemeToggle";
import { useGetMe } from "../../features/auth/hooks/auth.hooks";
import { UserRole, UserRoleType } from "@/features/auth/auth.types";

import { useAuthLogout } from "@/features/auth/hooks/useAuthLogout";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data, isLoading } = useGetMe();

  const user = data?.data;
  const role = user?.role as UserRoleType | undefined;

  const dashboardRoute =
    role === UserRole.USER
      ? "/dashboard/user"
      : role === UserRole.ADMIN
        ? "/dashboard/admin"
        : "/";

  const baseLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore Prompts", href: "/prompts", icon: Terminal },
    {
      name: "Live Chat",
      href: "/prompts/live-chat",
      icon: MessageSquareText ,
    },
    { name: "Faq", href: "/faq", icon: HelpCircle },
  ];

  const navLinks = user
    ? [
        ...baseLinks,
        { name: "Dashboard", href: dashboardRoute, icon: LayoutDashboard },
      ]
    : baseLinks;

const { handleLogout } = useAuthLogout();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-200 text-foreground">
      <div className="container-app">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Button
                    key={link.href}
                    variant={isActive ? "secondary" : "ghost"}
                    nativeButton={false}
                    render={<Link href={link.href} />}
                    className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon size={16} />
                    {link.name}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            {isLoading ? (
              <div className="h-9 w-24 bg-muted/60 rounded-full animate-pulse" />
            ) : user ? (
              <Button
                variant="outline"
                size="default"
                onClick={() => handleLogout(() => setIsMobileMenuOpen(false))}
                className="border-border text-destructive hover:bg-destructive/10 font-medium text-sm flex items-center gap-1.5"
              >
                <LogOut size={16} />
                Logout
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="default"
                  nativeButton={false}
                  render={<Link href="/login" />}
                  className="text-foreground font-medium text-sm flex items-center gap-1.5"
                >
                  <LogIn size={16} />
                  Login
                </Button>
                <Button
                  variant="default"
                  size="default"
                  nativeButton={false}
                  render={<Link href="/register" />}
                  className="bg-primary text-primary-foreground font-medium text-sm flex items-center gap-1.5 shadow-sm shadow-primary/10"
                >
                  <UserPlus size={16} />
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 pt-2 pb-4 space-y-1 animate-in fade-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Button
                key={link.href}
                variant={isActive ? "secondary" : "ghost"}
                nativeButton={false}
                render={<Link href={link.href} />}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full justify-start flex items-center gap-2 px-4 py-3 text-base font-medium transition-all ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={18} />
                {link.name}
              </Button>
            );
          })}

          <div className="pt-4 border-t border-border mt-2">
            {isLoading ? (
              <div className="h-10 w-full bg-muted/60 rounded-full animate-pulse" />
            ) : user ? (
              <Button
                variant="outline"
                onClick={() => handleLogout(() => setIsMobileMenuOpen(false))}
                className="w-full border-border text-destructive hover:bg-destructive/10 font-medium py-2.5 flex items-center justify-center gap-1.5"
              >
                <LogOut size={18} />
                Logout
              </Button>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/login" />}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full border-border text-foreground font-medium py-2.5 flex items-center justify-center gap-1.5"
                >
                  <LogIn size={18} />
                  Login
                </Button>
                <Button
                  variant="default"
                  nativeButton={false}
                  render={<Link href="/register" />}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-primary text-primary-foreground font-medium py-2.5 flex items-center justify-center gap-1.5"
                >
                  <UserPlus size={18} />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
