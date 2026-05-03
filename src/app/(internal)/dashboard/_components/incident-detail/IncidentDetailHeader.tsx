"use client";

import { ArrowLeft, X } from "lucide-react";
import { isSosOrWatchMeRow } from "@/lib/constants/incident-inbox";
import { lucideIconForIncidentRow } from "@/lib/icons/incident-kind-icons";
import { cn } from "@/lib/utils/generics";
import type { ReportDetailDTO } from "@/network/modules/internal/incidents/reports/types";
import type { SampleInboxRow } from "../sampleCommandData";
import { IncidentDetailSyncingBadge } from "./IncidentDetailSyncingBadge";

export function IncidentDetailHeader({
  row,
  detail,
  isFetching,
  onBack,
  onClose,
}: {
  row: SampleInboxRow;
  detail?: ReportDetailDTO | null;
  isFetching?: boolean;
  onBack?: () => void;
  onClose?: () => void;
}) {
  const isWatchMe = isSosOrWatchMeRow(row);
  const KindIcon = lucideIconForIncidentRow(row);
  const idLabel = detail?.id
    ? `#${detail.id}`
    : `#${row.apiReportId ?? row.id}`;

  return (
    <div className="sticky top-0 z-10 shrink-0 border-b border-captionDark/10 bg-surface-light px-4 py-3 dark:border-captionDark-dark/15 dark:bg-surface-dark">
      <div className="flex items-center gap-2">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-captionDark transition-colors hover:bg-captionDark/10 hover:text-primaryDark dark:text-captionDark-dark dark:hover:bg-captionDark-dark/15 dark:hover:text-primaryDark-dark"
            aria-label="Back to list"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        ) : null}

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              isWatchMe
                ? "bg-accent-red/12 text-accent-red dark:text-accent-red-dark"
                : "bg-primary-blue/10 text-primary-blue dark:text-primary-blue-dark"
            )}
          >
            <KindIcon className="h-4 w-4" strokeWidth={2} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                  isWatchMe
                    ? "bg-accent-red/15 text-accent-red dark:text-accent-red-dark"
                    : "bg-primary-blue/12 text-primary-blue dark:text-primary-blue-dark"
                )}
              >
                {isWatchMe ? "Watch Me / SOS" : "Report"}
              </span>
              <span className="font-mono text-[11px] text-captionDark dark:text-captionDark-dark">
                {idLabel}
              </span>
              {isFetching ? <IncidentDetailSyncingBadge /> : null}
            </div>
          </div>
        </div>

        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-captionDark transition-colors hover:bg-captionDark/10 hover:text-primaryDark dark:text-captionDark-dark dark:hover:bg-captionDark-dark/15 dark:hover:text-primaryDark-dark"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
