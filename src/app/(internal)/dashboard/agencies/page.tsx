import { DashboardHeader } from "@/app/(internal)/_components/DashboardHeader";
import { InternalContentWidthShell } from "@/app/(internal)/_components/InternalContentWidthShell";
import { InternalAgenciesHub } from "./_components/InternalAgenciesHub";
import { InternalAgenciesQuickLinks } from "./_components/InternalAgenciesQuickLinks";
import type { InternalAgencyStatItem } from "./_components/InternalAgencyStatsBar";
import { InternalAgencyStatsBar } from "./_components/InternalAgencyStatsBar";
import { AppParagraph } from "@/components/ui";
import {
  getInternalAgenciesTopByOpenTickets,
  getInternalAgencyRegionTickets,
  getInternalAgencyStatusCounts,
  INTERNAL_AGENCIES,
  INTERNAL_AGENCY_SUMMARY,
  INTERNAL_PRIMARY_BRANCHES,
} from "./_data/internal-agencies-dummy";

const ROWS = INTERNAL_AGENCIES;

const STAT_ITEMS: readonly InternalAgencyStatItem[] = [
  {
    key: "agencies",
    label: "Connected agencies",
    value: String(INTERNAL_AGENCY_SUMMARY.agencyCount),
    hint: "On this internal deployment (demo)",
  },
  {
    key: "branches",
    label: "Branches",
    value: String(INTERNAL_AGENCY_SUMMARY.branchCount),
    hint: "Routed sites & field desks",
  },
  {
    key: "tickets",
    label: "Open tickets",
    value: String(INTERNAL_AGENCY_SUMMARY.openTickets),
    hint: "Across loaded agency rows",
  },
  {
    key: "pilots",
    label: "Pilot programs",
    value: String(INTERNAL_AGENCY_SUMMARY.pilotsCount),
    hint: "Limited rollout agencies",
  },
];

export default function AgenciesPage() {
  const regionTickets = getInternalAgencyRegionTickets(ROWS);
  const statusCounts = getInternalAgencyStatusCounts(ROWS);
  const topTicketAgencies = getInternalAgenciesTopByOpenTickets(ROWS, 6);

  return (
    <>
      <DashboardHeader
        title="Agencies · List & branches"
        dateRange="All agencies"
        showExport={false}
      />
      <InternalContentWidthShell>
        <div className="space-y-8 py-6 pb-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <AppParagraph
              variant="caption"
              className="max-w-2xl text-sm leading-relaxed"
            >
              Internal registry with demo search, status filters, and branch
              footprints keyed off each main branch. Replace
              `_data/internal-agencies-dummy` with API models when ready.
            </AppParagraph>
            <div className="flex shrink-0 flex-wrap gap-2">
              <InternalAgenciesQuickLinks />
            </div>
          </div>

          <InternalAgencyStatsBar items={STAT_ITEMS} />

          <InternalAgenciesHub
            rows={ROWS}
            primaryBranches={INTERNAL_PRIMARY_BRANCHES}
            regionTickets={regionTickets}
            statusCounts={statusCounts}
            topTicketAgencies={topTicketAgencies}
          />
        </div>
      </InternalContentWidthShell>
    </>
  );
}
