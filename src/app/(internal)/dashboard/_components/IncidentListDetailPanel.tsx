"use client";

import { INTERNAL_DASHBOARD_ROUTES } from "@/lib/routes/internal-dashboard-routes";
import { AppLink } from "@/components/ui";
import { IncidentListHeader } from "./incident-list/IncidentListHeader";
import { IncidentListContent } from "./incident-list/IncidentListContent";
import { useIncidentListState } from "./incident-list/useIncidentListState";
import type { IncidentListDetailPanelProps } from "./incident-list/incident-list.types";
import type { SampleInboxRow } from "./sampleCommandData";

export function IncidentListDetailPanel({
  selectedRow,
  onSelectRow,
  useLiveReports = false,
}: IncidentListDetailPanelProps) {
  const state = useIncidentListState({ useLiveReports });

  const handleRowClick = (row: SampleInboxRow) => {
    onSelectRow?.(selectedRow?.id === row.id ? null : row);
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-surface-light dark:bg-surface-dark">
      <IncidentListHeader
        filter={state.filter}
        onFilterChange={state.setFilter}
        query={state.query}
        onQueryChange={state.setQuery}
        onClearQuery={() => state.setQuery("")}
        useLiveReports={useLiveReports}
        isFetching={Boolean(state.liveQuery.isFetching)}
        badgeCount={state.badgeCount}
        sosCount={state.sosCount}
        reportCount={state.reportCount}
      />

      {/* Scrollable list region */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <IncidentListContent
          useLiveReports={useLiveReports}
          filter={state.filter}
          legacyRowsFiltered={state.legacyRowsFiltered}
          sosRowsFiltered={state.sosRowsFiltered}
          apiRows={state.apiRows}
          apiRowsFiltered={state.apiRowsFiltered}
          liveQuery={state.liveQuery}
          selectedRow={selectedRow}
          onRowClick={handleRowClick}
          allScrollRef={state.allScrollRef}
          allSentinelRef={state.allSentinelRef}
        />

        {/* subtle top fade to hint scroll */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-surface-light to-transparent dark:from-surface-dark" />
      </div>

      <div className="flex shrink-0 items-center justify-center border-t border-captionDark/10 px-4 py-2.5 dark:border-captionDark-dark/15">
        <AppLink
          href={INTERNAL_DASHBOARD_ROUTES.incidents.watchMeSos}
          variant="muted"
          className="text-xs"
        >
          Open full incident queue →
        </AppLink>
      </div>
    </div>
  );
}
