"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { flattenCursorItems } from "@/components/ui/InfiniteCursorList";
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import { useIntersectFetchNext } from "@/lib/hooks/use-intersect-fetch-next";
import { useInfiniteReports } from "@/network/modules/internal/incidents/reports/queries";
import { reportSimplifiedToSampleInboxRow } from "@/app/(internal)/dashboard/_utils/report-to-sample-inbox";
import { sampleUnattendedRows, type SampleInboxRow } from "../sampleCommandData";
import type { IncidentListFilterKind } from "./incident-list.types";

export function useIncidentListState({
  useLiveReports,
}: {
  useLiveReports: boolean;
}) {
  const [filter, setFilter] = useState<IncidentListFilterKind>("all");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query.trim(), 300);

  const liveQuery = useInfiniteReports(
    {
      limit: 10,
      search: debouncedQuery ? debouncedQuery : undefined,
    },
    { enabled: useLiveReports },
  );

  const allScrollRef = useRef<HTMLDivElement>(null);
  const allSentinelRef = useRef<HTMLDivElement>(null);

  const apiRows = useMemo(
    () => flattenCursorItems(liveQuery.data).map((r) => reportSimplifiedToSampleInboxRow(r)),
    [liveQuery.data],
  );

  const sosRows = useMemo(
    () => sampleUnattendedRows().filter((r) => r.kind === "sos"),
    [],
  );

  const legacyRows = useMemo(() => {
    const all = sampleUnattendedRows();
    if (filter === "sos") return all.filter((r) => r.kind === "sos");
    if (filter === "report") return all.filter((r) => r.kind === "report");
    return all;
  }, [filter]);

  const q = query.trim().toLowerCase();
  const matches = useCallback(
    (row: SampleInboxRow) => {
      if (!q) return true;
      const hay = [row.summary, row.category ?? "", row.locationLabel ?? "", row.reporterName ?? ""]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    },
    [q],
  );

  const legacyRowsFiltered = useMemo(() => legacyRows.filter(matches), [legacyRows, matches]);
  const sosRowsFiltered = useMemo(() => sosRows.filter(matches), [sosRows, matches]);
  // Reports search is backend-driven; don't double-filter client-side.
  const apiRowsFiltered = apiRows;

  const sosCount = sosRowsFiltered.length;
  const legacyReportCount = sampleUnattendedRows().filter((r) => r.kind === "report").length;
  const reportCount = useLiveReports ? apiRowsFiltered.length : legacyReportCount;
  const badgeCount =
    filter === "sos" ? sosCount : filter === "report" ? reportCount : sosCount + reportCount;

  useIntersectFetchNext({
    rootRef: allScrollRef,
    targetRef: allSentinelRef,
    hasNextPage: liveQuery.hasNextPage,
    isFetchingNextPage: liveQuery.isFetchingNextPage ?? false,
    fetchNextPage: liveQuery.fetchNextPage,
    enabled: useLiveReports && filter === "all" && !liveQuery.isError && !liveQuery.isLoading,
  });

  return {
    filter,
    setFilter,
    query,
    setQuery,
    liveQuery,
    matches,
    apiRows,
    apiRowsFiltered,
    sosRowsFiltered,
    legacyRowsFiltered,
    sosCount,
    reportCount,
    badgeCount,
    allScrollRef,
    allSentinelRef,
  };
}

