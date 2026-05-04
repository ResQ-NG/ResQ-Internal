import type { InternalAgencyStatus } from "../_data/internal-agencies-dummy";
import { cn } from "@/lib/utils/generics";

const LABEL: Record<InternalAgencyStatus, string> = {
  active: "Active",
  pilot: "Pilot",
  suspended: "Suspended",
};

export function InternalAgencyStatusBadge({ status }: { status: InternalAgencyStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-metropolis-bold uppercase tracking-wide",
        status === "active" &&
          "bg-emerald-500/12 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200",
        status === "pilot" &&
          "bg-primary-blue/12 text-primary-blue dark:bg-primary-blue-dark/18 dark:text-primary-blue-dark",
        status === "suspended" &&
          "bg-captionDark/12 text-captionDark dark:bg-captionDark-dark/20 dark:text-captionDark-dark"
      )}
    >
      {LABEL[status]}
    </span>
  );
}
