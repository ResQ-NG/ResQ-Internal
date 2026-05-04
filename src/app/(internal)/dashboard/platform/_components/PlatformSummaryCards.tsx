"use client";

import { Activity, AlertTriangle, Clock3, Layers } from "lucide-react";
import { cn } from "@/lib/utils/generics";

export function PlatformSummaryCards({
  summary,
}: {
  summary: {
    p95ApiLatency: number;
    backlog: number;
    avgErrorRate: number;
    openAlerts: number;
    openCriticalAlerts: number;
  };
}) {
  const items = [
    {
      key: "latency",
      label: "API p95 latency",
      value: `${summary.p95ApiLatency}ms`,
      icon: Clock3,
      tone: "neutral",
      hint: "Demo metric",
    },
    {
      key: "backlog",
      label: "Queue backlog",
      value: summary.backlog.toLocaleString(),
      icon: Layers,
      tone: summary.backlog > 500 ? "warn" : "neutral",
      hint: "Across services",
    },
    {
      key: "error",
      label: "Avg error rate",
      value: `${summary.avgErrorRate}%`,
      icon: Activity,
      tone: summary.avgErrorRate > 1 ? "warn" : "neutral",
      hint: "Rolling window",
    },
    {
      key: "alerts",
      label: "Open alerts",
      value: `${summary.openAlerts}`,
      icon: AlertTriangle,
      tone: summary.openCriticalAlerts > 0 ? "bad" : summary.openAlerts > 0 ? "warn" : "neutral",
      hint: summary.openCriticalAlerts > 0 ? `${summary.openCriticalAlerts} critical` : "No criticals",
    },
  ] as const;

  const toneStyles = (tone: "neutral" | "warn" | "bad") => {
    if (tone === "bad")
      return {
        ring: "ring-error-red/25 dark:ring-error-red-dark/25",
        iconBg: "bg-error-red/10 dark:bg-error-red-dark/15",
        iconText: "text-error-red dark:text-error-red-dark",
      };
    if (tone === "warn")
      return {
        ring: "ring-warning-amber/25 dark:ring-warning-amber-dark/25",
        iconBg: "bg-warning-amber/10 dark:bg-warning-amber-dark/15",
        iconText: "text-warning-amber dark:text-warning-amber-dark",
      };
    return {
      ring: "ring-captionDark/15 dark:ring-captionDark-dark/20",
      iconBg: "bg-captionDark/5 dark:bg-captionDark-dark/10",
      iconText: "text-captionDark dark:text-captionDark-dark",
    };
  };

  return (
    <section className="grid gap-4 lg:grid-cols-4">
      {items.map((it) => {
        const Icon = it.icon;
        const s = toneStyles(it.tone);
        return (
          <div
            key={it.key}
            className={cn(
              "rounded-2xl border border-captionDark/15 bg-surface-light p-4 shadow-sm ring-1 ring-transparent dark:border-captionDark-dark/20 dark:bg-surface-dark",
              s.ring
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-metropolis-semibold uppercase tracking-wider text-captionDark dark:text-captionDark-dark">
                  {it.label}
                </p>
                <p className="mt-2 text-2xl font-metropolis-bold tabular-nums text-primaryDark dark:text-primaryDark-dark">
                  {it.value}
                </p>
                <p className="mt-1 text-[11px] text-captionDark dark:text-captionDark-dark">
                  {it.hint}
                </p>
              </div>
              <div className={cn("mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl", s.iconBg)}>
                <Icon className={cn("h-4 w-4", s.iconText)} strokeWidth={2.25} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

