import type { ReportQueryParamsDTO } from "@/network/modules/internal/incidents/reports/types";
import type { IncidentListAdvancedFilters } from "./incident-list.types";

export function buildStaffReportsListParams(args: {
  limit: number;
  search?: string;
  advanced: IncidentListAdvancedFilters;
}): ReportQueryParamsDTO {
  const { limit, search, advanced } = args;
  const p: ReportQueryParamsDTO = { limit };

  if (search?.trim()) p.search = search.trim();
  if (advanced.country.trim()) p.country = advanced.country.trim();
  if (advanced.state.trim()) p.state = advanced.state.trim();
  if (advanced.city.trim()) p.city = advanced.city.trim();
  if (advanced.reporter_name.trim()) p.reporter_name = advanced.reporter_name.trim();

  if (advanced.created_from.trim()) p.created_from = advanced.created_from.trim();
  if (advanced.created_to.trim()) p.created_to = advanced.created_to.trim();

  return p;
}

export function countIncidentAdvancedFilters(a: IncidentListAdvancedFilters): number {
  return Object.values(a).reduce((n, v) => (String(v).trim() !== "" ? n + 1 : n), 0);
}
