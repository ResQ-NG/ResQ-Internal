"use client";

import { useEffect, useMemo } from "react";
import { parseAsString, parseAsStringEnum, useQueryState } from "nuqs";
import {
  GetUncategorizedIncidentsHeatMap,
  useGetRecognizedIncidentsLocations,
} from "@/network/modules/internal/analytics/queries";
import type { IncidentsHeatMapRequest } from "@/network/modules/internal/analytics/types";

const UNCATEGORIZED_HEATMAP_DEFAULT_LIMIT = 16;
const RECOGNIZED_INCIDENT_LOCATIONS_LIMIT = 200;
const CRITICAL_ROW_THRESHOLD = 0.6;

const parseGroupBy = parseAsStringEnum(["state", "city"]).withDefault("state");

export function useUncategorizedHeatmapDashboardState() {
  const [groupBy, setGroupBy] = useQueryState(
    "hmGroup",
    parseGroupBy.withOptions({ clearOnDefault: true })
  );
  const [stateFilter, setStateFilter] = useQueryState(
    "hmState",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );
  const [cityFilter, setCityFilter] = useQueryState(
    "hmCity",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );

  // City depends on state; reset when state changes.
  useEffect(() => {
    void setCityFilter("");
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only reset city on stateFilter change
  }, [stateFilter]);

  // If grouped by state, city filter should not apply.
  useEffect(() => {
    if (groupBy === "state") void setCityFilter("");
  }, [groupBy, setCityFilter]);

  const recognizedAll = useGetRecognizedIncidentsLocations({
    limit: RECOGNIZED_INCIDENT_LOCATIONS_LIMIT,
  });
  const recognizedForState = useGetRecognizedIncidentsLocations(
    stateFilter
      ? { state: stateFilter, limit: RECOGNIZED_INCIDENT_LOCATIONS_LIMIT }
      : undefined
  );

  const heatmap = GetUncategorizedIncidentsHeatMap({
    group_by: groupBy as IncidentsHeatMapRequest["group_by"],
    limit: UNCATEGORIZED_HEATMAP_DEFAULT_LIMIT,
    state: stateFilter || undefined,
    city: groupBy === "city" ? cityFilter || undefined : undefined,
  });

  const rows = heatmap.data?.items ?? [];
  const sorted = useMemo(
    () => [...rows].sort((a, b) => b.count - a.count),
    [rows]
  );
  const maxTotal = sorted[0]?.count ?? 1;
  const totalAll = heatmap.data?.total ?? rows.reduce((s, r) => s + r.count, 0);
  const criticalRows = sorted.filter(
    (r) => r.count / maxTotal >= CRITICAL_ROW_THRESHOLD
  );

  const states = recognizedAll.data?.states ?? [];
  const citiesForState = recognizedForState.data?.cities ?? [];

  const loading =
    (heatmap.isLoading && !heatmap.data && !heatmap.isError) ||
    (recognizedAll.isLoading && !recognizedAll.data && !recognizedAll.isError);

  return {
    // query-state
    groupBy,
    setGroupBy,
    stateFilter,
    setStateFilter,
    cityFilter,
    setCityFilter,

    // options
    states,
    citiesForState,

    // data
    heatmap,
    sorted,
    maxTotal,
    totalAll,
    criticalRows,
    loading,
  };
}
