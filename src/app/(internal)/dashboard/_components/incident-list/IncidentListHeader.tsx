"use client";

import { useEffect, useId, useState } from "react";
import { AlertCircle, ChevronDown, Filter, Loader2, Search, SlidersHorizontal } from "lucide-react";
import { AppInput } from "@/components/ui";
import { INBOX_LIST_FILTER } from "@/lib/constants/incident-inbox";
import { cn } from "@/lib/utils/generics";
import type { IncidentListAdvancedFilters, IncidentListFilterKind } from "./incident-list.types";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-metropolis-semibold uppercase tracking-wider text-captionDark dark:text-captionDark-dark">
        {label}
      </p>
      {children}
    </div>
  );
}

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
  advancedFilters,
  onAdvancedPatch,
  onResetAdvanced,
  activeAdvancedCount,
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
  advancedFilters: IncidentListAdvancedFilters;
  onAdvancedPatch: (patch: Partial<IncidentListAdvancedFilters>) => void;
  onResetAdvanced: () => void;
  activeAdvancedCount: number;
}) {
  const panelId = useId();
  const [deepOpen, setDeepOpen] = useState(false);

  useEffect(() => {
    if (!deepOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDeepOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deepOpen]);

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
                Live · staff reports
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

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <div className="min-w-0 flex-1">
            <AppInput
              leftIcon={<Search className="h-4 w-4" />}
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search reports, category, location…"
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

          {useLiveReports ? (
            <button
              type="button"
              id={`${panelId}-trigger`}
              aria-expanded={deepOpen}
              aria-controls={`${panelId}-panel`}
              onClick={() => setDeepOpen((v) => !v)}
              className={cn(
                "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-[12px] font-metropolis-semibold transition-colors sm:w-[8.5rem]",
                deepOpen || activeAdvancedCount > 0
                  ? "border-primary-blue/35 bg-primary-blue/[0.08] text-primary-blue dark:border-primary-blue-dark/30 dark:bg-primary-blue-dark/10 dark:text-primary-blue-dark"
                  : "border-captionDark/15 text-captionDark hover:border-captionDark/25 hover:bg-captionDark/[0.06] dark:border-captionDark-dark/20 dark:text-captionDark-dark dark:hover:border-captionDark-dark/30 dark:hover:bg-captionDark-dark/[0.07]",
              )}
            >
              <SlidersHorizontal className="h-4 w-4 shrink-0" aria-hidden />
              <span className="min-w-0 truncate">Deep search</span>
              {activeAdvancedCount > 0 ? (
                <span className="ml-0.5 inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-primary-blue/15 px-1 text-[10px] font-bold text-primary-blue dark:bg-primary-blue-dark/20 dark:text-primary-blue-dark">
                  {activeAdvancedCount}
                </span>
              ) : null}
              <ChevronDown
                className={cn("h-4 w-4 shrink-0 transition-transform", deepOpen ? "rotate-180" : "")}
                aria-hidden
              />
            </button>
          ) : null}
        </div>

        {useLiveReports ? (
          <div
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
              deepOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                id={`${panelId}-panel`}
                role="region"
                aria-labelledby={`${panelId}-trigger`}
                className="mt-3 rounded-2xl border border-captionDark/12 bg-gradient-to-br from-surface-light/95 via-surface-light/80 to-primary-blue/[0.04] p-3 shadow-sm ring-1 ring-black/[0.03] dark:border-captionDark-dark/18 dark:from-surface-dark/95 dark:via-surface-dark/80 dark:to-primary-blue-dark/[0.05] dark:ring-white/[0.04]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-captionDark/10 pb-2.5 dark:border-captionDark-dark/15">
                  <p className="text-[11px] leading-snug text-captionDark dark:text-captionDark-dark">
                    Refine the staff reports feed — same fields the API accepts (country, region,
                    dates…).
                  </p>
                  {activeAdvancedCount > 0 ? (
                    <button
                      type="button"
                      onClick={onResetAdvanced}
                      className="shrink-0 rounded-lg px-2 py-1 text-[11px] font-metropolis-semibold text-captionDark underline decoration-captionDark/35 underline-offset-2 hover:text-primaryDark dark:text-captionDark-dark dark:hover:text-primaryDark-dark"
                    >
                      Reset filters
                    </button>
                  ) : null}
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Field label="Country">
                    <AppInput
                      value={advancedFilters.country}
                      onChange={(e) => onAdvancedPatch({ country: e.target.value })}
                      placeholder="e.g. Nigeria"
                      aria-label="Country"
                    />
                  </Field>
                  <Field label="State / region">
                    <AppInput
                      value={advancedFilters.state}
                      onChange={(e) => onAdvancedPatch({ state: e.target.value })}
                      placeholder="e.g. Lagos"
                      aria-label="State or region"
                    />
                  </Field>
                  <Field label="City">
                    <AppInput
                      value={advancedFilters.city}
                      onChange={(e) => onAdvancedPatch({ city: e.target.value })}
                      placeholder="e.g. Ikeja"
                      aria-label="City"
                    />
                  </Field>
                  <Field label="Reporter name">
                    <AppInput
                      value={advancedFilters.reporter_name}
                      onChange={(e) => onAdvancedPatch({ reporter_name: e.target.value })}
                      placeholder="Partial match"
                      aria-label="Reporter name"
                    />
                  </Field>
                  <Field label="Created from">
                    <AppInput
                      type="date"
                      value={advancedFilters.created_from}
                      onChange={(e) => onAdvancedPatch({ created_from: e.target.value })}
                      aria-label="Created from date"
                    />
                  </Field>
                  <Field label="Created to">
                    <AppInput
                      type="date"
                      value={advancedFilters.created_to}
                      onChange={(e) => onAdvancedPatch({ created_to: e.target.value })}
                      aria-label="Created to date"
                    />
                  </Field>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-3 flex items-center gap-1.5">
          <Filter className="h-3 w-3 shrink-0 text-captionDark dark:text-captionDark-dark" />
          {(
            useLiveReports
              ? ([
                  {
                    id: INBOX_LIST_FILTER.REPORT,
                    label: "Reports",
                    count: reportCount,
                    dot: "bg-success-green",
                  },
                ] as { id: IncidentListFilterKind; label: string; count: number; dot: string }[])
              : ([
                  {
                    id: INBOX_LIST_FILTER.ALL,
                    label: "All",
                    count: sosCount + reportCount,
                    dot: "bg-primary-blue",
                  },
                  {
                    id: INBOX_LIST_FILTER.SOS,
                    label: "SOS",
                    count: sosCount,
                    dot: "bg-accent-red",
                  },
                  {
                    id: INBOX_LIST_FILTER.REPORT,
                    label: "Reports",
                    count: reportCount,
                    dot: "bg-success-green",
                  },
                ] as { id: IncidentListFilterKind; label: string; count: number; dot: string }[])
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
