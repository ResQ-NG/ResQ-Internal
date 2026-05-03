"use client";

import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils/generics";
import { severityColor } from "@/network/modules/internal/analytics/utils";
import type { IncidentsHeatMapResponse } from "@/network/modules/internal/analytics/types";

export type HeatmapRankedRow = IncidentsHeatMapResponse["items"][number];

type HeatmapRankedTableBodyProps = {
  sorted: HeatmapRankedRow[];
  maxTotal: number;
  groupBy: "state" | "city";
};

export function HeatmapRankedTableBody({
  sorted,
  maxTotal,
  groupBy,
}: HeatmapRankedTableBodyProps) {
  return (
    <>
      {sorted.map((row, i) => {
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
            <span className="text-[11px] font-metropolis-medium tabular-nums text-captionDark dark:text-captionDark-dark">
              {i + 1}
            </span>

            <div className="flex min-w-0 items-center gap-2">
              <span className={cn("h-2 w-2 shrink-0 rounded-full", dot)} />
              <span className="truncate text-sm font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                {groupBy === "state"
                  ? row.state
                  : row.city?.trim()
                    ? row.city
                    : "Unknown city"}
              </span>
              {isCritical ? (
                <AlertTriangle
                  className="h-3 w-3 shrink-0 text-accent-red dark:text-accent-red-dark"
                  strokeWidth={2.5}
                />
              ) : null}
            </div>

            {groupBy === "city" ? (
              <span className="truncate text-sm tabular-nums font-metropolis-medium text-captionDark dark:text-captionDark-dark">
                {row.state}
              </span>
            ) : null}

            <span className="text-right text-sm tabular-nums font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
              {row.count.toLocaleString()}
            </span>

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
      })}
    </>
  );
}
