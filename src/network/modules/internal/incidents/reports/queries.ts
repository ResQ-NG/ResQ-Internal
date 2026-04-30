import { createInfiniteCursorApiQuery } from "@/network/client.constructor";
import { StaffIncidenceReportsKeys } from "./keys";
import { StaffIncidenceReportsRoutes } from "./routes";
import { ReportListItemDTO, ReportQueryParamsDTO } from "./types";

export const useInfiniteReports = createInfiniteCursorApiQuery<
  ReportQueryParamsDTO,
  ReportListItemDTO
>({
  queryKey: [StaffIncidenceReportsKeys.ReportList],
  endpoint: StaffIncidenceReportsRoutes.GetReports,
  operationName: "List staff reports (cursor)",
  dataField: "items",
});
