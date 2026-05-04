import type { AgencySeverity } from "@/app/(agencies)/_data/agency-dummy-data";
import { cn } from "@/lib/utils/generics";

export function agencySeverityPillClass(sev: AgencySeverity): string {
  return cn(
    "inline-flex shrink-0 rounded-full px-2 py-0.5 text-[10px] font-metropolis-bold uppercase tracking-wide",
    sev === "critical" && "bg-accent-red/15 text-accent-red dark:bg-accent-red-dark/20 dark:text-accent-red-dark",
    sev === "high" && "bg-amber-500/15 text-amber-800 dark:bg-amber-400/15 dark:text-amber-200",
    sev === "medium" && "bg-primary-blue/12 text-primary-blue dark:bg-primary-blue-dark/15 dark:text-primary-blue-dark",
    sev === "low" && "bg-captionDark/10 text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark"
  );
}

export function agencySeverityDotClass(sev: AgencySeverity): string {
  return cn(
    "h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white dark:ring-surface-dark",
    sev === "critical" && "bg-accent-red dark:bg-accent-red-dark",
    sev === "high" && "bg-amber-500",
    sev === "medium" && "bg-primary-blue dark:bg-primary-blue-dark",
    sev === "low" && "bg-captionDark/60 dark:bg-captionDark-dark/70"
  );
}
