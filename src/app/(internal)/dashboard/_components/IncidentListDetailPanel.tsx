"use client";

import { useMemo, useState } from "react";
import { AlertCircle, FileText, Filter, Radio } from "lucide-react";
import { AppLink } from "@/components/ui";
import { cn } from "@/lib/utils";
import { incidentProcessTextClass, sampleUnattendedRows, type SampleInboxRow } from "./sampleCommandData";

type FilterKind = "all" | "sos" | "report";

type IncidentListDetailPanelProps = {
  /** ID of the incident selected (highlights row + triggers right-side detail card in parent). */
  selectedId?: string | null;
  onSelectId?: (id: string | null) => void;
};

export function IncidentListDetailPanel({
  selectedId,
  onSelectId,
}: IncidentListDetailPanelProps) {
  const [filter, setFilter] = useState<FilterKind>("all");

  const rows = useMemo(() => {
    const all = sampleUnattendedRows();
    if (filter === "sos") return all.filter((r) => r.kind === "sos");
    if (filter === "report") return all.filter((r) => r.kind === "report");
    return all;
  }, [filter]);

  const sosCount = sampleUnattendedRows().filter((r) => r.kind === "sos").length;
  const reportCount = sampleUnattendedRows().filter((r) => r.kind === "report").length;

  return (
    <div className="flex h-full min-h-0 flex-col bg-surface-light dark:bg-surface-dark">
      {/* Panel header */}
      <div className="shrink-0 border-b border-captionDark/10 dark:border-captionDark-dark/15 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-accent-red dark:text-accent-red-dark" strokeWidth={2.25} />
            <span className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
              Needs attention
            </span>
          </div>
          <span className="rounded-full bg-accent-red/15 px-2 py-0.5 text-[11px] font-bold text-accent-red dark:bg-accent-red-dark/20 dark:text-accent-red-dark">
            {rows.length}
          </span>
        </div>

        {/* Filter tabs */}
        <div className="mt-3 flex items-center gap-1.5">
          <Filter className="h-3 w-3 shrink-0 text-captionDark dark:text-captionDark-dark" />
          {(
            [
              { id: "all", label: `All (${sosCount + reportCount})` },
              { id: "sos", label: `SOS (${sosCount})` },
              { id: "report", label: `Reports (${reportCount})` },
            ] as { id: FilterKind; label: string }[]
          ).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-metropolis-medium transition-colors",
                filter === id
                  ? "bg-primary-blue/15 text-primary-blue dark:bg-primary-blue-dark/20 dark:text-primary-blue-dark"
                  : "text-captionDark hover:bg-captionDark/10 dark:text-captionDark-dark dark:hover:bg-captionDark-dark/15",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable list */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-3 gap-2">
        {rows.length === 0 ? (
          <p className="py-8 text-center text-sm text-captionDark dark:text-captionDark-dark">All clear.</p>
        ) : (
          rows.map((row, index) => (
            <IncidentListRow
              key={row.id}
              row={row}
              index={index}
              active={selectedId === row.id}
              onClick={() => onSelectId?.(selectedId === row.id ? null : row.id)}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-captionDark/10 dark:border-captionDark-dark/15 px-4 py-2.5 flex justify-center">
        <AppLink href="/dashboard/incidents/watch-me-sos" variant="muted" className="text-xs">
          Open full incident queue →
        </AppLink>
      </div>
    </div>
  );
}

// ─── List row ─────────────────────────────────────────────────────────────────

function IncidentListRow({
  row,
  index,
  active,
  onClick,
}: {
  row: SampleInboxRow;
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const isWatchMe = row.kind === "sos" || row.isWatchMe;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ animationDelay: `${index * 60}ms` }}
      className={cn(
        "animate-inbox-card-enter w-full rounded-xl border text-left transition-all duration-200",
        "px-3 py-2.5 shadow-sm",
        isWatchMe
          ? "border-accent-red/30 ring-1 ring-accent-red/10 dark:border-accent-red-dark/35 dark:ring-accent-red-dark/15"
          : "border-captionDark/15 dark:border-captionDark-dark/20",
        active
          ? "border-primary-blue/40 bg-primary-blue/[0.06] ring-2 ring-primary-blue/20 dark:border-primary-blue-dark/45 dark:bg-primary-blue-dark/10"
          : "bg-surface-light hover:border-captionDark/25 hover:-translate-y-0.5 hover:shadow-md dark:bg-surface-dark",
      )}
      aria-pressed={active}
      aria-label={`${isWatchMe ? "SOS/Watch Me" : "Report"}: ${row.summary}`}
    >
      <div className="flex items-start gap-2.5">
        {/* Icon + pulsing ring for SOS */}
        <div className="relative mt-0.5 shrink-0">
          {isWatchMe && (
            <span className="absolute inset-0 animate-ping rounded-full bg-accent-red/40 dark:bg-accent-red-dark/40" />
          )}
          <div
            className={cn(
              "relative flex h-7 w-7 items-center justify-center rounded-lg",
              isWatchMe
                ? "bg-accent-red/12 text-accent-red dark:text-accent-red-dark"
                : "bg-primary-blue/10 text-primary-blue dark:text-primary-blue-dark",
            )}
          >
            {isWatchMe ? <Radio className="h-3.5 w-3.5" strokeWidth={2} /> : <FileText className="h-3.5 w-3.5" strokeWidth={2} />}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-metropolis-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              {isWatchMe ? "Watch Me / SOS" : "Report"}
            </span>
            <span className="shrink-0 text-[10px] text-captionDark dark:text-captionDark-dark">{row.created}</span>
          </div>
          <p className="mt-0.5 line-clamp-2 text-xs font-metropolis-medium leading-snug text-primaryDark dark:text-primaryDark-dark">
            {row.summary}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {row.category === null ? (
              <span className="rounded bg-amber-500/12 px-1.5 py-0.5 text-[10px] font-medium text-amber-900 dark:text-amber-100">
                Uncategorized
              </span>
            ) : (
              <span className="rounded bg-captionDark/10 px-1.5 py-0.5 text-[10px] text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark">
                {row.category}
              </span>
            )}
            <span className={cn("text-[10px] font-medium capitalize", incidentProcessTextClass(row.process))}>
              {row.process}
            </span>
            {row.media && row.media.length > 0 && (
              <span className="rounded bg-captionDark/8 px-1.5 py-0.5 text-[10px] text-captionDark dark:bg-captionDark-dark/10 dark:text-captionDark-dark">
                {row.media.length} media
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
