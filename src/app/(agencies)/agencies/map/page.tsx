import { AgencyIdentityBar } from "@/app/(agencies)/_components/AgencyIdentityBar";
import { AgencyMapPreviewCard } from "@/app/(agencies)/_components/agency/AgencyMapPreviewCard";
import { AgencyMapRegionsPanel } from "@/app/(agencies)/_components/agency/AgencyMapRegionsPanel";
import { AGENCY_MAP_HOTSPOTS, AGENCY_REGION_METRICS } from "@/app/(agencies)/_data/agency-dummy-data";

export default function AgenciesMapPage() {
  return (
    <div className="space-y-8">
      <AgencyIdentityBar />
      <section className="rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
        <AgencyMapPreviewCard hotspots={AGENCY_MAP_HOTSPOTS} />
      </section>
      <AgencyMapRegionsPanel metrics={AGENCY_REGION_METRICS} />
    </div>
  );
}
