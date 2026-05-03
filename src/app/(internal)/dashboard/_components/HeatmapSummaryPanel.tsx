"use client";

import { cn } from "@/lib/utils/generics";
import type { IncidentsHeatMapResponse } from "@/network/modules/internal/analytics/types";
import { HeatmapSummaryRow } from "./HeatmapSummaryRow";
import { HeatmapMostCritical } from "./HeatmapMostCritical";

type HeatmapItem = IncidentsHeatMapResponse["items"][number];

type HeatmapSummaryPanelProps = {
  groupBy: "state" | "city";
  stateFilter: string;
  cityFilter: string;
  onClearFilters: () => void;
  totalAll: number;
  rowsShown: number;
  statesTracked: number;
  criticalRows: HeatmapItem[];
  maxTotal: number;
  showMostCritical: boolean;
};

export function HeatmapSummaryPanel({
  groupBy,
  stateFilter,
  cityFilter,
  onClearFilters,
  totalAll,
  rowsShown,
  statesTracked,
  criticalRows,
  maxTotal,
  showMostCritical,
}: HeatmapSummaryPanelProps) {
  const showClear =
    groupBy !== "state" || Boolean(stateFilter) || Boolean(cityFilter);

  return (
    <div className="shrink-0 border-t border-captionDark/10 dark:border-captionDark-dark/15 lg:w-56 lg:border-l lg:border-t-0">
      <div className="flex flex-col gap-0 divide-y divide-captionDark/8 dark:divide-captionDark-dark/10">
        {showClear ? (
          <div className="flex items-center justify-end px-5 py-3">
            <button
              type="button"
              onClick={onClearFilters}
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
        <HeatmapSummaryRow label="Rows shown" value={rowsShown} />
        <HeatmapSummaryRow label="States tracked" value={statesTracked} />

        {showMostCritical ? (
          <HeatmapMostCritical
            groupBy={groupBy}
            rows={criticalRows}
            maxTotal={maxTotal}
            limit={3}
          />
        ) : null}
      </div>
    </div>
  );
}
