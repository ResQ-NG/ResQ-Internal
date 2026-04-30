"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Calendar, Bell, Zap, Sun, Moon, Wifi, WifiOff } from "lucide-react";
import { AppHeading, AppParagraph } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  INTERNAL_DASHBOARD_ROUTES,
  isDashboardOverviewBreadcrumbPath,
  isDashboardPathUnder,
  isWorkspaceBreadcrumbPath,
} from "@/lib/routes/internal-dashboard-routes";

const THEME_STORAGE_KEY = "resq-theme";

interface DashboardHeaderProps {
  title?: string;
  dateRange?: string;
  showExport?: boolean;
  className?: string;
}

export function DashboardHeader({
  title = "Command Center",
  dateRange = "Last 6 months",
  showExport = true,
  className,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const [dark, setDark] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  // Sync local dark state with document / localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      const isDark = stored !== "light";
      setDark(isDark);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sync = () => setIsOnline(navigator.onLine);
    sync();

    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
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

  const R = INTERNAL_DASHBOARD_ROUTES;

  const breadcrumb = (() => {
    if (isWorkspaceBreadcrumbPath(pathname)) {
      return "Workspace";
    }
    if (isDashboardOverviewBreadcrumbPath(pathname)) {
      return "Overview";
    }
    if (pathname.startsWith("/media/")) {
      if (pathname.startsWith("/media/overview")) return "Media / Overview";
      if (pathname.startsWith("/media/reports")) return "Media / Verified reports";
      if (pathname.startsWith("/media/broadcasts")) return "Media / Broadcasts";
      if (pathname.startsWith("/media/maps")) return "Media / Maps";
      if (pathname.startsWith("/media/teams")) return "Media / Teams";
      return "Media";
    }
    if (pathname.startsWith("/agencies/")) {
      if (pathname.startsWith("/agencies/overview")) return "Agencies / Live reports";
      if (pathname.startsWith("/agencies/cases/")) return "Agencies / Case detail";
      if (pathname.startsWith("/agencies/cases")) return "Agencies / Cases";
      if (pathname.startsWith("/agencies/map")) return "Agencies / Map";
      if (pathname.startsWith("/agencies/broadcasts")) return "Agencies / Broadcasts";
      if (pathname.startsWith("/agencies/settings")) return "Agencies / Settings";
      return "Agencies";
    }
    if (isDashboardPathUnder(pathname, R.agencies.root)) {
      return "Agencies";
    }
    if (isDashboardPathUnder(pathname, R.incidents.root)) {
      return "Incidents";
    }
    if (isDashboardPathUnder(pathname, R.users.root)) {
      return "Users";
    }
    if (isDashboardPathUnder(pathname, R.platform.root)) {
      return "Platform";
    }
    if (isDashboardPathUnder(pathname, R.settings)) {
      return "Settings";
    }
    return "Command Center";
  })();

  return (
    <header className={cn("sticky top-0 z-[9999999] px-6 pt-4", className)}>
      <div className="flex items-center justify-between rounded-2xl border border-captionDark/20 bg-gradient-hero px-5 py-3 shadow-sm backdrop-blur">
        {/* Left: breadcrumb-style context */}
        <AppParagraph variant="caption" className="text-captionDark-dark/80">
          Internal · {breadcrumb}
        </AppParagraph>

        {/* Right: quick actions */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "hidden items-center gap-2 rounded-full border bg-black/40 px-3 py-1.5 text-[11px] font-medium sm:flex",
              isOnline
                ? "border-success-green/30 text-success-green"
                : "border-amber-400/30 text-amber-200"
            )}
            aria-label={isOnline ? "Network status: online" : "Network status: offline"}
            title={isOnline ? "Online" : "Offline"}
          >
            {isOnline ? (
              <Wifi className="h-3.5 w-3.5" aria-hidden />
            ) : (
              <WifiOff className="h-3.5 w-3.5" aria-hidden />
            )}
            <span>{isOnline ? "Online" : "Offline"}</span>
          </div>
          <button
            type="button"
            className="hidden items-center gap-2 rounded-full border border-captionDark/40 bg-black/40 px-3 py-1.5 text-[11px] font-medium text-captionDark-dark hover:bg-black/60 sm:flex"
          >
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            <span>{dateRange}</span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/80 hover:bg-black"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? (
              <Sun className="h-4 w-4" aria-hidden />
            ) : (
              <Moon className="h-4 w-4" aria-hidden />
            )}
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/80 hover:bg-black"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-success-green/20 text-success-green hover:bg-success-green/30"
            aria-label="Quick action"
          >
            <Zap className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}
