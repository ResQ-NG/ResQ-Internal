import Link from "next/link";
import { Plus, Route, Users } from "lucide-react";
import { cn } from "@/lib/utils/generics";
import { INTERNAL_DASHBOARD_ROUTES } from "@/lib/routes/internal-dashboard-routes";

const R = INTERNAL_DASHBOARD_ROUTES.agencies;

const secondaryLinkClass = cn(
  "inline-flex items-center gap-2 rounded-xl border border-captionDark/12 px-3 py-2 text-sm font-metropolis-medium text-primaryDark transition-colors",
  "hover:border-captionDark/25 hover:bg-captionDark/[0.05]",
  "dark:border-captionDark-dark/18 dark:text-primaryDark-dark dark:hover:border-captionDark-dark/30 dark:hover:bg-captionDark-dark/[0.07]"
);

const primaryLinkClass = cn(
  "inline-flex items-center gap-2 rounded-xl bg-primary-blue px-3 py-2 text-sm font-metropolis-medium text-white shadow-sm transition-opacity hover:opacity-90",
  "dark:bg-primary-blue-dark"
);

export function InternalAgenciesQuickLinks() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link href={R.new} className={primaryLinkClass}>
        <Plus className="h-4 w-4 shrink-0 opacity-95" aria-hidden />
        Create agency
      </Link>
      <Link href={R.routingRules} className={secondaryLinkClass}>
        <Route className="h-4 w-4 shrink-0 text-captionDark dark:text-captionDark-dark" aria-hidden />
        Routing rules
      </Link>
      <Link href={R.staff} className={secondaryLinkClass}>
        <Users className="h-4 w-4 shrink-0 text-captionDark dark:text-captionDark-dark" aria-hidden />
        Staff & permissions
      </Link>
    </div>
  );
}
