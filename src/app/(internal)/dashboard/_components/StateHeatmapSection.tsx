"use client";

import { AlertTriangle, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppGlassSkeleton } from "@/components/ui";
import { AppError } from "@/components/ui/AppError";
import { AppEmpty } from "@/components/ui/AppEmpty";
import { useUncategorizedHeatmapDashboardState } from "../_hooks/stateHeatmapSection.hooks";
import { severityColor } from "@/network/modules/internal/analytics/utils";
import { HeatmapSummaryRow } from "./HeatmapSummaryRow";
import { HeatmapMostCritical } from "./HeatmapMostCritical";
import { HeatmapFilters } from "./HeatmapFilters";

export function StateHeatmapSection() {
  const {
    groupBy,
    setGroupBy,
    stateFilter,
    setStateFilter,
    cityFilter,
    setCityFilter,
    states,
    citiesForState,
    heatmap,
    sorted,
    maxTotal,
    totalAll,
    criticalRows,
    loading,
  } = useUncategorizedHeatmapDashboardState();

  if (loading) {
    return (
      <AppGlassSkeleton
        className="min-h-[280px]"
        caption="Loading heatmap…"
        lines={4}
        label="Loading heatmap"
      />
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border border-captionDark/15 bg-surface-light shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-captionDark/10 px-6 py-4 dark:border-captionDark-dark/15">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-blue/10 dark:bg-primary-blue-dark/15">
            <MapPin className="h-4 w-4 text-primary-blue dark:text-primary-blue-dark" />
          </div>
          <div>
            <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
              Uncategorized incidents heatmap
            </p>
            <p className="text-[11px] text-captionDark dark:text-captionDark-dark">
              Ranked hotspots for uncategorized reports · filters powered by
              recognized locations
            </p>
          </div>
        </div>

        <HeatmapFilters
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          stateFilter={stateFilter}
          setStateFilter={setStateFilter}
          cityFilter={cityFilter}
          setCityFilter={setCityFilter}
          states={states}
          citiesForState={citiesForState}
        />
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* ── Ranked table ── */}
        <div className="flex-1 overflow-hidden">
          {/* Table header */}
          <div
            className={cn(
              "items-center gap-x-3 border-b border-captionDark/8 bg-captionDark/[0.03] px-6 py-2 text-[10px] font-metropolis-semibold uppercase tracking-wider text-captionDark dark:border-captionDark-dark/10 dark:bg-captionDark-dark/[0.04] dark:text-captionDark-dark",
              groupBy === "state"
                ? "grid grid-cols-[1.5rem_1fr_5rem_10rem]"
                : "grid grid-cols-[1.5rem_1fr_1fr_5rem_10rem]"
            )}
          >
            <span>#</span>
            <span>{groupBy === "state" ? "State" : "City"}</span>
            {groupBy === "city" ? <span>State</span> : null}
            <span className="text-right">Count</span>
            <span className="pl-2">Distribution</span>
          </div>

          {/* Scrollable rows */}
          <div className="max-h-[280px] overflow-y-auto [scrollbar-width:thin]">
            {heatmap.isError ? (
              <div className="px-6 py-4">
                <AppError
                  variant="error"
                  compact
                  message="Could not load heatmap data."
                />
              </div>
            ) : sorted.length === 0 ? (
              <div className="px-6">
                <AppEmpty
                  compact
                  title="No results"
                  description="No heatmap results for the selected filters."
                />
              </div>
            ) : (
              sorted.map((row, i) => {
                const score = row.count / maxTotal;
                const {
                  bar,
                  dot,
                  label: sevLabel,
                  labelColor,
                } = severityColor(score);
                const isCritical = score >= 0.6;

                return (
                  <div
                    key={`${row.state}-${row.city}-${i}`}
                    className={cn(
                      "items-center gap-x-3 border-b border-captionDark/[0.06] px-6 py-3 transition-colors hover:bg-captionDark/[0.025] dark:border-captionDark-dark/[0.08] dark:hover:bg-captionDark-dark/[0.04] last:border-b-0",
                      groupBy === "state"
                        ? "grid grid-cols-[1.5rem_1fr_5rem_10rem]"
                        : "grid grid-cols-[1.5rem_1fr_1fr_5rem_10rem]"
                    )}
                  >
                    {/* Rank */}
                    <span className="text-[11px] font-metropolis-medium tabular-nums text-captionDark dark:text-captionDark-dark">
                      {i + 1}
                    </span>

                    {/* Name + severity */}
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={cn("h-2 w-2 shrink-0 rounded-full", dot)}
                      />
                      <span className="truncate text-sm font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                        {groupBy === "state"
                          ? row.state
                          : row.city?.trim()
                            ? row.city
                            : "Unknown city"}
                      </span>
                      {isCritical && (
                        <AlertTriangle
                          className="h-3 w-3 shrink-0 text-accent-red dark:text-accent-red-dark"
                          strokeWidth={2.5}
                        />
                      )}
                    </div>

                    {groupBy === "city" ? (
                      <span className="truncate text-sm tabular-nums font-metropolis-medium text-captionDark dark:text-captionDark-dark">
                        {row.state}
                      </span>
                    ) : null}

                    {/* Count */}
                    <span className="text-right text-sm tabular-nums font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                      {row.count.toLocaleString()}
                    </span>

                    {/* Distribution bar */}
                    <div className="flex items-center gap-2 pl-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-captionDark/10 dark:bg-captionDark-dark/15">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            bar
                          )}
                          style={{ width: `${score * 100}%` }}
                        />
                      </div>
                      <span
                        className={cn(
                          "w-12 text-right text-[10px] font-metropolis-semibold",
                          labelColor
                        )}
                      >
                        {sevLabel}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── Summary panel ── */}
        <div className="shrink-0 border-t border-captionDark/10 dark:border-captionDark-dark/15 lg:w-56 lg:border-l lg:border-t-0">
          <div className="flex flex-col gap-0 divide-y divide-captionDark/8 dark:divide-captionDark-dark/10">
            {groupBy !== "state" || !!stateFilter || !!cityFilter ? (
              <div className="flex items-center justify-end px-5 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setGroupBy("state");
                    setStateFilter("");
                    setCityFilter("");
                  }}
                  className={cn(
                    "text-[11px] font-metropolis-semibold transition-colors",
                    "text-captionDark hover:text-primary-blue dark:text-captionDark-dark dark:hover:text-primary-blue-dark"
                  )}
                >
                  Clear filters
                </button>
              </div>
            ) : null}
            <HeatmapSummaryRow
              label="Total uncategorized"
              value={totalAll}
              accent="text-primary-blue dark:text-primary-blue-dark"
            />
            <HeatmapSummaryRow label="Rows shown" value={sorted.length} />
            <HeatmapSummaryRow label="States tracked" value={states.length} />

            {/* Top state highlight */}
            {sorted[0] ? (
              <HeatmapMostCritical
                groupBy={groupBy}
                rows={criticalRows}
                maxTotal={maxTotal}
                limit={3}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
