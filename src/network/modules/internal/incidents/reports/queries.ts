import { createApiQuery, createInfiniteCursorApiQuery } from "@/network/client.constructor";
import { StaffIncidenceReportsKeys } from "./keys";
import { StaffIncidenceReportsRoutes } from "./routes";
import { ReportDetailDTO, ReportListItemDTO, ReportQueryParamsDTO } from "./types";

export const useInfiniteReports = createInfiniteCursorApiQuery<
  ReportQueryParamsDTO,
  ReportListItemDTO
>({
  queryKey: [StaffIncidenceReportsKeys.ReportList],
  endpoint: StaffIncidenceReportsRoutes.GetReports,
  operationName: "List staff reports (cursor)",
  dataField: "items",
});

export const useGetReportDetails = createApiQuery<
  { id: number },
  ReportDetailDTO
>({
  endpoint: (variable) =>
    StaffIncidenceReportsRoutes.GetReportDetails(variable.id),
  queryKey: [StaffIncidenceReportsKeys.ReportDetail],
  operationName: "Get report details",
  enabled: (variable) => Number.isFinite(variable?.id) && (variable?.id ?? 0) > 0,
});
