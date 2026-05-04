"use client";

import { cn } from "@/lib/utils/generics";
import type { PlatformServiceStatus } from "../_data/internal-platform-dummy";

const STYLES: Record<
  PlatformServiceStatus,
  { label: string; dot: string; bg: string; ring: string; text: string }
> = {
  operational: {
    label: "Operational",
    dot: "bg-success-green dark:bg-success-green-dark",
    bg: "bg-success-green/10 dark:bg-success-green-dark/15",
    ring: "ring-success-green/30 dark:ring-success-green-dark/30",
    text: "text-success-green dark:text-success-green-dark",
  },
  degraded: {
    label: "Degraded",
    dot: "bg-warning-amber dark:bg-warning-amber-dark",
    bg: "bg-warning-amber/12 dark:bg-warning-amber-dark/15",
    ring: "ring-warning-amber/30 dark:ring-warning-amber-dark/30",
    text: "text-warning-amber dark:text-warning-amber-dark",
  },
  partial_outage: {
    label: "Partial outage",
    dot: "bg-orange-500",
    bg: "bg-orange-500/10 dark:bg-orange-500/15",
    ring: "ring-orange-500/30 dark:ring-orange-500/30",
    text: "text-orange-600 dark:text-orange-400",
  },
  outage: {
    label: "Outage",
    dot: "bg-error-red dark:bg-error-red-dark",
    bg: "bg-error-red/10 dark:bg-error-red-dark/15",
    ring: "ring-error-red/30 dark:ring-error-red-dark/30",
    text: "text-error-red dark:text-error-red-dark",
  },
};

export function PlatformStatusBadge({
  status,
  className,
}: {
  status: PlatformServiceStatus;
  className?: string;
}) {
  const s = STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-metropolis-semibold ring-1",
        s.bg,
        s.ring,
        s.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} aria-hidden />
      {s.label}
    </span>
  );
}

