"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { flattenCursorItems } from "@/components/ui/InfiniteCursorList";
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import { useIntersectFetchNext } from "@/lib/hooks/use-intersect-fetch-next";
import { useInfiniteReports } from "@/network/modules/internal/incidents/reports/queries";
import { reportSimplifiedToSampleInboxRow } from "@/app/(internal)/dashboard/_utils/report-to-sample-inbox";
import type { SampleInboxRow } from "../sampleCommandData";
import { INBOX_LIST_FILTER } from "@/lib/constants/incident-inbox";
import {
  INCIDENT_LIST_ADVANCED_EMPTY,
  type IncidentListAdvancedFilters,
  type IncidentListFilterKind,
} from "./incident-list.types";
import { buildStaffReportsListParams, countIncidentAdvancedFilters } from "./incident-list-query";

const LIVE_MAP_REFETCH_MS = 15_000;

export function useIncidentListState({
  useLiveReports,
  mapLiveMode = false,
}: {
  useLiveReports: boolean;
  /** When true with live reports, periodically refetches so map + list stay current. */
  mapLiveMode?: boolean;
}) {
  const [filter, setFilter] = useState<IncidentListFilterKind>(
    useLiveReports ? INBOX_LIST_FILTER.REPORT : INBOX_LIST_FILTER.ALL,
  );
  const [query, setQuery] = useState("");
  const [advancedFilters, setAdvancedFilters] = useState<IncidentListAdvancedFilters>(
    INCIDENT_LIST_ADVANCED_EMPTY,
  );

  const debouncedQuery = useDebouncedValue(query.trim(), 300);
  const debouncedAdvanced = useDebouncedValue(advancedFilters, 400);

  const reportQueryParams = useMemo(
    () =>
      buildStaffReportsListParams({
        limit: 100,
        search: debouncedQuery || undefined,
        advanced: debouncedAdvanced,
      }),
    [debouncedQuery, debouncedAdvanced],
  );

  const liveQuery = useInfiniteReports(reportQueryParams, {
    enabled: useLiveReports,
    refetchInterval: useLiveReports && mapLiveMode ? LIVE_MAP_REFETCH_MS : false,
    refetchIntervalInBackground: true,
  });

  const allScrollRef = useRef<HTMLDivElement>(null);
  const allSentinelRef = useRef<HTMLDivElement>(null);

  const apiRows = useMemo(
    () => flattenCursorItems(liveQuery.data).map((r) => reportSimplifiedToSampleInboxRow(r)),
    [liveQuery.data],
  );

  const legacyRowsFiltered = useMemo(() => [] as SampleInboxRow[], []);
  const sosRowsFiltered = useMemo(() => [] as SampleInboxRow[], []);

  const apiRowsFiltered = apiRows;

  const sosCount = sosRowsFiltered.length;
  const reportCount = apiRowsFiltered.length;
  const badgeCount =
    filter === INBOX_LIST_FILTER.SOS
      ? sosCount
      : filter === INBOX_LIST_FILTER.REPORT
        ? reportCount
        : sosCount + reportCount;

  const patchAdvancedFilters = useCallback((patch: Partial<IncidentListAdvancedFilters>) => {
    setAdvancedFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetAdvancedFilters = useCallback(() => {
    setAdvancedFilters(INCIDENT_LIST_ADVANCED_EMPTY);
  }, []);

  const activeAdvancedCount = useMemo(
    () => countIncidentAdvancedFilters(advancedFilters),
    [advancedFilters],
  );

  useIntersectFetchNext({
    rootRef: allScrollRef,
    targetRef: allSentinelRef,
    hasNextPage: liveQuery.hasNextPage,
    isFetchingNextPage: liveQuery.isFetchingNextPage ?? false,
    fetchNextPage: liveQuery.fetchNextPage,
    enabled:
      useLiveReports &&
      filter === INBOX_LIST_FILTER.ALL &&
      !liveQuery.isError &&
      !liveQuery.isLoading,
  });

  return {
    filter,
    setFilter,
    query,
    setQuery,
    advancedFilters,
    patchAdvancedFilters,
    resetAdvancedFilters,
    activeAdvancedCount,
    liveQuery,
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
