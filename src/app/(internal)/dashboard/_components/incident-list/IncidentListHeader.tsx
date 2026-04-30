"use client";

import { AlertCircle, Filter, Loader2, Search } from "lucide-react";
import { AppInput } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { IncidentListFilterKind } from "./incident-list.types";

export function IncidentListHeader({
  filter,
  onFilterChange,
  query,
  onQueryChange,
  onClearQuery,
  useLiveReports,
  isFetching,
  badgeCount,
  sosCount,
  reportCount,
}: {
  filter: IncidentListFilterKind;
  onFilterChange: (f: IncidentListFilterKind) => void;
  query: string;
  onQueryChange: (v: string) => void;
  onClearQuery: () => void;
  useLiveReports: boolean;
  isFetching: boolean;
  badgeCount: number;
  sosCount: number;
  reportCount: number;
}) {
  return (
    <div className="relative shrink-0 overflow-hidden border-b border-captionDark/10 dark:border-captionDark-dark/15">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary-blue/[0.05] via-transparent to-transparent dark:from-primary-blue-dark/[0.04]" />

      <div className="relative px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-7 w-7 items-center justify-center rounded-xl bg-accent-red/12 text-accent-red dark:bg-accent-red-dark/15 dark:text-accent-red-dark">
              <AlertCircle className="h-3.5 w-3.5" strokeWidth={2.4} />
              <span
                className="absolute -inset-0.5 animate-ping rounded-xl bg-accent-red/20 dark:bg-accent-red-dark/20"
                aria-hidden
              />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
                Incidents Panel
              </p>
              <p className="text-[10px] uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                Live · staff reports + SOS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {useLiveReports && isFetching ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-captionDark/10 px-2 py-0.5 text-[10px] font-metropolis-semibold text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark">
                <Loader2 className="h-3 w-3 animate-spin" aria-hidden />
                Syncing
              </span>
            ) : null}
            <span className="rounded-full bg-accent-red/15 px-2 py-0.5 text-[11px] font-bold text-accent-red dark:bg-accent-red-dark/20 dark:text-accent-red-dark">
              {badgeCount}
            </span>
          </div>
        </div>

        <div className="mt-3">
          <AppInput
            leftIcon={<Search className="h-4 w-4" />}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search reports, SOS, category, location…"
            rightAdornment={
              query ? (
                <button
                  type="button"
                  onClick={onClearQuery}
                  className="rounded-lg px-2 py-1 text-[11px] font-metropolis-semibold text-captionDark hover:bg-captionDark/10 dark:text-captionDark-dark dark:hover:bg-captionDark-dark/10"
                >
                  Clear
                </button>
              ) : null
            }
          />
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <Filter className="h-3 w-3 shrink-0 text-captionDark dark:text-captionDark-dark" />
          {(
            [
              { id: "all", label: "All", count: sosCount + reportCount, dot: "bg-primary-blue" },
              { id: "sos", label: "SOS", count: sosCount, dot: "bg-accent-red" },
              { id: "report", label: "Reports", count: reportCount, dot: "bg-success-green" },
            ] as { id: IncidentListFilterKind; label: string; count: number; dot: string }[]
          ).map(({ id, label, count, dot }) => (
            <button
              key={id}
              type="button"
              onClick={() => onFilterChange(id)}
              className={cn(
                "group inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-metropolis-semibold transition-colors",
                filter === id
                  ? "border-primary-blue/30 bg-primary-blue/10 text-primary-blue dark:border-primary-blue-dark/20 dark:bg-primary-blue-dark/10 dark:text-primary-blue-dark"
                  : "border-transparent text-captionDark hover:border-captionDark/15 hover:bg-captionDark/8 dark:text-captionDark-dark dark:hover:border-captionDark-dark/20 dark:hover:bg-captionDark-dark/10",
              )}
              aria-pressed={filter === id}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", dot)} aria-hidden />
              {label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-[10px] font-bold",
                  filter === id
                    ? "bg-primary-blue/20 text-primary-blue dark:bg-primary-blue-dark/15 dark:text-primary-blue-dark"
                    : "bg-captionDark/10 text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark",
                )}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

