"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Database,
  Gauge,
  RadioTower,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { INTERNAL_DASHBOARD_ROUTES } from "@/lib/routes/internal-dashboard-routes";

type HealthTone = "good" | "warn" | "bad";

type HealthItem = {
  label: string;
  value: string;
  detail: string;
  tone: HealthTone;
  icon: LucideIcon;
  /** 0–100 — drives the small progress bar */
  score: number;
};

const HEALTH_ITEMS: HealthItem[] = [
  { label: "API Uptime", value: "99.98%", detail: "Last 30d · 2 minor incidents", tone: "good", icon: Activity, score: 99.98 },
  { label: "Dispatch Latency", value: "248ms", detail: "p95 · target < 500ms", tone: "good", icon: Gauge, score: 85 },
  { label: "Map Ingest Queue", value: "7 pending", detail: "Degraded throughput · -12%", tone: "warn", icon: Database, score: 62 },
  { label: "Alert Pipeline", value: "Operational", detail: "All agents receiving alerts", tone: "good", icon: RadioTower, score: 100 },
];

const toneStyles: Record<HealthTone, { dot: string; text: string; bar: string; bg: string; ring: string }> = {
  good: {
    dot: "bg-success-green dark:bg-success-green-dark",
    text: "text-success-green dark:text-success-green-dark",
    bar: "bg-success-green dark:bg-success-green-dark",
    bg: "bg-success-green/10 dark:bg-success-green-dark/15",
    ring: "ring-success-green/20 dark:ring-success-green-dark/25",
  },
  warn: {
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-300",
    bar: "bg-amber-500",
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    ring: "ring-amber-500/20",
  },
  bad: {
    dot: "bg-accent-red dark:bg-accent-red-dark",
    text: "text-accent-red dark:text-accent-red-dark",
    bar: "bg-accent-red dark:bg-accent-red-dark",
    bg: "bg-accent-red/10 dark:bg-accent-red-dark/15",
    ring: "ring-accent-red/20",
  },
};

export function PlatformHealthSection() {
  const allGood = HEALTH_ITEMS.every((i) => i.tone === "good");
  const warnCount = HEALTH_ITEMS.filter((i) => i.tone === "warn").length;
  const badCount = HEALTH_ITEMS.filter((i) => i.tone === "bad").length;
  const overallTone: HealthTone = badCount > 0 ? "bad" : warnCount > 0 ? "warn" : "good";
  const overall = toneStyles[overallTone];
  const overallLabel =
    overallTone === "good" ? "All Systems Operational" : overallTone === "warn" ? "Partial Degradation" : "Major Outage";

  return (
    <section className="overflow-hidden rounded-xl border border-captionDark/15 bg-surface-light shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-captionDark/10 px-5 py-3.5 dark:border-captionDark-dark/15">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg ring-1", overall.bg, overall.ring)}>
            <ShieldCheck className={cn("h-4 w-4", overall.text)} strokeWidth={2.25} />
          </div>
          <div>
            <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
              Platform Health
            </p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                {allGood && (
                  <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", overall.bar)} />
                )}
                <span className={cn("relative inline-flex h-2 w-2 rounded-full", overall.dot)} />
              </span>
              <span className={cn("text-[11px] font-metropolis-semibold", overall.text)}>
                {overallLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-[11px] text-captionDark dark:text-captionDark-dark sm:inline">
            Last checked · just now
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

      {/* Metric cells */}
      <div className="grid grid-cols-1 divide-y divide-captionDark/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0 dark:divide-captionDark-dark/15">
        {HEALTH_ITEMS.map(({ label, value, detail, tone, icon: Icon, score }) => {
          const styles = toneStyles[tone];
          return (
            <div key={label} className="group relative p-4 transition-colors hover:bg-captionDark/[0.02] dark:hover:bg-captionDark-dark/[0.04] sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(2n)]:border-captionDark/10 sm:dark:[&:nth-child(2n)]:border-captionDark-dark/15 lg:[&:nth-child(2n)]:border-l-0">
              {/* Top row: icon + label + status dot */}
              <div className="mb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("flex h-6 w-6 items-center justify-center rounded-md", styles.bg)}>
                    <Icon className={cn("h-3.5 w-3.5", styles.text)} strokeWidth={2} />
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
              <p className={cn("text-xl font-metropolis-bold tabular-nums leading-none", styles.text)}>
                {value}
              </p>

              {/* Detail */}
              <p className="mt-1.5 text-[11px] leading-snug text-captionDark dark:text-captionDark-dark">
                {detail}
              </p>

              {/* Score bar */}
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-captionDark/10 dark:bg-captionDark-dark/15">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", styles.bar)}
                  style={{ width: `${Math.max(4, Math.min(100, score))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
