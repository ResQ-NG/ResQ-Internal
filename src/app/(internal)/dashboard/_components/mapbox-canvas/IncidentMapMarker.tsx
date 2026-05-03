"use client";

import { isSosOrWatchMeRow } from "@/lib/constants/incident-inbox";
import { lucideIconForIncidentRow } from "@/lib/icons/incident-kind-icons";
import { cn } from "@/lib/utils/generics";
import { incidentProcessTextClass } from "../sampleCommandData";
import type { MapIncidentPoint } from "../mapSampleGeo";

export function IncidentMapMarker({
  row,
  active,
  expanded = false,
  pulsate = false,
}: {
  row: MapIncidentPoint;
  active: boolean;
  expanded?: boolean;
  pulsate?: boolean;
}) {
  const isWatchMe = isSosOrWatchMeRow(row);
  const needsReview = Boolean(row.requiresHumanReview);
  const RowKindIcon = lucideIconForIncidentRow(row);

  const firstBadge = row.categoryBadges?.[0];
  const pinColor = firstBadge?.color ?? (isWatchMe ? "#EF4444" : "#3B82F6");
  const pinIcon = firstBadge?.icon ?? null;

  const shouldPulse = pulsate || isWatchMe || needsReview;

  return (
    <button
      type="button"
      className="group relative flex flex-col items-center focus:outline-none"
      aria-label={`${isWatchMe ? "SOS" : "Report"}: ${row.summary}`}
    >
      {shouldPulse ? (
        <>
          <span
            className="pointer-events-none absolute inset-0 animate-ping rounded-full opacity-40"
            style={{ backgroundColor: pinColor, animationDuration: "1.6s" }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-0 animate-ping rounded-full opacity-25"
            style={{
              backgroundColor: pinColor,
              animationDuration: "2.4s",
              animationDelay: "0.6s",
            }}
            aria-hidden
          />
        </>
      ) : null}

      <span
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform duration-150 dark:border-surface-dark",
          active ? "scale-125 shadow-xl" : "scale-100 group-hover:scale-110"
        )}
        style={{ backgroundColor: pinColor }}
      >
        {pinIcon ? (
          <span className="text-base leading-none" aria-hidden>
            {pinIcon}
          </span>
        ) : (
          <RowKindIcon className="h-4 w-4 text-white" strokeWidth={2} />
        )}

        {active ? (
          <span
            className="pointer-events-none absolute -inset-1.5 rounded-full border-2 border-white/60"
            aria-hidden
          />
        ) : null}
      </span>

      {active && !expanded ? (
        <span className="mt-1.5 max-w-[9rem] rounded-lg border border-captionDark/20 bg-surface-light/98 px-2 py-1 text-center text-[10px] font-metropolis-semibold leading-snug text-primaryDark shadow-lg backdrop-blur-md dark:border-captionDark-dark/25 dark:bg-surface-dark/95 dark:text-primaryDark-dark">
          <span className="line-clamp-2">{row.summary}</span>
        </span>
      ) : null}

      {active && expanded ? (
        <div className="mt-1.5 w-[min(240px,70vw)] rounded-xl border border-captionDark/20 bg-surface-light/98 p-2 shadow-xl backdrop-blur-md dark:border-captionDark-dark/25 dark:bg-surface-dark/95">
          <div className="flex items-start gap-2">
            <span
              className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/60 text-white shadow-sm dark:border-surface-dark/60"
              style={{ backgroundColor: pinColor }}
              aria-hidden
            >
              {pinIcon ? (
                <span className="text-[13px] leading-none">{pinIcon}</span>
              ) : (
                <RowKindIcon className="h-3.5 w-3.5" strokeWidth={2.25} />
              )}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide",
                    isWatchMe
                      ? "bg-accent-red/15 text-accent-red dark:text-accent-red-dark"
                      : "bg-primary-blue/12 text-primary-blue dark:bg-primary-blue-dark/15 dark:text-primary-blue-dark"
                  )}
                >
                  {isWatchMe ? "SOS" : "Report"}
                </span>
                {row.stageLabel ? (
                  <span className="rounded-md bg-captionDark/10 px-1.5 py-0.5 text-[9px] font-medium text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark">
                    {row.stageLabel}
                  </span>
                ) : null}
                <span
                  className={cn(
                    "text-[9px] font-semibold capitalize",
                    incidentProcessTextClass(row.process)
                  )}
                >
                  {row.process}
                </span>
              </div>

              <div className="mt-1 line-clamp-2 text-[11px] font-metropolis-semibold leading-snug text-primaryDark dark:text-primaryDark-dark">
                {row.summary}
              </div>

              <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px] text-captionDark dark:text-captionDark-dark">
                {row.locationLabel ? (
                  <span className="truncate">📍 {row.locationLabel}</span>
                ) : null}
                <span className="font-medium">{row.created}</span>
                <span className="rounded-md bg-captionDark/10 px-1.5 py-0.5 text-[9px] font-semibold text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark">
                  {row.evidenceUploadedCount ?? 0} evidence
                </span>
              </div>

              {row.categoryBadges && row.categoryBadges.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {row.categoryBadges.slice(0, 3).map((c) => (
                    <span
                      key={c.slug}
                      className="inline-flex items-center gap-1 rounded-md border border-captionDark/15 bg-surface-light px-1.5 py-1 text-[9px] font-medium text-primaryDark dark:border-captionDark-dark/20 dark:bg-surface-dark dark:text-primaryDark-dark"
                      style={{
                        borderColor: c.color ? `${c.color}55` : undefined,
                      }}
                    >
                      {c.icon ? <span aria-hidden>{c.icon}</span> : null}
                      <span className="max-w-[9rem] truncate">{c.title}</span>
                    </span>
                  ))}
                </div>
              ) : row.category ? (
                <div className="mt-2">
                  <span className="inline-flex max-w-full truncate rounded-md bg-captionDark/10 px-2 py-1 text-[9px] font-medium text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark">
                    {row.category}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {needsReview && !isWatchMe ? (
        <span
          className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-amber-400 dark:border-surface-dark"
          aria-label="Needs human review"
        />
      ) : null}

      <span
        aria-hidden
        className="h-2 w-0.5 rounded-b-full opacity-70"
        style={{ backgroundColor: pinColor }}
      />
    </button>
  );
}
