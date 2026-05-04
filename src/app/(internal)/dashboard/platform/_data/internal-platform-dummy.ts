export type PlatformServiceStatus = "operational" | "degraded" | "partial_outage" | "outage";

export type PlatformServiceRow = {
  id: string;
  name: string;
  tier: "core" | "edge" | "data" | "ops";
  status: PlatformServiceStatus;
  region: "global" | "us-east" | "eu-west" | "ap-south";
  p95LatencyMs: number;
  errorRatePct: number;
  queueDepth: number;
  lastDeployAt: string; // ISO date
};

export type PlatformDeploymentRow = {
  id: string;
  service: string;
  version: string;
  env: "prod" | "staging";
  at: string; // ISO date
  author: string;
  summary: string;
  result: "success" | "rolled_back" | "in_progress";
};

export type PlatformAlertSeverity = "info" | "warn" | "critical";

export type PlatformAlertRow = {
  id: string;
  title: string;
  service: string;
  severity: PlatformAlertSeverity;
  openedAt: string; // ISO date
  state: "open" | "acknowledged" | "resolved";
  hint: string;
};

export const PLATFORM_SERVICES: PlatformServiceRow[] = [
  {
    id: "svc-api",
    name: "ResQ API",
    tier: "core",
    status: "operational",
    region: "global",
    p95LatencyMs: 182,
    errorRatePct: 0.18,
    queueDepth: 0,
    lastDeployAt: "2026-05-04T10:18:00.000Z",
  },
  {
    id: "svc-realtime",
    name: "Realtime (WS)",
    tier: "edge",
    status: "degraded",
    region: "eu-west",
    p95LatencyMs: 410,
    errorRatePct: 0.62,
    queueDepth: 0,
    lastDeployAt: "2026-05-03T20:42:00.000Z",
  },
  {
    id: "svc-workers",
    name: "Incident Workers",
    tier: "ops",
    status: "operational",
    region: "us-east",
    p95LatencyMs: 95,
    errorRatePct: 0.07,
    queueDepth: 122,
    lastDeployAt: "2026-05-04T08:01:00.000Z",
  },
  {
    id: "svc-notify",
    name: "Notifications",
    tier: "edge",
    status: "partial_outage",
    region: "ap-south",
    p95LatencyMs: 980,
    errorRatePct: 2.6,
    queueDepth: 840,
    lastDeployAt: "2026-05-02T14:35:00.000Z",
  },
  {
    id: "svc-data",
    name: "Analytics Pipeline",
    tier: "data",
    status: "operational",
    region: "global",
    p95LatencyMs: 260,
    errorRatePct: 0.11,
    queueDepth: 44,
    lastDeployAt: "2026-05-01T09:12:00.000Z",
  },
  {
    id: "svc-media",
    name: "Media Ingest",
    tier: "edge",
    status: "operational",
    region: "us-east",
    p95LatencyMs: 210,
    errorRatePct: 0.2,
    queueDepth: 12,
    lastDeployAt: "2026-05-04T11:03:00.000Z",
  },
];

export const PLATFORM_DEPLOYMENTS: PlatformDeploymentRow[] = [
  {
    id: "dep-1031",
    service: "ResQ API",
    version: "v2.18.4",
    env: "prod",
    at: "2026-05-04T10:18:00.000Z",
    author: "N. Patel",
    summary: "Tuned incident list caching and reduced payload size.",
    result: "success",
  },
  {
    id: "dep-1030",
    service: "Incident Workers",
    version: "v1.9.0",
    env: "prod",
    at: "2026-05-04T08:01:00.000Z",
    author: "K. Mensah",
    summary: "Improved queue backoff for bursty uploads.",
    result: "success",
  },
  {
    id: "dep-1029",
    service: "Realtime (WS)",
    version: "v1.21.2",
    env: "staging",
    at: "2026-05-04T07:12:00.000Z",
    author: "A. Chen",
    summary: "Heartbeat timeout updates; rolling canary.",
    result: "in_progress",
  },
  {
    id: "dep-1028",
    service: "Notifications",
    version: "v1.16.8",
    env: "prod",
    at: "2026-05-02T14:35:00.000Z",
    author: "S. Okafor",
    summary: "Provider failover tweak (rollback triggered).",
    result: "rolled_back",
  },
];

export const PLATFORM_ALERTS: PlatformAlertRow[] = [
  {
    id: "al-8001",
    title: "Push delivery delays above SLO",
    service: "Notifications",
    severity: "critical",
    openedAt: "2026-05-04T09:22:00.000Z",
    state: "acknowledged",
    hint: "Provider throttling; queue depth trending up.",
  },
  {
    id: "al-8002",
    title: "WS reconnect spikes",
    service: "Realtime (WS)",
    severity: "warn",
    openedAt: "2026-05-04T11:06:00.000Z",
    state: "open",
    hint: "EU-West only; investigate edge nodes.",
  },
  {
    id: "al-8003",
    title: "Analytics lag (p95)",
    service: "Analytics Pipeline",
    severity: "info",
    openedAt: "2026-05-03T19:11:00.000Z",
    state: "resolved",
    hint: "Backfill completed; lag normalized.",
  },
];

export function getPlatformSummary(services: PlatformServiceRow[], alerts: PlatformAlertRow[]) {
  const byStatus = services.reduce(
    (acc, s) => {
      acc[s.status] += 1;
      return acc;
    },
    {
      operational: 0,
      degraded: 0,
      partial_outage: 0,
      outage: 0,
    } as Record<PlatformServiceStatus, number>
  );

  const p95ApiLatency =
    services.find((s) => s.id === "svc-api")?.p95LatencyMs ??
    Math.round(services.reduce((a, s) => a + s.p95LatencyMs, 0) / Math.max(1, services.length));

  const openCriticalAlerts = alerts.filter((a) => a.severity === "critical" && a.state !== "resolved").length;
  const openAlerts = alerts.filter((a) => a.state !== "resolved").length;
  const backlog = services.reduce((a, s) => a + s.queueDepth, 0);
  const avgErrorRate =
    Math.round(
      (services.reduce((a, s) => a + s.errorRatePct, 0) / Math.max(1, services.length)) * 100
    ) / 100;

  return {
    byStatus,
    p95ApiLatency,
    backlog,
    avgErrorRate,
    openAlerts,
    openCriticalAlerts,
  };
}

