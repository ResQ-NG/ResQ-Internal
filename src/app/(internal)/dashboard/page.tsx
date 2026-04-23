import { DashboardHeader } from "../_components/DashboardHeader";
import { DashboardWideMapSection } from "./_components/DashboardWideMapSection";
import { StateHeatmapSection } from "./_components/StateHeatmapSection";
import { AnalyticsSnapshotSection } from "./_components/AnalyticsSnapshotSection";
import { PlatformHealthSection } from "./_components/PlatformHealthSection";

export default function DashboardOverviewPage() {
  return (
    <>
      <DashboardHeader
        title="Command Overview"
        dateRange="Live · updated in real-time"
      />

      <div className="p-6 space-y-6">
        {/* Analytics snapshot strip */}
        <AnalyticsSnapshotSection />

        {/* Platform health */}
        <PlatformHealthSection />

        {/* State-level heatmap */}
        <StateHeatmapSection />

        {/* Live map workspace */}
        <DashboardWideMapSection dateRange="Live command window" />
      </div>
    </>
  );
}
