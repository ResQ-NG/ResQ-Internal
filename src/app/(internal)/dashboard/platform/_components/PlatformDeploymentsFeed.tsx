"use client";

import { CheckCircle2, GitCommit, RotateCcw, Timer } from "lucide-react";
import { cn } from "@/lib/utils/generics";
import type { PlatformDeploymentRow } from "../_data/internal-platform-dummy";

function resultStyles(result: PlatformDeploymentRow["result"]) {
  if (result === "success")
    return {
      icon: CheckCircle2,
      iconText: "text-success-green dark:text-success-green-dark",
      dot: "bg-success-green dark:bg-success-green-dark",
      label: "Succeeded",
    };
  if (result === "rolled_back")
    return {
      icon: RotateCcw,
      iconText: "text-error-red dark:text-error-red-dark",
      dot: "bg-error-red dark:bg-error-red-dark",
      label: "Rolled back",
    };
  return {
    icon: Timer,
    iconText: "text-warning-amber dark:text-warning-amber-dark",
    dot: "bg-warning-amber dark:bg-warning-amber-dark",
    label: "In progress",
  };
}

export function PlatformDeploymentsFeed({
  deployments,
}: {
  deployments: PlatformDeploymentRow[];
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-captionDark/15 bg-surface-light shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
      <div className="flex items-center justify-between gap-3 border-b border-captionDark/10 px-5 py-3.5 dark:border-captionDark-dark/15">
        <div>
          <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
            Recent deployments
          </p>
          <p className="mt-0.5 text-[11px] text-captionDark dark:text-captionDark-dark">
            A timeline-style feed (not a directory table).
          </p>
        </div>
        <GitCommit className="h-4 w-4 text-captionDark dark:text-captionDark-dark" aria-hidden />
      </div>

      <div className="px-5 py-4">
        <ol className="space-y-4">
          {deployments.map((d) => {
            const s = resultStyles(d.result);
            const Icon = s.icon;
            return (
              <li key={d.id} className="relative pl-6">
                <span className={cn("absolute left-1 top-2 h-2 w-2 rounded-full", s.dot)} aria-hidden />
                <span
                  className="absolute left-[5px] top-5 block h-[calc(100%-0.25rem)] w-px bg-captionDark/10 dark:bg-captionDark-dark/15"
                  aria-hidden
                />

                <div className="rounded-xl border border-captionDark/12 bg-surface-light/60 p-4 dark:border-captionDark-dark/18 dark:bg-primaryDark/5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
                      {d.service} ·{" "}
                      <span className="font-metropolis-medium text-captionDark dark:text-captionDark-dark">
                        {d.version}
                      </span>
                    </p>
                    <span className="inline-flex items-center gap-2 text-[11px] font-metropolis-semibold text-captionDark dark:text-captionDark-dark">
                      <Icon className={cn("h-3.5 w-3.5", s.iconText)} />
                      {s.label}
                      <span className="mx-1 h-3 w-px bg-captionDark/15 dark:bg-captionDark-dark/20" aria-hidden />
                      {new Date(d.at).toLocaleString([], {
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="mt-2 text-[12px] leading-relaxed text-captionDark dark:text-captionDark-dark">
                    {d.summary}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-captionDark dark:text-captionDark-dark">
                    <span className="rounded-full border border-captionDark/15 px-2 py-0.5 dark:border-captionDark-dark/20">
                      {d.env.toUpperCase()}
                    </span>
                    <span className="rounded-full border border-captionDark/15 px-2 py-0.5 dark:border-captionDark-dark/20">
                      {d.author}
                    </span>
                    <span className="rounded-full border border-captionDark/15 px-2 py-0.5 dark:border-captionDark-dark/20">
                      {d.id}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

