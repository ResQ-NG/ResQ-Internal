"use client";

import { cn } from "@/lib/utils";
import { severityColor } from "@/network/modules/internal/analytics/utils";

export function HeatmapMostCritical({
  groupBy,
  rows,
  maxTotal,
  limit = 3,
}: {
  groupBy: "state" | "city";
  rows: Array<{ city: string; state: string; count: number }>;
  maxTotal: number;
  limit?: number;
}) {
  if (rows.length === 0) return null;

  return (
    <div className="px-5 py-4">
      <p className="mb-2 text-[10px] font-metropolis-semibold uppercase tracking-wider text-captionDark dark:text-captionDark-dark">
        Most critical
      </p>
      {rows.slice(0, limit).map((r) => {
        const score = maxTotal > 0 ? r.count / maxTotal : 0;
        const { dot } = severityColor(score);
        return (
          <div
            key={`${r.state}-${r.city}`}
            className="mb-1.5 flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
              <span className="text-xs text-primaryDark dark:text-primaryDark-dark">
                {groupBy === "state"
                  ? r.state
                  : r.city?.trim()
                    ? r.city
                    : "Unknown"}
              </span>
            </div>
            <span className="text-xs font-metropolis-semibold tabular-nums text-primaryDark dark:text-primaryDark-dark">
              {r.count.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

