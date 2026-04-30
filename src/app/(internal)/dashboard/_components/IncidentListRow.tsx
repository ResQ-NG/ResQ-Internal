"use client";
import { FileText, Images, MapPin, Radio, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  incidentProcessTextClass,
  type IncidentCategoryBadge,
  type SampleInboxRow,
} from "./sampleCommandData";
import { CategoryChip } from "./CategoryChip";
import { formatStatus } from "@/network/modules/internal/incidents/reports/utils";

export function IncidentListRow({
  row,
  active,
  onClick,
}: {
  row: SampleInboxRow;
  active: boolean;
  onClick: () => void;
}) {
  const isWatchMe = row.kind === "sos" || row.isWatchMe;
  const showPulse = Boolean(isWatchMe || row.requiresHumanReview);

  // Prefer rich category list; fall back to legacy single category string.
  const badges: IncidentCategoryBadge[] | null =
    row.categoryBadges && row.categoryBadges.length > 0
      ? row.categoryBadges
      : row.category
        ? [{ title: row.category, slug: row.category }]
        : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full rounded-xl border text-left transition-all duration-200",
        "px-3 py-2.5 shadow-sm",
        isWatchMe
          ? "border-accent-red/30 ring-1 ring-accent-red/10 dark:border-accent-red-dark/35 dark:ring-accent-red-dark/15"
          : "border-captionDark/15 dark:border-captionDark-dark/20",
        active
          ? "border-primary-blue/40 bg-primary-blue/[0.06] ring-2 ring-primary-blue/20 dark:border-primary-blue-dark/30 dark:bg-primary-blue-dark/5 dark:ring-primary-blue-dark/15"
          : "bg-surface-light hover:border-captionDark/25 hover:-translate-y-0.5 hover:shadow-md dark:bg-surface-dark"
      )}
      aria-pressed={active}
      aria-label={`${isWatchMe ? "SOS/Watch Me" : "Report"}: ${row.summary}`}
    >
      <div className="flex items-start gap-2.5">
        {/* Leading icon w/ pulse */}
        <div className="relative mt-0.5 shrink-0">
          {showPulse && (
            <span
              className={cn(
                "absolute inset-0 animate-ping rounded-lg",
                isWatchMe
                  ? "bg-accent-red/40 dark:bg-accent-red-dark/40"
                  : "bg-amber-500/45"
              )}
              aria-hidden
            />
          )}
          <div
            className={cn(
              "relative flex h-7 w-7 items-center justify-center rounded-lg",
              isWatchMe
                ? "bg-accent-red/12 text-accent-red dark:bg-accent-red-dark"
                : "bg-primary-blue/10 text-primary-blue dark:bg-primary-blue-dark/15 dark:text-primary-blue-dark"
            )}
          >
            {isWatchMe ? (
              <Radio className="h-3.5 w-3.5" strokeWidth={2} />
            ) : (
              <FileText className="h-3.5 w-3.5" strokeWidth={2} />
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          {/* Top row: kind + needs-review tag + time */}
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="text-[10px] font-metropolis-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                {isWatchMe ? "Watch Me / SOS" : "Report"}
              </span>
              {row.requiresHumanReview && !isWatchMe ? (
                <span className="inline-flex items-center gap-0.5 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-metropolis-semibold text-amber-800 dark:bg-amber-400/15 dark:text-amber-200">
                  <ShieldAlert className="h-3 w-3" aria-hidden />
                  Needs review
                </span>
              ) : null}
            </div>
            <span className="shrink-0 text-[10px] text-captionDark dark:text-captionDark-dark">
              {row.created}
            </span>
          </div>

          {/* Summary */}
          <p className="mt-0.5 line-clamp-2 text-xs font-metropolis-medium leading-snug text-primaryDark dark:text-primaryDark-dark">
            {row.summary}
          </p>

          {/* Categories */}
          <div className="mt-1.5 flex flex-wrap items-center gap-1">
            {badges === null ? (
              <span className="rounded bg-amber-500/12 px-1.5 py-0.5 text-[10px] font-medium text-amber-900 dark:text-amber-100">
                Uncategorized
              </span>
            ) : (
              badges.map((b) => (
                <CategoryChip key={b.slug || b.title} badge={b} />
              ))
            )}
          </div>

          {/* Stage / status / location / media */}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px]">
            {row.stageLabel ? (
              <span
                className={cn(
                  "font-medium capitalize",
                  incidentProcessTextClass(row.process)
                )}
              >
                {row.stageLabel}
              </span>
            ) : (
              <span
                className={cn(
                  "font-medium capitalize",
                  incidentProcessTextClass(row.process)
                )}
              >
                {row.process}
              </span>
            )}

            {row.statusLabel ? (
              <span className="rounded-full bg-captionDark/10 px-1.5 py-0.5 font-metropolis-semibold text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark">
                {formatStatus(row.statusLabel)}
              </span>
            ) : null}

            {row.locationLabel ? (
              <span className="inline-flex min-w-0 items-center gap-0.5 truncate text-captionDark dark:text-captionDark-dark">
                <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                <span className="truncate">{row.locationLabel}</span>
              </span>
            ) : null}

            {typeof row.evidenceUploadedCount === "number" &&
            row.evidenceUploadedCount > 0 ? (
              <span className="inline-flex items-center gap-1 rounded bg-captionDark/8 px-1.5 py-0.5 text-captionDark dark:bg-captionDark-dark/10 dark:text-captionDark-dark">
                <Images className="h-3 w-3" aria-hidden />
                {row.evidenceUploadedCount} uploaded
              </span>
            ) : null}

            {row.media && row.media.length > 0 ? (
              <span className="rounded bg-captionDark/8 px-1.5 py-0.5 text-captionDark dark:bg-captionDark-dark/10 dark:text-captionDark-dark">
                {row.media.length} media
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}
