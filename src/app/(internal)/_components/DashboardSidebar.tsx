"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LottieLogo } from "@/components/LottieLogo";
import {
  LayoutDashboard,
  Building2,
  AlertTriangle,
  Users,
  Activity,
  Settings,
  PanelLeftClose,
  PanelLeft,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_STORAGE_KEY = "resq-sidebar-expanded";
const THEME_STORAGE_KEY = "resq-theme";

type NavChild = { href: string; label: string };
type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavChild[];
};

// High-level IA + focused sub-nav where it helps
const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Command Center",
    icon: LayoutDashboard,
    children: [
      { href: "/dashboard", label: "Overview" },
      { href: "/dashboard/live-incidents", label: "Live incidents & floating" },
    ],
  },
  {
    href: "/dashboard/agencies",
    label: "Agencies",
    icon: Building2,
    children: [
      { href: "/dashboard/agencies", label: "Agency list & branches" },
      { href: "/dashboard/agencies/routing-rules", label: "Routing rules" },
      { href: "/dashboard/agencies/staff", label: "Staff & permissions" },
      { href: "/dashboard/agencies/new", label: "Create agency" },
    ],
  },
  {
    href: "/dashboard/incidents",
    label: "Incidents",
    icon: AlertTriangle,
    children: [
      { href: "/dashboard/incidents", label: "All incidents" },
      { href: "/dashboard/incidents/reports", label: "Reports" },
      { href: "/dashboard/incidents/watch-me-sos", label: "Watch Me & SOS" },
    ],
  },
  {
    href: "/dashboard/users",
    label: "Users",
    icon: Users,
    children: [
      { href: "/dashboard/users", label: "All users" },
      { href: "/dashboard/users/segments", label: "Segments" },
    ],
  },
  {
    href: "/dashboard/platform",
    label: "Platform",
    icon: Activity,
    children: [
      { href: "/dashboard/platform", label: "Health & status" },
      { href: "/dashboard/platform/logs", label: "Logs & diagnostics" },
    ],
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      if (stored !== null) setExpanded(JSON.parse(stored));
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
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(value));
    } catch {
      // ignore
    }
  };

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r border-black/40 py-4 transition-[width] duration-200 ease-in-out",
        expanded ? "w-64 items-stretch" : "w-20 items-center"
      )}
      style={{ background: "var(--sidebar-bg)" }}
    >
      {/* Collapse – absolute center of bar, on the right edge */}
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

      {/* ResQ Logo + Internal badge under ResQ text */}
      <div className={cn("mb-8 flex shrink-0 flex-col gap-2", expanded ? "w-full px-3" : "items-center")}>
        <Link
          href="/"
          className={cn(
            "flex shrink-0 overflow-hidden rounded-lg transition-colors hover:bg-primary-blue/10",
            expanded ? "flex-row items-start gap-3" : "h-10 w-10 items-center justify-center"
          )}
          aria-label="ResQ Home"
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
                Internal
              </span>
            </div>
          )}
        </Link>
        {!expanded && (
          <span
            className="mt-1 inline-flex shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 px-2 py-[2px] text-[9px] font-metropolis-semibold uppercase tracking-wider text-white/90"
            aria-hidden
          >
            INT
          </span>
        )}
      </div>

      {/* Nav */}
      <nav
        className={cn(
          "flex flex-1 flex-col gap-0.5 overflow-y-auto",
          expanded ? "px-2" : "items-center px-2"
        )}
        aria-label="Main"
      >
        {navItems.map(({ href, label, icon: Icon, children }) => {
          const isSectionActive =
            pathname === href || pathname.startsWith(href + "/");
          const hasChildren = !!children && children.length > 0;

          return (
            <div key={href} className="flex flex-col gap-0.5">
              <Link
                href={href}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-lg transition-colors",
                  expanded ? "h-10 w-full px-3" : "h-10 w-10 justify-center",
                  isSectionActive
                    ? "bg-white/15 text-white"
                    : "text-captionDark-dark hover:bg-primaryDark-dark/10 hover:text-primaryDark-dark",
                  isSectionActive && expanded && "pl-5"
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

              {expanded && hasChildren && isSectionActive && (
                <div className="ml-6 flex flex-col border-l border-primaryDark-dark/20 py-1 pl-3">
                  {children!.map((child) => {
                    const isChildActive =
                      pathname === child.href ||
                      pathname.startsWith(child.href + "/");
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex h-8 items-center rounded-md px-2 text-xs transition-colors",
                          isChildActive
                            ? "bg-white/15 font-metropolis-medium text-white"
                            : "text-captionDark-dark hover:bg-primaryDark-dark/10 hover:text-primaryDark-dark"
                        )}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Expand/collapse + user */}
      <div
        className={cn(
          "flex flex-col gap-2 border-t border-primaryDark/10 pt-4",
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
        <button
          type="button"
          className={cn(
            "flex shrink-0 items-center gap-3 rounded-lg text-captionDark-dark transition-colors hover:bg-primaryDark-dark/10 hover:text-primaryDark-dark",
            expanded ? "h-10 w-full px-3" : "h-10 w-10 justify-center"
          )}
          aria-label="Settings"
        >
          <Settings className="h-4 w-4 shrink-0" />
          {expanded && (
            <span className="truncate text-sm font-metropolis-medium">Settings</span>
          )}
        </button>
        {/* Profile card: image, name, role */}
        <Link
          href="/dashboard/profile"
          className={cn(
            "flex shrink-0 items-center gap-3 rounded-lg transition-colors hover:bg-primaryDark-dark/10",
            expanded ? "w-full px-3 py-2" : "h-10 w-10 justify-center"
          )}
          aria-label="Profile"
        >
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-blue/30 text-white ring-2 ring-primary-blue dark:ring-primary-blue-dark">
            <User className="h-4 w-4 shrink-0" aria-hidden />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success-green" aria-hidden />
          </span>
          {expanded && (
            <div className="flex min-w-0 flex-1 flex-col items-start">
              <span className="truncate text-sm font-metropolis-semibold text-white">User Name</span>
              <span className="truncate text-xs font-metropolis-medium text-captionDark-dark">Team Lead</span>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
