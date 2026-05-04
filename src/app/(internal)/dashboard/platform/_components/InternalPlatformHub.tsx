"use client";

import { useMemo } from "react";
import type {
  PlatformAlertRow,
  PlatformDeploymentRow,
  PlatformServiceRow,
} from "../_data/internal-platform-dummy";
import { PlatformHealthSection } from "../../_components/PlatformHealthSection";
import { PlatformDeploymentsFeed } from "./PlatformDeploymentsFeed";
import { PlatformOpsPanel } from "./PlatformOpsPanel";
import { PlatformServicesTable } from "./PlatformServicesTable";
import { PlatformSummaryCards } from "./PlatformSummaryCards";

export function InternalPlatformHub({
  services,
  deployments,
  alerts,
  summary,
}: {
  services: PlatformServiceRow[];
  deployments: PlatformDeploymentRow[];
  alerts: PlatformAlertRow[];
  summary: {
    p95ApiLatency: number;
    backlog: number;
    avgErrorRate: number;
    openAlerts: number;
    openCriticalAlerts: number;
  };
}) {
  const sortedServices = useMemo(() => {
    const score = (s: PlatformServiceRow) =>
      (s.status === "outage" ? 1000 : s.status === "partial_outage" ? 700 : s.status === "degraded" ? 400 : 0) +
      s.errorRatePct * 100 +
      Math.min(200, s.queueDepth / 10);
    return [...services].sort((a, b) => score(b) - score(a));
  }, [services]);

  return (
    <div className="w-full space-y-10">
      <PlatformSummaryCards summary={summary} />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <PlatformHealthSection />
          <PlatformServicesTable services={sortedServices} />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <PlatformOpsPanel alerts={alerts} />
          <PlatformDeploymentsFeed deployments={deployments} />
        </div>
      </div>
    </div>
  );
}

