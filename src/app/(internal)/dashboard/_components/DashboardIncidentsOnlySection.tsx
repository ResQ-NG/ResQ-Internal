"use client";

import { useState } from "react";
import { AppEmpty } from "@/components/ui";
import { cn } from "@/lib/utils";
import { IncidentDetailCard } from "./IncidentDetailCard";
import { IncidentListDetailPanel } from "./IncidentListDetailPanel";
import { type SampleInboxRow } from "./sampleCommandData";

export function DashboardIncidentsOnlySection({ className }: { className?: string }) {
  const [selectedRow, setSelectedRow] = useState<SampleInboxRow | null>(null);

  const detailRow = selectedRow ?? null;

  return (
    <section
      className={cn(
        // Real fixed height so children with `min-h-0` + `flex-1` can scroll inside
        "grid h-[min(78dvh,56rem)] grid-cols-1 overflow-hidden rounded-2xl border border-captionDark/20 bg-surface-light shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark lg:grid-cols-[minmax(480px,600px)_1fr] xl:grid-cols-[minmax(560px,760px)_1fr] 2xl:grid-cols-[minmax(600px,820px)_1fr]",
        className,
      )}
    >
      <div
        className={cn(
          "min-h-0 border-b border-captionDark/10 dark:border-captionDark-dark/15 lg:border-b-0 lg:border-r",
          detailRow ? "hidden lg:block" : "block",
        )}
      >
        <IncidentListDetailPanel
          useLiveReports
          selectedRow={selectedRow}
          onSelectRow={setSelectedRow}
        />
      </div>

      <div className={cn("min-h-0", detailRow ? "block" : "hidden lg:block")}>
        {detailRow ? (
          <IncidentDetailCard row={detailRow} embedded onBack={() => setSelectedRow(null)} />
        ) : (
          <div className="flex h-full min-h-0 items-center justify-center px-6">
            <AppEmpty
              title="Select an incident"
              description="Pick a report or SOS from the list to view details, categorize, and assign."
            />
          </div>
        )}
      </div>
    </section>
  );
}
