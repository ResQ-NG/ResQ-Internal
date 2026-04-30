"use client";

import { Loader2 } from "lucide-react";
import {
  AppButton,
  AppError,
  AppParagraph,
  InfiniteCursorList,
} from "@/components/ui";
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import type { CursorPaginatedResult } from "@/network/types";
import { reportSimplifiedToSampleInboxRow } from "@/app/(internal)/dashboard/_utils/report-to-sample-inbox";
import { IncidentListRow } from "../IncidentListRow";
import type { SampleInboxRow } from "../sampleCommandData";
import type { IncidentListFilterKind } from "./incident-list.types";
import type { ReportListItemDTO } from "@/network/modules/internal/incidents/reports/types";
import type React from "react";

export function IncidentListContent({
  useLiveReports,
  filter,
  legacyRowsFiltered,
  sosRowsFiltered,
  apiRows,
  apiRowsFiltered,
  liveQuery,
  selectedRow,
  onRowClick,
  allScrollRef,
  allSentinelRef,
}: {
  useLiveReports: boolean;
  filter: IncidentListFilterKind;
  legacyRowsFiltered: SampleInboxRow[];
  sosRowsFiltered: SampleInboxRow[];
  apiRows: SampleInboxRow[];
  apiRowsFiltered: SampleInboxRow[];
  liveQuery: Pick<
    UseInfiniteQueryResult<
      InfiniteData<CursorPaginatedResult<ReportListItemDTO>>,
      Error
    >,
    | "data"
    | "isLoading"
    | "isFetching"
    | "isError"
    | "error"
    | "hasNextPage"
    | "fetchNextPage"
    | "isFetchingNextPage"
    | "refetch"
  >;
  selectedRow?: SampleInboxRow | null;
  onRowClick: (row: SampleInboxRow) => void;
  allScrollRef: React.RefObject<HTMLDivElement | null>;
  allSentinelRef: React.RefObject<HTMLDivElement | null>;
}) {
  if (!useLiveReports) {
    return (
      <div
        ref={allScrollRef}
        className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain px-3 py-3"
      >
        {legacyRowsFiltered.length === 0 ? (
          <p className="py-8 text-center text-sm text-captionDark dark:text-captionDark-dark">
            All clear.
          </p>
        ) : (
          legacyRowsFiltered.map((row) => (
            <IncidentListRow
              key={row.id}
              row={row}
              active={selectedRow?.id === row.id}
              onClick={() => onRowClick(row)}
            />
          ))
        )}
      </div>
    );
  }

  if (filter === "report") {
    return (
      <InfiniteCursorList
        query={liveQuery}
        className="flex min-h-0 flex-1 flex-col"
        scrollAreaClassName="px-3 py-3"
        loadingMessage="Loading reports…"
        emptyTitle="No reports yet"
        emptyDescription="When staff reports arrive, they’ll appear here."
        errorTitle="Failed to load reports"
        getItemKey={(r) => r.id}
        renderItem={(r) => {
          const row = reportSimplifiedToSampleInboxRow(r);
          return (
            <IncidentListRow
              row={row}
              active={selectedRow?.id === row.id}
              onClick={() => onRowClick(row)}
            />
          );
        }}
      />
    );
  }

  if (filter === "sos") {
    return (
      <div
        ref={allScrollRef}
        className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain px-3 py-3"
      >
        {sosRowsFiltered.map((row) => (
          <IncidentListRow
            key={row.id}
            row={row}
            active={selectedRow?.id === row.id}
            onClick={() => onRowClick(row)}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={allScrollRef}
      className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain px-3 py-3"
    >
      {liveQuery.isError ? (
        <div className="space-y-2 px-0.5">
          <AppError
            title="Failed to load reports"
            message={
              liveQuery.error instanceof Error
                ? liveQuery.error.message
                : "Could not fetch staff reports."
            }
          />
          <AppButton
            variant="outline"
            size="sm"
            onClick={() => liveQuery.refetch()}
          >
            Retry
          </AppButton>
        </div>
      ) : null}

      {sosRowsFiltered.map((row) => (
        <IncidentListRow
          key={row.id}
          row={row}
          active={selectedRow?.id === row.id}
          onClick={() => onRowClick(row)}
        />
      ))}

      {!liveQuery.isError && liveQuery.isLoading && apiRows.length === 0 ? (
        <div className="flex min-h-[100px] shrink-0 items-center justify-center rounded-xl border border-captionDark/10 dark:border-captionDark-dark/15">
          <AppParagraph
            variant="caption"
            className="text-captionDark dark:text-captionDark-dark"
          >
            Loading reports…
          </AppParagraph>
        </div>
      ) : null}

      {!liveQuery.isError &&
        apiRowsFiltered.map((row) => (
          <IncidentListRow
            key={row.id}
            row={row}
            active={selectedRow?.id === row.id}
            onClick={() => onRowClick(row)}
          />
        ))}

      {!liveQuery.isError && liveQuery.hasNextPage ? (
        <div
          ref={allSentinelRef}
          aria-hidden
          className="h-px w-full shrink-0"
        />
      ) : null}

      {!liveQuery.isError &&
      liveQuery.isFetchingNextPage &&
      apiRows.length > 0 ? (
        <div className="flex items-center justify-center gap-2 py-2 text-captionDark dark:text-captionDark-dark">
          <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" aria-hidden />
          <span className="text-[11px] font-metropolis-medium">
            Loading more…
          </span>
        </div>
      ) : null}

      {!liveQuery.isError &&
      !liveQuery.isLoading &&
      !liveQuery.hasNextPage &&
      apiRows.length > 0 ? (
        <p className="py-2 text-center text-[10px] uppercase tracking-wide text-captionDark/70 dark:text-captionDark-dark/70">
          End of list
        </p>
      ) : null}
    </div>
  );
}
