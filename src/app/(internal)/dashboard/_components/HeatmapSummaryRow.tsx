"use client";

import { cn } from "@/lib/utils";

export function HeatmapSummaryRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3.5">
      <span className="text-xs text-captionDark dark:text-captionDark-dark">
        {label}
      </span>
      <span
        className={cn(
          "text-sm font-metropolis-bold tabular-nums",
          accent ?? "text-primaryDark dark:text-primaryDark-dark"
        )}
      >
        {value.toLocaleString()}
      </span>
    </div>
  );
}

