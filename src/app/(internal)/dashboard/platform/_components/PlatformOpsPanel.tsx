"use client";

import Link from "next/link";
import { Bell, FileText, Siren, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils/generics";
import { INTERNAL_DASHBOARD_ROUTES } from "@/lib/routes/internal-dashboard-routes";
import type { PlatformAlertRow, PlatformAlertSeverity } from "../_data/internal-platform-dummy";

function severityStyles(sev: PlatformAlertSeverity) {
  if (sev === "critical")
    return {
      label: "Critical",
      bg: "bg-error-red/10 dark:bg-error-red-dark/15",
      ring: "ring-error-red/25 dark:ring-error-red-dark/25",
      text: "text-error-red dark:text-error-red-dark",
      icon: Siren,
    };
  if (sev === "warn")
    return {
      label: "Warning",
      bg: "bg-warning-amber/10 dark:bg-warning-amber-dark/15",
      ring: "ring-warning-amber/25 dark:ring-warning-amber-dark/25",
      text: "text-warning-amber dark:text-warning-amber-dark",
      icon: Bell,
    };
  return {
    label: "Info",
    bg: "bg-captionDark/5 dark:bg-captionDark-dark/10",
    ring: "ring-captionDark/15 dark:ring-captionDark-dark/20",
    text: "text-captionDark dark:text-captionDark-dark",
    icon: FileText,
  };
}

export function PlatformOpsPanel({
  alerts,
}: {
  alerts: PlatformAlertRow[];
}) {
  const open = alerts.filter((a) => a.state !== "resolved");
  return (
    <section className="overflow-hidden rounded-2xl border border-captionDark/15 bg-surface-light shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
      <div className="flex items-center justify-between gap-3 border-b border-captionDark/10 px-5 py-3.5 dark:border-captionDark-dark/15">
        <div>
          <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
            Ops
          </p>
          <p className="mt-0.5 text-[11px] text-captionDark dark:text-captionDark-dark">
            Alerts + shortcuts (a different flavor than Users insights).
          </p>
        </div>
        <Link
          href={INTERNAL_DASHBOARD_ROUTES.platform.logs}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border border-captionDark/12 px-3 py-2 text-[12px] font-metropolis-semibold text-primaryDark transition-colors",
            "hover:border-captionDark/25 hover:bg-captionDark/[0.05]",
            "dark:border-captionDark-dark/18 dark:text-primaryDark-dark dark:hover:border-captionDark-dark/30 dark:hover:bg-captionDark-dark/[0.07]"
          )}
        >
          <TerminalSquare className="h-4 w-4 text-captionDark dark:text-captionDark-dark" />
          Logs
        </Link>
      </div>

      <div className="space-y-4 px-5 py-4">
        <div className="rounded-xl border border-captionDark/12 bg-surface-light/60 p-4 dark:border-captionDark-dark/18 dark:bg-primaryDark/5">
          <p className="text-[11px] font-metropolis-semibold uppercase tracking-wider text-captionDark dark:text-captionDark-dark">
            On-call (demo)
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-captionDark/15 px-2.5 py-1 text-[12px] font-metropolis-semibold text-primaryDark dark:border-captionDark-dark/20 dark:text-primaryDark-dark">
              Primary · K. Mensah
            </span>
            <span className="rounded-full border border-captionDark/15 px-2.5 py-1 text-[12px] font-metropolis-semibold text-captionDark dark:border-captionDark-dark/20 dark:text-captionDark-dark">
              Secondary · A. Chen
            </span>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-metropolis-semibold uppercase tracking-wider text-captionDark dark:text-captionDark-dark">
            Active alerts
          </p>
          <div className="mt-2 space-y-2">
            {open.length === 0 ? (
              <div className="rounded-xl border border-captionDark/12 bg-surface-light/60 p-4 text-[12px] text-captionDark dark:border-captionDark-dark/18 dark:bg-primaryDark/5 dark:text-captionDark-dark">
                No active alerts.
              </div>
            ) : (
              open.slice(0, 6).map((a) => {
                const s = severityStyles(a.severity);
                const Icon = s.icon;
                return (
                  <div
                    key={a.id}
                    className="rounded-xl border border-captionDark/12 bg-surface-light/60 p-4 dark:border-captionDark-dark/18 dark:bg-primaryDark/5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
                          {a.title}
                        </p>
                        <p className="mt-1 text-[12px] text-captionDark dark:text-captionDark-dark">
                          {a.service} · {a.state.replaceAll("_", " ")}
                        </p>
                      </div>
                      <span className={cn("inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-metropolis-semibold ring-1", s.bg, s.ring, s.text)}>
                        <Icon className="h-3.5 w-3.5" />
                        {s.label}
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-captionDark dark:text-captionDark-dark">
                      {a.hint}
                    </p>
                    <p className="mt-2 text-[10px] text-captionDark/70 dark:text-captionDark-dark/70">
                      Opened{" "}
                      {new Date(a.openedAt).toLocaleString([], {
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      · {a.id}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

