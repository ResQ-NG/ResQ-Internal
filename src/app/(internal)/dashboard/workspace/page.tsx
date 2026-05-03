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
  // h-dvh + overflow-hidden gives this wrapper a CSS-definite height (100dvh),
  // which propagates down so every `flex-1 min-h-0` child can resolve its height.
  // Without this, `h-full` in nested flex children resolves to 0/auto and the
  // page grows with content (causing outer scroll and killing infinite-scroll).
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <DashboardHeader title="Workspace" dateRange="Live staff reports" showExport={false} />
      <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-2 md:px-6 md:pb-5 md:pt-3">
        <MapWorkspaceShell />
      </div>
    </div>
  );
}

