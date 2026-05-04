import { AgencyIdentityBar } from "@/app/(agencies)/_components/AgencyIdentityBar";
import { AgencyCaseFilters } from "@/app/(agencies)/_components/agency/AgencyCaseFilters";
import { AgencyCasesTable } from "@/app/(agencies)/_components/agency/AgencyCasesTable";
import { AGENCY_CASES } from "@/app/(agencies)/_data/agency-dummy-data";

export default function AgenciesCasesPage() {
  return (
    <div className="space-y-8">
      <AgencyIdentityBar />
      <section className="grid min-h-0 gap-6 lg:grid-cols-[1fr_220px]">
        <div className="min-h-0 rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
          <AgencyCasesTable cases={AGENCY_CASES} />
        </div>
        <div className="shrink-0 rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark lg:max-w-[260px]">
          <AgencyCaseFilters />
        </div>
      </section>
    </div>
  );
}
