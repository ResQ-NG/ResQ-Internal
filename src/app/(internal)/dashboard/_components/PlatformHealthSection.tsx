"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { INTERNAL_DASHBOARD_ROUTES } from "@/lib/routes/internal-dashboard-routes";
import { AppGlassSkeleton } from "@/components/ui";
import { AppError } from "@/components/ui/AppError";
import { useBasicHealthAnalytics } from "@/network/modules/internal/analytics/queries";
import {
  buildPlatformHealthItems,
  PLATFORM_HEALTH_OVERALL_LABELS,
  PLATFORM_HEALTH_PLACEHOLDER_ITEMS,
  PLATFORM_HEALTH_TONE_STYLES,
  type PlatformHealthItem,
  type PlatformHealthTone,
} from "@/network/modules/internal/analytics/utils/platform-health";

export function PlatformHealthSection() {
  const { data, isLoading, isError, dataUpdatedAt } = useBasicHealthAnalytics();

  if (isLoading && !data && !isError) {
    return (
      <AppGlassSkeleton
        className="min-h-[260px]"
        caption="Loading platform health…"
        lines={4}
        label="Loading platform health"
      />
    );
  }

  const HEALTH_ITEMS: PlatformHealthItem[] =
    isError || (!isLoading && !data)
      ? PLATFORM_HEALTH_PLACEHOLDER_ITEMS.map((i) => ({
          ...i,
          value: "—",
          detail: "Unable to load health metrics",
          tone: "warn" as const,
        }))
      : data
        ? buildPlatformHealthItems(data)
        : PLATFORM_HEALTH_PLACEHOLDER_ITEMS;

  const allGood = HEALTH_ITEMS.every((i) => i.tone === "good");
  const warnCount = HEALTH_ITEMS.filter((i) => i.tone === "warn").length;
  const badCount = HEALTH_ITEMS.filter((i) => i.tone === "bad").length;
  const overallTone: PlatformHealthTone =
    badCount > 0 ? "bad" : warnCount > 0 ? "warn" : "good";
  const overall = PLATFORM_HEALTH_TONE_STYLES[overallTone];
  const overallLabel = PLATFORM_HEALTH_OVERALL_LABELS[overallTone];

  const lastChecked =
    dataUpdatedAt > 0
      ? `Last checked · ${new Date(dataUpdatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      : "Last checked · —";

  return (
    <section className="overflow-hidden rounded-xl border border-captionDark/15 bg-surface-light shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-captionDark/10 px-5 py-3.5 dark:border-captionDark-dark/15">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg ring-1",
              overall.bg,
              overall.ring
            )}
          >
            <ShieldCheck
              className={cn("h-4 w-4", overall.text)}
              strokeWidth={2.25}
            />
          </div>
          <div>
            <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
              Platform Health
            </p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                {allGood && (
                  <span
                    className={cn(
                      "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
                      overall.bar
                    )}
                  />
                )}
                <span
                  className={cn(
                    "relative inline-flex h-2 w-2 rounded-full",
                    overall.dot
                  )}
                />
              </span>
              <span
                className={cn(
                  "text-[11px] font-metropolis-semibold",
                  overall.text
                )}
              >
                {overallLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-[11px] text-captionDark dark:text-captionDark-dark sm:inline">
            {lastChecked}
          </span>
          <Link
            href={INTERNAL_DASHBOARD_ROUTES.platform.root}
            className="inline-flex items-center gap-1 rounded-md border border-captionDark/20 px-2.5 py-1 text-[11px] font-metropolis-semibold text-captionDark transition-colors hover:border-primary-blue/40 hover:bg-primary-blue/[0.06] hover:text-primary-blue dark:border-captionDark-dark/25 dark:text-captionDark-dark dark:hover:border-primary-blue-dark/45 dark:hover:bg-primary-blue-dark/10 dark:hover:text-primary-blue-dark"
          >
            Status page
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {isError ? (
        <div className="border-b border-captionDark/10 px-5 py-3 dark:border-captionDark-dark/15">
          <AppError
            variant="error"
            compact
            message="Could not load platform health metrics."
          />
        </div>
      ) : null}

      {/* Metric cells */}
      <div className="grid grid-cols-1 divide-y divide-captionDark/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0 dark:divide-captionDark-dark/15">
        {HEALTH_ITEMS.map(
          ({ label, value, detail, tone, icon: Icon, score }) => {
            const styles = PLATFORM_HEALTH_TONE_STYLES[tone];
            return (
              <div
                key={label}
                className="group relative p-4 transition-colors hover:bg-captionDark/[0.02] dark:hover:bg-captionDark-dark/[0.04] sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(2n)]:border-captionDark/10 sm:dark:[&:nth-child(2n)]:border-captionDark-dark/15 lg:[&:nth-child(2n)]:border-l-0"
              >
                {/* Top row: icon + label + status dot */}
                <div className="mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-md",
                        styles.bg
                      )}
                    >
                      <Icon
                        className={cn("h-3.5 w-3.5", styles.text)}
                        strokeWidth={2}
                      />
                    </div>
                    <p className="text-[10px] font-metropolis-semibold uppercase tracking-wider text-captionDark dark:text-captionDark-dark">
                      {label}
                    </p>
                  </div>

                  {tone === "good" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-success-green dark:text-success-green-dark" />
                  ) : (
                    <span className={cn("h-2 w-2 rounded-full", styles.dot)} />
                  )}
                </div>

                {/* Value */}
                <p
                  className={cn(
                    "text-xl font-metropolis-bold tabular-nums leading-none",
                    styles.text
                  )}
                >
                  {value}
                </p>

                {/* Detail */}
                <p className="mt-1.5 text-[11px] leading-snug text-captionDark dark:text-captionDark-dark">
                  {detail}
                </p>

                {/* Score bar */}
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-captionDark/10 dark:bg-captionDark-dark/15">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      styles.bar
                    )}
                    style={{ width: `${Math.max(4, Math.min(100, score))}%` }}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}
