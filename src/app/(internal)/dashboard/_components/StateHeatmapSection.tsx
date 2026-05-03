"use client";

import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils/generics";
import { AppGlassSkeleton } from "@/components/ui";
import { AppError } from "@/components/ui/AppError";
import { AppEmpty } from "@/components/ui/AppEmpty";
import { useUncategorizedHeatmapDashboardState } from "../_hooks/stateHeatmapSection.hooks";
import { HeatmapFilters } from "./HeatmapFilters";
import { HeatmapRankedTableBody } from "./HeatmapRankedTableBody";
import { HeatmapSummaryPanel } from "./HeatmapSummaryPanel";

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
              <HeatmapRankedTableBody
                sorted={sorted}
                maxTotal={maxTotal}
                groupBy={groupBy}
              />
            )}
          </div>
        </div>

        <HeatmapSummaryPanel
          groupBy={groupBy}
          stateFilter={stateFilter}
          cityFilter={cityFilter}
          onClearFilters={() => {
            setGroupBy("state");
            setStateFilter("");
            setCityFilter("");
          }}
          totalAll={totalAll}
          rowsShown={sorted.length}
          statesTracked={states.length}
          criticalRows={criticalRows}
          maxTotal={maxTotal}
          showMostCritical={Boolean(sorted[0])}
        />
      </div>
    </section>
  );
}
