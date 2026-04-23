"use client";

import dynamic from "next/dynamic";
import { AppGlassSkeleton } from "@/components/ui";
import { DashboardHeader } from "../../_components/DashboardHeader";

const MapWorkspaceShell = dynamic(
  () => import("../../dashboard/_components/MapWorkspaceShell").then((m) => m.MapWorkspaceShell),
  {
    ssr: false,
    loading: () => (
      <AppGlassSkeleton className="min-h-[480px] flex-1" caption="Loading map workspace…" lines={4} />
    ),
  },
);

export default function MapWorkspacePage() {
  const dateRange = "Mapbox · full layout";
  return (
    <>
      <DashboardHeader title="Map workspace" dateRange={dateRange} showExport={false} />
      <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-2 md:px-6 md:pb-5 md:pt-3">
        <MapWorkspaceShell dateRange={dateRange} />
      </div>
    </>
  );
}
