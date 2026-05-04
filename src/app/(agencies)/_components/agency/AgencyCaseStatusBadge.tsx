import type { AgencyCaseStatus } from "@/app/(agencies)/_data/agency-dummy-data";
import { cn } from "@/lib/utils/generics";

const LABEL: Record<AgencyCaseStatus, string> = {
  intake: "Intake",
  investigating: "Investigating",
  field_response: "Field response",
  closed: "Closed",
};

export function AgencyCaseStatusBadge({ status }: { status: AgencyCaseStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-metropolis-bold uppercase tracking-wide",
        status === "intake" && "bg-captionDark/12 text-captionDark dark:bg-captionDark-dark/20 dark:text-captionDark-dark",
        status === "investigating" &&
          "bg-primary-blue/12 text-primary-blue dark:bg-primary-blue-dark/18 dark:text-primary-blue-dark",
        status === "field_response" &&
          "bg-amber-500/15 text-amber-900 dark:bg-amber-400/18 dark:text-amber-100",
        status === "closed" && "bg-emerald-500/12 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-100"
      )}
    >
      {LABEL[status]}
    </span>
  );
}
