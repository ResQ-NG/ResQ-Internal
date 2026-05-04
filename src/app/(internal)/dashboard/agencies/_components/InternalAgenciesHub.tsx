import type {
  InternalAgencyRegionTicketRow,
  InternalAgencyRow,
  InternalAgencyStatusCount,
  InternalPrimaryBranch,
} from "../_data/internal-agencies-dummy";
import { InternalAgenciesBranchFootprint } from "./InternalAgenciesBranchFootprint";
import { InternalAgenciesDirectory } from "./InternalAgenciesDirectory";
import { InternalAgenciesInsightsPanel } from "./InternalAgenciesInsightsPanel";

export function InternalAgenciesHub({
  rows,
  primaryBranches,
  regionTickets,
  statusCounts,
  topTicketAgencies,
}: {
  rows: InternalAgencyRow[];
  primaryBranches: InternalPrimaryBranch[];
  regionTickets: InternalAgencyRegionTicketRow[];
  statusCounts: InternalAgencyStatusCount[];
  topTicketAgencies: InternalAgencyRow[];
}) {
  return (
    <div className="w-full space-y-10">
      <InternalAgenciesInsightsPanel
        regionTickets={regionTickets}
        statusCounts={statusCounts}
        topTicketAgencies={topTicketAgencies}
      />

      <section className="rounded-2xl border border-captionDark/15 bg-surface-light px-4 py-6 shadow-sm sm:px-6 sm:py-8 dark:border-captionDark-dark/20 dark:bg-surface-dark">
        <InternalAgenciesDirectory rows={rows} />
      </section>

      <section className="rounded-2xl border border-captionDark/15 bg-surface-light px-4 py-6 shadow-sm sm:px-6 sm:py-8 dark:border-captionDark-dark/20 dark:bg-surface-dark">
        <InternalAgenciesBranchFootprint primaryBranches={primaryBranches} />
      </section>
    </div>
  );
}
