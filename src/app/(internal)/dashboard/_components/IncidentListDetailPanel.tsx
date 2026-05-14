"use client";

import { useEffect } from "react";
import { INTERNAL_DASHBOARD_ROUTES } from "@/lib/routes/internal-dashboard-routes";
import { AppLink } from "@/components/ui";
import { IncidentListHeader } from "./incident-list/IncidentListHeader";
import { IncidentListContent } from "./incident-list/IncidentListContent";
import { useIncidentListState } from "./incident-list/useIncidentListState";
import type { IncidentListDetailPanelProps } from "./incident-list/incident-list.types";
import type { SampleInboxRow } from "./sampleCommandData";
import { IncidentDetailCard } from "./IncidentDetailCard";
import { useMapWorkspaceStore } from "@/store/map-workspace-store";

export function IncidentListDetailPanel({
  selectedRow,
  onSelectRow,
  onApiRowsChange,
  useLiveReports = false,
  showDetailInPanel = false,
}: IncidentListDetailPanelProps) {
  const mapLiveMode = useMapWorkspaceStore((s) => s.mapLiveMode);
  const state = useIncidentListState({
    useLiveReports,
    mapLiveMode: useLiveReports ? mapLiveMode : false,
  });

  useEffect(() => {
    onApiRowsChange?.(state.apiRows);
  }, [onApiRowsChange, state.apiRows]);

  const handleRowClick = (row: SampleInboxRow) => {
    onSelectRow?.(selectedRow?.id === row.id ? null : row);
  };

  const handleBack = () => onSelectRow?.(null);

  // In panel-detail mode: replace the body with IncidentDetailCard
  if (showDetailInPanel && selectedRow) {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-surface-light dark:bg-surface-dark">
        <IncidentDetailCard
          row={selectedRow}
          embedded
          onBack={handleBack}
        />
      </div>
    );
  }

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
        advancedFilters={state.advancedFilters}
        onAdvancedPatch={state.patchAdvancedFilters}
        onResetAdvanced={state.resetAdvancedFilters}
        activeAdvancedCount={state.activeAdvancedCount}
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
          href={INTERNAL_DASHBOARD_ROUTES.incidents.reports}
          variant="muted"
          className="text-xs"
        >
          Open full reports queue →
        </AppLink>
      </div>
    </div>
  );
}
