import { DashboardHeader } from "../../_components/DashboardHeader";
import { InternalContentWidthShell } from "../../_components/InternalContentWidthShell";
import { StateHeatmapSection } from "../_components/StateHeatmapSection";
import { AnalyticsSnapshotSection } from "../_components/AnalyticsSnapshotSection";
import { PlatformHealthSection } from "../_components/PlatformHealthSection";
import { DashboardIncidentsOnlySection } from "../_components/DashboardIncidentsOnlySection";

export default function DashboardOverviewPage() {
  return (
    <>
      <DashboardHeader
        title="Overview"
        dateRange="Live · updated in real-time"
      />

      <InternalContentWidthShell>
        <div className="space-y-6 py-6 pb-12">
          <AnalyticsSnapshotSection />
          <PlatformHealthSection />
          <StateHeatmapSection />
          <DashboardIncidentsOnlySection />
        </div>
      </InternalContentWidthShell>
    </>
  );
}
