"use client";

import dynamic from "next/dynamic";
import { AppGlassSkeleton } from "@/components/ui";
import { DashboardHeader } from "@/app/(internal)/_components/DashboardHeader";

const MapWorkspaceShell = dynamic(
  () => import("../_components/MapWorkspaceShell").then((m) => m.MapWorkspaceShell),
  {
    ssr: false,
    loading: () => (
      <AppGlassSkeleton
        className="min-h-[480px] flex-1"
        caption="Loading workspace…"
        lines={4}
      />
    ),
  }
);

export default function WorkspacePage() {
  const dateRange = "Unattended SOS & uncategorized reports";
  return (
    <>
      <DashboardHeader title="Workspace" dateRange={dateRange} showExport={false} />
      <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-2 md:px-6 md:pb-5 md:pt-3">
        <MapWorkspaceShell />
      </div>
    </>
  );
}

