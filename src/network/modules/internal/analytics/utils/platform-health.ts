import {
  Activity,
  Database,
  Gauge,
  RadioTower,
  type LucideIcon,
} from "lucide-react";

import type { BasicHealthAnalyticsResponse } from "../types";

export type PlatformHealthTone = "good" | "warn" | "bad";

export type PlatformHealthItem = {
  label: string;
  value: string;
  detail: string;
  tone: PlatformHealthTone;
  icon: LucideIcon;
  /** 0–100 — drives the small progress bar */
  score: number;
};

export const PLATFORM_HEALTH_TONE_STYLES: Record<
  PlatformHealthTone,
  { dot: string; text: string; bar: string; bg: string; ring: string }
> = {
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

export function finiteNumber(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value;
}

/** Backend may send 0–1 ratio or 0–100 percent; missing values show as em dash */
export function uptimeDisplayParts(value: unknown): {
  pct: number;
  display: string;
  missing: boolean;
} {
  const n = finiteNumber(value);
  if (n === null) {
    return { pct: 0, display: "—", missing: true };
  }
  const pct = n > 0 && n <= 1 ? n * 100 : n;
  return {
    pct,
    missing: false,
    display: `${pct >= 10 ? pct.toFixed(2) : pct.toFixed(3)}%`,
  };
}

export function uptimeTone(pct: number): PlatformHealthTone {
  if (pct >= 99.9) return "good";
  if (pct >= 99) return "warn";
  return "bad";
}

export function latencyTone(ms: number): PlatformHealthTone {
  if (ms <= 350) return "good";
  if (ms <= 600) return "warn";
  return "bad";
}

export function latencyScore(ms: number): number {
  return Math.max(8, Math.min(100, 100 - (ms / 600) * 50));
}

export function buildPlatformHealthItems(
  data: Partial<BasicHealthAnalyticsResponse>
): PlatformHealthItem[] {
  const api = uptimeDisplayParts(data.api_uptime);
  const jobs = uptimeDisplayParts(data.background_jobs_uptime);
  const alerts = uptimeDisplayParts(data.alert_pipeline_uptime);
  const lat = finiteNumber(data.latency);
  const latTone = lat === null ? ("warn" as const) : latencyTone(lat);
  const apiTone = api.missing ? ("warn" as const) : uptimeTone(api.pct);
  const jobsTone = jobs.missing ? ("warn" as const) : uptimeTone(jobs.pct);
  const alertsTone = alerts.missing
    ? ("warn" as const)
    : uptimeTone(alerts.pct);

  return [
    {
      label: "API Uptime",
      value: api.display,
      detail: api.missing ? "Not reported" : "Rolling service availability",
      tone: apiTone,
      icon: Activity,
      score: Math.min(100, Math.max(0, api.pct)),
    },
    {
      label: "Dispatch latency",
      value: lat === null ? "—" : `${Math.round(lat)}ms`,
      detail: lat === null ? "Not reported" : "p95 target · under 600ms",
      tone: latTone,
      icon: Gauge,
      score: lat === null ? 0 : latencyScore(lat),
    },
    {
      label: "Background jobs",
      value: jobs.display,
      detail: jobs.missing ? "Not reported" : "Queue workers & schedulers",
      tone: jobsTone,
      icon: Database,
      score: Math.min(100, Math.max(0, jobs.pct)),
    },
    {
      label: "Alert pipeline",
      value: alerts.display,
      detail: alerts.missing ? "Not reported" : "Staff alert delivery path",
      tone: alertsTone,
      icon: RadioTower,
      score: Math.min(100, Math.max(0, alerts.pct)),
    },
  ];
}

export const PLATFORM_HEALTH_PLACEHOLDER_ITEMS: PlatformHealthItem[] = [
  {
    label: "API Uptime",
    value: "—",
    detail: "",
    tone: "good",
    icon: Activity,
    score: 0,
  },
  {
    label: "Dispatch latency",
    value: "—",
    detail: "",
    tone: "good",
    icon: Gauge,
    score: 0,
  },
  {
    label: "Background jobs",
    value: "—",
    detail: "",
    tone: "good",
    icon: Database,
    score: 0,
  },
  {
    label: "Alert pipeline",
    value: "—",
    detail: "",
    tone: "good",
    icon: RadioTower,
    score: 0,
  },
];

export const PLATFORM_HEALTH_OVERALL_LABELS: Record<
  PlatformHealthTone,
  string
> = {
  good: "All Systems Operational",
  warn: "Partial Degradation",
  bad: "Major Outage",
};
