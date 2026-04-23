"use client";

import { AlertTriangle, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { SAMPLE_STATE_HEATMAP } from "./sampleCommandData";

function severityColor(score: number): { bar: string; dot: string; label: string; labelColor: string } {
  if (score >= 0.8) return { bar: "bg-accent-red dark:bg-accent-red-dark", dot: "bg-accent-red dark:bg-accent-red-dark", label: "Critical", labelColor: "text-accent-red dark:text-accent-red-dark" };
  if (score >= 0.6) return { bar: "bg-orange-500", dot: "bg-orange-500", label: "High", labelColor: "text-orange-600 dark:text-orange-400" };
  if (score >= 0.4) return { bar: "bg-amber-500", dot: "bg-amber-500", label: "Medium", labelColor: "text-amber-700 dark:text-amber-300" };
  if (score >= 0.2) return { bar: "bg-primary-blue dark:bg-primary-blue-dark", dot: "bg-primary-blue dark:bg-primary-blue-dark", label: "Low", labelColor: "text-primary-blue dark:text-primary-blue-dark" };
  return { bar: "bg-captionDark/40 dark:bg-captionDark-dark/40", dot: "bg-captionDark/40 dark:bg-captionDark-dark/40", label: "Minimal", labelColor: "text-captionDark dark:text-captionDark-dark" };
}

export function StateHeatmapSection() {
  const sorted = [...SAMPLE_STATE_HEATMAP].sort((a, b) => (b.uncategorized + b.sos) - (a.uncategorized + a.sos));
  const maxTotal = sorted[0] ? sorted[0].uncategorized + sorted[0].sos : 1;

  const totalAll = SAMPLE_STATE_HEATMAP.reduce((s, r) => s + r.uncategorized + r.sos, 0);
  const totalSos = SAMPLE_STATE_HEATMAP.reduce((s, r) => s + r.sos, 0);
  const totalReports = SAMPLE_STATE_HEATMAP.reduce((s, r) => s + r.uncategorized, 0);
  const criticalStates = sorted.filter((r) => (r.uncategorized + r.sos) / maxTotal >= 0.6);

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
              State Activity Overview
            </p>
            <p className="text-[11px] text-captionDark dark:text-captionDark-dark">
              {SAMPLE_STATE_HEATMAP.length} states tracked · unattended incidents by region
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="hidden items-center gap-4 text-[11px] text-captionDark dark:text-captionDark-dark sm:flex">
          {(["Critical", "High", "Medium", "Low"] as const).map((label) => {
            const scores = { Critical: 0.9, High: 0.7, Medium: 0.5, Low: 0.3 };
            const { dot } = severityColor(scores[label]);
            return (
              <span key={label} className="flex items-center gap-1.5">
                <span className={cn("h-2 w-2 rounded-full", dot)} />
                {label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* ── Ranked table ── */}
        <div className="flex-1 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1.5rem_1fr_3.5rem_3rem_10rem] items-center gap-x-3 border-b border-captionDark/8 bg-captionDark/[0.03] px-6 py-2 text-[10px] font-metropolis-semibold uppercase tracking-wider text-captionDark dark:border-captionDark-dark/10 dark:bg-captionDark-dark/[0.04] dark:text-captionDark-dark">
            <span>#</span>
            <span>State</span>
            <span className="text-right">Reports</span>
            <span className="text-right">SOS</span>
            <span className="pl-2">Distribution</span>
          </div>

          {/* Scrollable rows */}
          <div className="max-h-[280px] overflow-y-auto [scrollbar-width:thin]">
            {sorted.map((row, i) => {
              const total = row.uncategorized + row.sos;
              const score = total / maxTotal;
              const { bar, dot, label: sevLabel, labelColor } = severityColor(score);
              const isCritical = score >= 0.6;
              const reportPct = total > 0 ? (row.uncategorized / total) * 100 : 0;

              return (
                <div
                  key={row.state}
                  className="grid grid-cols-[1.5rem_1fr_3.5rem_3rem_10rem] items-center gap-x-3 border-b border-captionDark/[0.06] px-6 py-3 transition-colors hover:bg-captionDark/[0.025] dark:border-captionDark-dark/[0.08] dark:hover:bg-captionDark-dark/[0.04] last:border-b-0"
                >
                  {/* Rank */}
                  <span className="text-[11px] font-metropolis-medium tabular-nums text-captionDark dark:text-captionDark-dark">
                    {i + 1}
                  </span>

                  {/* State name + severity */}
                  <div className="flex min-w-0 items-center gap-2">
                    <span className={cn("h-2 w-2 shrink-0 rounded-full", dot)} />
                    <span className="truncate text-sm font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                      {row.state}
                    </span>
                    {isCritical && (
                      <AlertTriangle className="h-3 w-3 shrink-0 text-accent-red dark:text-accent-red-dark" strokeWidth={2.5} />
                    )}
                  </div>

                  {/* Reports count */}
                  <span className="text-right text-sm tabular-nums font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                    {row.uncategorized}
                  </span>

                  {/* SOS count */}
                  <span className="text-right text-sm tabular-nums font-metropolis-medium text-accent-red dark:text-accent-red-dark">
                    {row.sos}
                  </span>

                  {/* Distribution bar */}
                  <div className="flex items-center gap-2 pl-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-captionDark/10 dark:bg-captionDark-dark/15">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", bar)}
                        style={{ width: `${score * 100}%` }}
                      />
                    </div>
                    <span className={cn("w-12 text-right text-[10px] font-metropolis-semibold", labelColor)}>
                      {sevLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Summary panel ── */}
        <div className="shrink-0 border-t border-captionDark/10 dark:border-captionDark-dark/15 lg:w-56 lg:border-l lg:border-t-0">
          <div className="flex flex-col gap-0 divide-y divide-captionDark/8 dark:divide-captionDark-dark/10">
            <SummaryRow label="Total open incidents" value={totalAll} />
            <SummaryRow label="Uncategorized reports" value={totalReports} accent="text-primary-blue dark:text-primary-blue-dark" />
            <SummaryRow label="SOS / Watch Me" value={totalSos} accent="text-accent-red dark:text-accent-red-dark" />
            <SummaryRow label="States tracked" value={SAMPLE_STATE_HEATMAP.length} />

            {/* Top state highlight */}
            {sorted[0] && (
              <div className="px-5 py-4">
                <p className="mb-2 text-[10px] font-metropolis-semibold uppercase tracking-wider text-captionDark dark:text-captionDark-dark">
                  Most critical
                </p>
                {criticalStates.slice(0, 3).map((r) => {
                  const total = r.uncategorized + r.sos;
                  const score = total / maxTotal;
                  const { dot } = severityColor(score);
                  return (
                    <div key={r.state} className="mb-1.5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
                        <span className="text-xs text-primaryDark dark:text-primaryDark-dark">{r.state}</span>
                      </div>
                      <span className="text-xs font-metropolis-semibold tabular-nums text-primaryDark dark:text-primaryDark-dark">
                        {total}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3.5">
      <span className="text-xs text-captionDark dark:text-captionDark-dark">{label}</span>
      <span className={cn("text-sm font-metropolis-bold tabular-nums", accent ?? "text-primaryDark dark:text-primaryDark-dark")}>
        {value.toLocaleString()}
      </span>
    </div>
  );
}
