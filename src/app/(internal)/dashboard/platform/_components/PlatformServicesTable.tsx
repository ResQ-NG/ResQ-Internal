"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/generics";
import type { PlatformServiceRow } from "../_data/internal-platform-dummy";
import { PlatformStatusBadge } from "./PlatformStatusBadge";

function tierLabel(tier: PlatformServiceRow["tier"]) {
  if (tier === "core") return "Core";
  if (tier === "edge") return "Edge";
  if (tier === "data") return "Data";
  return "Ops";
}

function regionLabel(r: PlatformServiceRow["region"]) {
  if (r === "global") return "Global";
  if (r === "us-east") return "US‑East";
  if (r === "eu-west") return "EU‑West";
  return "AP‑South";
}

export function PlatformServicesTable({
  services,
  onPickService,
}: {
  services: PlatformServiceRow[];
  onPickService?: (row: PlatformServiceRow) => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-captionDark/15 bg-surface-light shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
      <div className="flex items-center justify-between gap-3 border-b border-captionDark/10 px-5 py-3.5 dark:border-captionDark-dark/15">
        <div>
          <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
            Services
          </p>
          <p className="mt-0.5 text-[11px] text-captionDark dark:text-captionDark-dark">
            Dummy service list — designed to feel different from the Users directory.
          </p>
        </div>
        <span className="rounded-full border border-captionDark/15 px-2.5 py-1 text-[11px] font-metropolis-semibold text-captionDark dark:border-captionDark-dark/20 dark:text-captionDark-dark">
          {services.length} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left">
          <thead>
            <tr className="border-b border-captionDark/10 bg-captionDark/[0.02] text-[11px] font-metropolis-semibold uppercase tracking-wider text-captionDark dark:border-captionDark-dark/15 dark:bg-captionDark-dark/[0.04] dark:text-captionDark-dark">
              <th className="px-5 py-3">Service</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Region</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">p95</th>
              <th className="px-4 py-3">Error</th>
              <th className="px-4 py-3">Queue</th>
              <th className="px-5 py-3 text-right">Details</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr
                key={s.id}
                className={cn(
                  "border-b border-captionDark/10 text-sm text-primaryDark last:border-b-0 dark:border-captionDark-dark/15 dark:text-primaryDark-dark",
                  onPickService
                    ? "cursor-pointer transition-colors hover:bg-captionDark/[0.04] dark:hover:bg-captionDark-dark/[0.06]"
                    : ""
                )}
                onClick={onPickService ? () => onPickService(s) : undefined}
              >
                <td className="px-5 py-3.5">
                  <div className="flex flex-col">
                    <span className="font-metropolis-semibold">{s.name}</span>
                    <span className="mt-0.5 text-[11px] text-captionDark dark:text-captionDark-dark">
                      Last deploy{" "}
                      {new Date(s.lastDeployAt).toLocaleDateString([], {
                        month: "short",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-[13px] text-captionDark dark:text-captionDark-dark">
                  {tierLabel(s.tier)}
                </td>
                <td className="px-4 py-3.5 text-[13px] text-captionDark dark:text-captionDark-dark">
                  {regionLabel(s.region)}
                </td>
                <td className="px-4 py-3.5">
                  <PlatformStatusBadge status={s.status} />
                </td>
                <td className="px-4 py-3.5 font-metropolis-semibold tabular-nums">
                  {s.p95LatencyMs}ms
                </td>
                <td className="px-4 py-3.5 font-metropolis-semibold tabular-nums">
                  {s.errorRatePct}%
                </td>
                <td className="px-4 py-3.5 font-metropolis-semibold tabular-nums">
                  {s.queueDepth.toLocaleString()}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className="inline-flex items-center gap-2 text-[12px] font-metropolis-semibold text-captionDark transition-colors hover:text-primary-blue dark:text-captionDark-dark dark:hover:text-primary-blue-dark">
                    View
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

