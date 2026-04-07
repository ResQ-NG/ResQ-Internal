"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LottieLogo } from "@/components/LottieLogo";
import {
  LayoutDashboard,
  Briefcase,
  Map,
  Radio,
  Settings,
  PanelLeftClose,
  PanelLeft,
  Sun,
  Moon,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

const THEME_STORAGE_KEY = "resq-theme";

type NavChild = { href: string; label: string };
type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  {
    href: "/agencies/overview",
    label: "Live reports",
    icon: LayoutDashboard,
  },
  {
    href: "/agencies/cases",
    label: "Cases",
    icon: Briefcase,
  },
  {
    href: "/agencies/map",
    label: "Map",
    icon: Map,
  },
  {
    href: "/agencies/broadcasts",
    label: "Broadcasts",
    icon: Radio,
  },
  {
    href: "/agencies/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function AgenciesSidebar() {
  const pathname = usePathname();
  const expanded = useUIStore((state) => state.agenciesSidebarExpanded);
  const setExpanded = useUIStore((state) => state.setAgenciesSidebarExpanded);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    try {
      const theme = localStorage.getItem(THEME_STORAGE_KEY);
      const isDark = theme !== "light";
      setDark(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // ignore
    }
  };

  const persist = (value: boolean) => {
    setExpanded(value);
  };

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r border-black/40 py-4 transition-[width] duration-200 ease-in-out",
        expanded ? "w-64 items-stretch" : "w-20 items-center"
      )}
      style={{ background: "var(--sidebar-bg)" }}
    >
      {/* Collapse handle */}
      <button
        type="button"
        onClick={() => persist(!expanded)}
        className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-l-md border border-black/40 border-r-0 bg-[var(--sidebar-bg)] text-captionDark-dark transition-colors hover:bg-primaryDark-dark/10 hover:text-primaryDark-dark"
        aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        title={expanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {expanded ? (
          <PanelLeftClose className="h-4 w-4 shrink-0" aria-hidden />
        ) : (
          <PanelLeft className="h-4 w-4 shrink-0" aria-hidden />
        )}
      </button>

      {/* Logo + badge */}
      <div className={cn("mb-8 flex shrink-0 flex-col gap-2", expanded ? "w-full px-3" : "items-center")}>
        <Link
          href="/agencies/overview"
          className={cn(
            "flex shrink-0 overflow-hidden rounded-lg transition-colors hover:bg-primary-blue/10",
            expanded ? "flex-row items-start gap-3" : "h-10 w-10 items-center justify-center"
          )}
          aria-label="ResQ Agencies"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center">
            <LottieLogo size="sm" />
          </span>
          {expanded && (
            <div className="flex min-w-0 flex-col gap-1">
              <span className="truncate text-sm font-metropolis-semibold text-white">ResQ</span>
              <span
                className="inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-2 py-0.5 text-[10px] font-metropolis-semibold uppercase tracking-wider text-white/90"
                aria-hidden
              >
                Agencies
              </span>
            </div>
          )}
        </Link>
        {!expanded && (
          <span
            className="mt-1 inline-flex shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 px-2 py-[2px] text-[9px] font-metropolis-semibold uppercase tracking-wider text-white/90"
            aria-hidden
          >
            Agencies
          </span>
        )}
      </div>

      {/* Nav */}
      <nav
        className={cn(
          "flex flex-1 flex-col gap-0.5 overflow-y-auto",
          expanded ? "px-2" : "items-center px-2"
        )}
        aria-label="Agencies navigation"
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-lg transition-colors",
                expanded ? "h-10 w-full px-3" : "h-10 w-10 justify-center",
                isActive
                  ? "bg-white/15 text-white"
                  : "text-captionDark-dark hover:bg-primaryDark-dark/10 hover:text-primaryDark-dark",
                isActive && expanded && "pl-5"
              )}
              aria-label={label}
              title={label}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              {expanded && (
                <span className="truncate text-sm font-metropolis-medium">
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Theme + user quick area */}
      <div
        className={cn(
          "mt-2 flex flex-col gap-2 border-t border-primaryDark/10 pt-4",
          expanded ? "px-2" : "items-center px-2"
        )}
      >
        <button
          type="button"
          onClick={toggleTheme}
          className={cn(
            "flex shrink-0 items-center gap-3 rounded-lg text-captionDark-dark transition-colors hover:bg-primaryDark-dark/10 hover:text-primaryDark-dark",
            expanded ? "h-10 w-full px-3" : "h-10 w-10 justify-center"
          )}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Light mode" : "Dark mode"}
        >
          {dark ? (
            <Sun className="h-5 w-5 shrink-0" aria-hidden />
          ) : (
            <Moon className="h-5 w-5 shrink-0" aria-hidden />
          )}
          {expanded && (
            <span className="truncate text-sm font-metropolis-medium">
              {dark ? "Light mode" : "Dark mode"}
            </span>
          )}
        </button>
        <Link
          href="/agencies/settings"
          className={cn(
            "flex shrink-0 items-center gap-3 rounded-lg text-captionDark-dark transition-colors hover:bg-primaryDark-dark/10 hover:text-primaryDark-dark",
            expanded ? "h-10 w-full px-3" : "h-10 w-10 justify-center"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          {expanded && (
            <span className="truncate text-sm font-metropolis-medium">
              Agency settings
            </span>
          )}
        </Link>
        <Link
          href="/agencies/overview"
          className={cn(
            "flex shrink-0 items-center gap-3 rounded-lg transition-colors hover:bg-primaryDark-dark/10",
            expanded ? "w-full px-3 py-2" : "h-10 w-10 justify-center"
          )}
          aria-label="Agency profile"
        >
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-blue/30 text-white ring-2 ring-primary-blue dark:ring-primary-blue-dark">
            <User className="h-4 w-4 shrink-0" aria-hidden />
          </span>
          {expanded && (
            <div className="flex min-w-0 flex-1 flex-col items-start">
              <span className="truncate text-sm font-metropolis-semibold text-white">
                Agency name
              </span>
              <span className="truncate text-xs font-metropolis-medium text-captionDark-dark">
                Ministry / department
              </span>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}

