"use client";

import { AlertTriangle, ShieldCheck, UserX } from "lucide-react";
import { cn } from "@/lib/utils/generics";
import {
  humanizeReportEventType,
  humanizeReportStatus,
} from "@/network/modules/internal/incidents/reports/utils";
import type { ReportDetailDTO } from "@/network/modules/internal/incidents/reports/types";
import { CategoryChip } from "../CategoryChip";
import {
  incidentProcessTextClass,
  type IncidentCategoryBadge,
  type SampleInboxRow,
} from "../sampleCommandData";

export function IncidentDetailHero({
  row,
  detail,
}: {
  row: SampleInboxRow;
  detail?: ReportDetailDTO | null;
}) {
  const title = detail?.title?.trim() || row.summary;
  const summary = detail?.summary?.trim();
  const statusLabel = detail?.status
    ? humanizeReportStatus(detail.status)
    : row.statusLabel
      ? humanizeReportStatus(row.statusLabel)
      : null;
  const stageLabel =
    row.stageLabel ||
    (detail?.processing?.stage
      ? humanizeReportEventType(detail.processing.stage)
      : null);

  const requiresHumanReview =
    Boolean(row.requiresHumanReview) ||
    Boolean(detail?.probabilistic_validation?.requires_human_review);
  const isAnonymous = Boolean(detail?.is_anonymous);

  const categoryBadges = buildCategoryBadges(row, detail);

  return (
    <div className="rounded-xl border border-captionDark/15 bg-surface-light p-4 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
      <p className="text-sm font-metropolis-semibold leading-snug text-primaryDark dark:text-primaryDark-dark">
        {title}
      </p>

      {summary ? (
        <p className="mt-2 text-xs leading-relaxed text-captionDark dark:text-captionDark-dark">
          {summary}
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {statusLabel ? (
          <span className="rounded-md bg-primary-blue/10 px-2 py-0.5 text-[11px] font-metropolis-semibold text-primary-blue dark:bg-primary-blue-dark/15 dark:text-primary-blue-dark">
            {statusLabel}
          </span>
        ) : null}
        {stageLabel ? (
          <span
            className={cn(
              "rounded-md bg-captionDark/10 px-2 py-0.5 text-[11px] font-metropolis-medium dark:bg-captionDark-dark/15",
              incidentProcessTextClass(row.process)
            )}
          >
            {stageLabel}
          </span>
        ) : null}

        {requiresHumanReview ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-[11px] font-metropolis-semibold text-amber-800 dark:text-amber-200">
            <AlertTriangle className="h-3 w-3" />
            Needs human review
          </span>
        ) : null}
        {isAnonymous ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-captionDark/10 px-2 py-0.5 text-[11px] font-metropolis-medium text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark">
            <UserX className="h-3 w-3" />
            Anonymous
          </span>
        ) : null}
        {detail?.deterministic_validation?.is_valid ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-success-green/12 px-2 py-0.5 text-[11px] font-metropolis-semibold text-success-green dark:bg-success-green-dark/15 dark:text-success-green-dark">
            <ShieldCheck className="h-3 w-3" />
            Validated
          </span>
        ) : null}
      </div>

      {categoryBadges.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {categoryBadges.map((badge) => (
            <CategoryChip key={`${badge.slug}-${badge.title}`} badge={badge} />
          ))}
        </div>
      ) : (
        <div className="mt-3">
          <span className="rounded-md bg-amber-500/12 px-2 py-0.5 text-[11px] font-metropolis-medium text-amber-900 dark:text-amber-100">
            Uncategorized
          </span>
        </div>
      )}
    </div>
  );
}

function buildCategoryBadges(
  row: SampleInboxRow,
  detail?: ReportDetailDTO | null
): IncidentCategoryBadge[] {
  if (detail?.categories?.length) {
    return detail.categories.map((c) => ({
      title: c.title?.trim() || c.slug,
      slug: c.slug,
      icon: c.customization?.icon,
      color: c.customization?.color,
    }));
  }
  return row.categoryBadges ?? [];
}
