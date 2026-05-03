"use client";

import { useMemo } from "react";
import Link from "next/link";
import { flattenCursorItems } from "@/components/ui/InfiniteCursorList";
import { useInfiniteReports } from "@/network/modules/internal/incidents/reports/queries";
import { cn } from "@/lib/utils/generics";
import { INTERNAL_DASHBOARD_ROUTES } from "@/lib/routes/internal-dashboard-routes";

export const COMMAND_STAT_KEYS = [
  "incidents",
  "projects",
  "team",
  "hotspot",
] as const;
export type CommandStatKey = (typeof COMMAND_STAT_KEYS)[number];

const STAT_LABELS: Record<
  CommandStatKey,
  { label: string; hint: string }
> = {
  incidents: {
    label: "Reports loaded",
    hint: "infinite list (first pages)",
  },
  projects: {
    label: "Needs review",
    hint: "needs_review in loaded rows",
  },
  team: {
    label: "On map",
    hint: "with coordinates in loaded rows",
  },
  hotspot: {
    label: "Latest title",
    hint: "most recent in loaded batch",
  },
};

export type CommandCenterStatsPanelProps = {
  layout: "bar" | "sidebar";
  /** Subset of stats to show (order preserved) */
  visibleKeys?: CommandStatKey[];
  className?: string;
  showWorkspaceLink?: boolean;
  /** Sidebar: optional per-row visibility editor */
  configurable?: boolean;
  onVisibleKeysChange?: (keys: CommandStatKey[]) => void;
};

const DEFAULT_VISIBLE: CommandStatKey[] = [...COMMAND_STAT_KEYS];

export function CommandCenterStatsPanel({
  layout,
  visibleKeys = DEFAULT_VISIBLE,
  className,
  showWorkspaceLink = true,
  configurable = false,
  onVisibleKeysChange,
}: CommandCenterStatsPanelProps) {
  const reportsQuery = useInfiniteReports(
    { limit: 10 },
    { enabled: true, refetchOnWindowFocus: false }
  );
  const items = useMemo(
    () => flattenCursorItems(reportsQuery.data),
    [reportsQuery.data]
  );

  const stats = useMemo(() => {
    const needsReview = items.filter((r) => r.needs_review).length;
    const onMap = items.filter(
      (r) => typeof r.latitude === "number" && typeof r.longitude === "number"
    ).length;
    const latest = items[0]?.title?.trim() || "—";
    return {
      incidents: items.length.toString(),
      projects: needsReview.toString(),
      team: onMap.toString(),
      hotspot: latest.length > 42 ? `${latest.slice(0, 40)}…` : latest,
    };
  }, [items]);

  const keys = useMemo(
    () => COMMAND_STAT_KEYS.filter((k) => visibleKeys.includes(k)),
    [visibleKeys]
  );

  const statBlocks = keys.map((key) => {
    const meta = STAT_LABELS[key];
    const value = stats[key];
    return (
      <div
        key={key}
        className={cn(
          "rounded-lg border border-captionDark/10 bg-surface-light/80 px-2.5 py-2 dark:border-captionDark-dark/15 dark:bg-surface-dark/40 md:px-3",
          layout === "sidebar" && "w-full"
        )}
      >
        <p className="text-[10px] font-medium uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
          {meta.label}
        </p>
        <p className="mt-0.5 truncate font-metropolis-semibold text-lg leading-tight text-primaryDark dark:text-primaryDark-dark">
          {value}
        </p>
        <p className="mt-0.5 truncate text-[10px] text-captionDark dark:text-captionDark-dark">
          {meta.hint}
        </p>
      </div>
    );
  });

  if (layout === "bar") {
    return (
      <div
        className={cn(
          "pointer-events-none flex justify-center px-2 pb-2 pt-1",
          className
        )}
      >
        <div className="grid w-full max-w-3xl grid-cols-2 gap-2 rounded-xl border border-captionDark/15 bg-surface-light/95 p-2.5 shadow-md backdrop-blur-md dark:border-captionDark-dark/20 dark:bg-primaryDark/85 md:grid-cols-4 md:gap-3 md:p-3">
          {statBlocks}
          {showWorkspaceLink ? (
            <div className="pointer-events-auto col-span-2 flex items-center justify-center border-t border-captionDark/10 pt-2 md:col-span-4 md:border-t-0 md:pt-0">
              <Link
                href={INTERNAL_DASHBOARD_ROUTES.workspace}
                className="text-xs font-medium text-primary-blue transition-opacity hover:opacity-85 dark:text-primary-blue-dark"
              >
                Open workspace →
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex min-w-0 flex-col gap-3", className)}>
      {statBlocks}

      {configurable && onVisibleKeysChange ? (
        <div className="rounded-lg border border-captionDark/10 bg-surface-light/60 p-2 dark:border-captionDark-dark/15 dark:bg-primaryDark/30">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
            Show rows
          </p>
          <div className="flex flex-wrap gap-1.5">
            {COMMAND_STAT_KEYS.map((key) => {
              const on = visibleKeys.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    if (on && visibleKeys.length <= 1) return;
                    const next = on
                      ? visibleKeys.filter((k) => k !== key)
                      : [...visibleKeys, key];
                    onVisibleKeysChange(next);
                  }}
                  className={cn(
                    "rounded-full px-2 py-1 text-[10px] font-medium transition-colors",
                    on
                      ? "bg-primary-blue/15 text-primary-blue dark:bg-primary-blue-dark/20 dark:text-primary-blue-dark"
                      : "bg-captionDark/10 text-captionDark hover:bg-captionDark/15 dark:bg-captionDark-dark/15 dark:text-captionDark-dark"
                  )}
                >
                  {STAT_LABELS[key].label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {showWorkspaceLink ? (
        <div className="flex justify-center border-t border-captionDark/10 pt-2 dark:border-captionDark-dark/15">
          <Link
            href={INTERNAL_DASHBOARD_ROUTES.workspace}
            className="text-xs font-medium text-primary-blue transition-opacity hover:opacity-85 dark:text-primary-blue-dark"
          >
            Open workspace →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
