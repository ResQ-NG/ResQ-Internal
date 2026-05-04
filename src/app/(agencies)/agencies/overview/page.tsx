import { AgencyIdentityBar } from "@/app/(agencies)/_components/AgencyIdentityBar";
import { AgencyLiveReportFeed } from "@/app/(agencies)/_components/agency/AgencyLiveReportFeed";
import { AgencyMapPreviewCard } from "@/app/(agencies)/_components/agency/AgencyMapPreviewCard";
import { AgencyStatCards } from "@/app/(agencies)/_components/agency/AgencyStatCards";
import {
  AGENCY_LIVE_FEED,
  AGENCY_MAP_HOTSPOTS,
  AGENCY_OVERVIEW_STATS,
} from "@/app/(agencies)/_data/agency-dummy-data";

export default function AgenciesOverviewPage() {
  return (
    <div className="space-y-8">
      <AgencyIdentityBar />

      <AgencyStatCards stats={AGENCY_OVERVIEW_STATS} />

      <section className="grid min-h-0 gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex min-h-[min(24rem,50vh)] flex-col rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
          <AgencyLiveReportFeed items={AGENCY_LIVE_FEED} />
        </div>
        <div className="flex min-h-[min(24rem,50vh)] flex-col rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
          <AgencyMapPreviewCard hotspots={AGENCY_MAP_HOTSPOTS} />
        </div>
      </section>
    </div>
  );
}
