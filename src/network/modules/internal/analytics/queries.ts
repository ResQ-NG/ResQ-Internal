import { createApiQuery } from "@/network/client.constructor";
import {
  BasicHealthAnalyticsResponse,
  BasicUserAnalyticsResponse,
  IncidentsHeatMapRequest,
  IncidentsHeatMapResponse,
  RecognizedIncidentsLocationsRequest,
  RecognizedIncidentsLocationsResponse,
} from "./types";
import { InternalAnalyticsRoutes } from "./routes";
import { InternalAnalyticsKeys } from "./keys";

export const useBasicUserAnalytics = createApiQuery<
  unknown,
  BasicUserAnalyticsResponse
>({
  queryKey: [InternalAnalyticsKeys.BasicUserAnalytics],
  endpoint: InternalAnalyticsRoutes.GetBasicUserAnalytics,
  operationName: "Get basic user analytics",
});

export const useBasicHealthAnalytics = createApiQuery<
  unknown,
  BasicHealthAnalyticsResponse
>({
  queryKey: [InternalAnalyticsKeys.BasicHealthAnalytics],
  endpoint: InternalAnalyticsRoutes.GetBasicHealthAnalytics,
  operationName: "Get basic health analytics",
});

export const useGetRecognizedIncidentsLocations = createApiQuery<
  RecognizedIncidentsLocationsRequest,
  RecognizedIncidentsLocationsResponse
>({
  queryKey: [InternalAnalyticsKeys.RecognizedIncidentsLocations],
  endpoint: InternalAnalyticsRoutes.GetRecognizedIncidentsLocations,
  operationName: "Get recognized incidents locations",
});

export const GetUncategorizedIncidentsHeatMap = createApiQuery<
  IncidentsHeatMapRequest,
  IncidentsHeatMapResponse
>({
  queryKey: [InternalAnalyticsKeys.UncategorizedIncidentsHeatMap],
  endpoint: InternalAnalyticsRoutes.GetUncategorizedIncidentsHeatMap,
  operationName: "Get uncategorized incidents heat map",
});
