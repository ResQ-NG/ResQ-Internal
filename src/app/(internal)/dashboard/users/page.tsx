import Link from "next/link";
import { Layers } from "lucide-react";
import { DashboardHeader } from "@/app/(internal)/_components/DashboardHeader";
import { InternalContentWidthShell } from "@/app/(internal)/_components/InternalContentWidthShell";
import type { InternalAgencyStatItem } from "@/app/(internal)/dashboard/agencies/_components/InternalAgencyStatsBar";
import { InternalAgencyStatsBar } from "@/app/(internal)/dashboard/agencies/_components/InternalAgencyStatsBar";
import { AppParagraph } from "@/components/ui";
import { cn } from "@/lib/utils/generics";
import { INTERNAL_DASHBOARD_ROUTES } from "@/lib/routes/internal-dashboard-routes";
import { InternalUsersHub } from "./_components/InternalUsersHub";
import {
  getInternalUsersDemography,
  getInternalUsersSummary,
  INTERNAL_USERS,
} from "./_data/internal-users-dummy";

const U = INTERNAL_USERS;
const summary = getInternalUsersSummary(U);
const demography = getInternalUsersDemography(U);

const STAT_ITEMS: readonly InternalAgencyStatItem[] = [
  {
    key: "total",
    label: "Total users",
    value: String(summary.total),
    hint: "Demo directory size",
  },
  {
    key: "online",
    label: "Online now",
    value: String(summary.onlineNow),
    hint: "Presence flag in demo data",
  },
  {
    key: "new",
    label: "New sign-ups (7d)",
    value: String(summary.newSignups7d),
    hint: "Joined this week (demo)",
  },
  {
    key: "active",
    label: "Active (24h)",
    value: String(summary.activeLast24h),
    hint: "Sessions / presence window",
  },
];

export default function UsersPage() {
  return (
    <>
      <DashboardHeader
        title="Users · All users"
        dateRange="All time"
        showExport={false}
      />
      <InternalContentWidthShell>
        <div className="space-y-8 py-6 pb-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <AppParagraph
              variant="caption"
              className="max-w-2xl text-sm leading-relaxed"
            >
              End-user accounts (non-agency). Insights and the directory share
              the same demo cohort — replace the data module when your directory
              API is ready.
            </AppParagraph>
            <Link
              href={INTERNAL_DASHBOARD_ROUTES.users.segments}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-captionDark/12 px-3 py-2 text-sm font-metropolis-medium text-primaryDark transition-colors",
                "hover:border-captionDark/25 hover:bg-captionDark/[0.05]",
                "dark:border-captionDark-dark/18 dark:text-primaryDark-dark dark:hover:border-captionDark-dark/30 dark:hover:bg-captionDark-dark/[0.07]"
              )}
            >
              <Layers
                className="h-4 w-4 text-captionDark dark:text-captionDark-dark"
                aria-hidden
              />
              User segments
            </Link>
          </div>

          <InternalAgencyStatsBar items={STAT_ITEMS} />

          <InternalUsersHub users={U} demography={demography} />
        </div>
      </InternalContentWidthShell>
    </>
  );
}
