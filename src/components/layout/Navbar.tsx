"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal, LayoutDashboard, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../shared/Logo";
import ThemeToggle from "../shared/ThemeToggle";


export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Explore", href: "/", icon: Terminal },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      <div className="container-app ">
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
                    className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium  transition-all ${
                      isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
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

            <Button
              variant="outline"
              size="default"
              nativeButton={false}
              render={<Link href="/login" />}
              className=" border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium text-sm flex items-center gap-1.5"
            >
              <LogIn size={16} />
              Login
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-600 dark:text-zinc-400"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-4 space-y-1 animate-in fade-in slide-in-from-top-5 duration-200">
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
                className={`w-full justify-start flex items-center gap-2 px-4 py-3 text-base font-medium  transition-all ${
                  isActive
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <Icon size={18} />
                {link.name}
              </Button>
            );
          })}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-2">
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/login" />}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full  border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium py-2.5 flex items-center justify-center gap-1.5"
            >
              <LogIn size={18} />
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
