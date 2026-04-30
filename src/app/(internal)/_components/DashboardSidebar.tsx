"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LottieLogo } from "@/components/LottieLogo";
import {
  LayoutDashboard,
  Building2,
  AlertTriangle,
  Users,
  Activity,
  Map,
  Settings,
  PanelLeftClose,
  PanelLeft,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  INTERNAL_DASHBOARD_ROUTES,
  isDashboardPathUnder,
} from "@/lib/routes/internal-dashboard-routes";
import { useUIStore } from "@/store/ui-store";
import { ConfirmLogoutModalContent } from "@/components/modals/ConfirmLogoutModalContent";

const R = INTERNAL_DASHBOARD_ROUTES;

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { href: string; label: string }[];
};

const navItems: NavItem[] = [
  {
    href: R.overview,
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: R.workspace,
    label: "Workspace",
    icon: Map,
  },
  {
    href: R.agencies.root,
    label: "Agencies",
    icon: Building2,
    children: [
      { href: R.agencies.root, label: "Agency list & branches" },
      { href: R.agencies.routingRules, label: "Routing rules" },
      { href: R.agencies.staff, label: "Staff & permissions" },
      { href: R.agencies.new, label: "Create agency" },
    ],
  },
  {
    href: R.incidents.root,
    label: "Incidents",
    icon: AlertTriangle,
    children: [
      { href: R.incidents.root, label: "All incidents" },
      { href: R.incidents.reports, label: "Reports" },
      { href: R.incidents.watchMeSos, label: "Watch Me & SOS" },
    ],
  },
  {
    href: R.users.root,
    label: "Users",
    icon: Users,
    children: [
      { href: R.users.root, label: "All users" },
      { href: R.users.segments, label: "Segments" },
    ],
  },
  {
    href: R.platform.root,
    label: "Platform",
    icon: Activity,
    children: [
      { href: R.platform.root, label: "Health & status" },
      { href: R.platform.logs, label: "Logs & diagnostics" },
    ],
  },
  {
    href: R.settings,
    label: "Settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const expanded = useUIStore((state) => state.internalSidebarExpanded);
  const setExpanded = useUIStore((state) => state.setInternalSidebarExpanded);
  const openModal = useUIStore((s) => s.openModal);

  const persist = (value: boolean) => {
    setExpanded(value);
  };

  const profile = session?.user;
  const displayName =
    (profile?.first_name || profile?.last_name
      ? `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim()
      : session?.user?.name) || profile?.email || "User";
  const subtitle = profile?.email ?? "Signed in";
  const avatarUrl = profile?.avatar_url || undefined;

  return (
    <>
      <aside
        className={cn(
          "relative flex h-full flex-col border-r border-black/40 py-4 transition-[width] duration-200 ease-in-out",
          expanded ? "w-64 items-stretch" : "w-20 items-center"
        )}
        style={{ background: "var(--sidebar-bg)" }}
      >
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

        <nav
          className={cn(
            "flex flex-1 flex-col gap-0.5 overflow-y-auto",
            expanded ? "px-2" : "items-center px-2"
          )}
          aria-label="Main"
        >
          {navItems.map(({ href, label, icon: Icon }) => {
            const isSectionActive =
              href === R.overview
                ? pathname === R.root || isDashboardPathUnder(pathname, R.overview)
                : isDashboardPathUnder(pathname, href);

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
              </div>
            );
          })}
        </nav>

        <div
          className={cn(
            "flex flex-col gap-2 border-t border-primaryDark/10 pt-4",
            expanded ? "px-2" : "items-center px-2"
          )}
        >
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
          <Link
            href={R.profile}
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-lg transition-colors hover:bg-primaryDark-dark/10",
              expanded ? "w-full px-3 py-2" : "h-10 w-10 justify-center"
            )}
            aria-label="Profile"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-blue/30 text-white ring-2 ring-primary-blue dark:ring-primary-blue-dark">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- remote avatar URLs depend on upstream config; keep simple for internal tool
                <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <User className="h-4 w-4 shrink-0" aria-hidden />
              )}
              <span
                className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success-green ring-2 ring-[var(--sidebar-bg)]"
                aria-hidden
              />
            </span>
            {expanded && (
              <div className="flex min-w-0 flex-1 flex-col items-start">
                <span className="truncate text-sm font-metropolis-semibold text-white">{displayName}</span>
                <span className="truncate text-xs font-metropolis-medium text-captionDark-dark">{subtitle}</span>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={() =>
              openModal({
                title: "Sign out?",
                size: "sm",
                content: <ConfirmLogoutModalContent />,
              })
            }
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-lg text-captionDark-dark transition-colors hover:bg-primaryDark-dark/10 hover:text-primaryDark-dark",
              expanded ? "h-10 w-full px-3" : "h-10 w-10 justify-center"
            )}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden />
            {expanded && <span className="truncate text-sm font-metropolis-medium">Sign out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
