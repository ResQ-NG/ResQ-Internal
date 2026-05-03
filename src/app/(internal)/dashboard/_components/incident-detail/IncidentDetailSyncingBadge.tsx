"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/generics";

type IncidentDetailSyncingBadgeProps = {
  /** Shown next to the spinner (default: “Syncing”). */
  label?: string;
  className?: string;
};

export function IncidentDetailSyncingBadge({
  label = "Syncing",
  className,
}: IncidentDetailSyncingBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-primary-blue/10 px-1.5 py-0.5 text-[10px] font-metropolis-medium text-primary-blue dark:bg-primary-blue-dark/15 dark:text-primary-blue-dark",
        className
      )}
    >
      <Loader2 className="h-2.5 w-2.5 animate-spin" aria-hidden />
      {label}
    </span>
  );
}
