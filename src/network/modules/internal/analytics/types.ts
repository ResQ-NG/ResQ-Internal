export interface BasicUserAnalyticsResponse {
  active_agents: number;
  new_users_this_week: {
    number: number;
    percentage: number;
  };
  resolved_reports: number;
  total_users: number;
}

export interface BasicHealthAnalyticsResponse {
  alert_pipeline_uptime?: number;
  api_uptime?: number;
  background_jobs_uptime?: number;
  latency?: number;
  web_socket_uptime?: number;
}

export interface RecognizedIncidentsLocationsRequest {
  /**
   * When set, cities are limited to this state (exact match)
   */
  state?: string;
  limit?: number;
}

export interface RecognizedIncidentsLocationsResponse {
  cities: Array<{
    city: string;
    state: string;
  }>;
  states: string[];
}

export interface IncidentsHeatMapRequest {
  group_by: string;
  limit?: number;
  state?: string;
  city?: string;
}
export interface IncidentsHeatMapResponse {
  group_by: string;
  items: Array<{
    city: string;
    state: string;
    count: number;
  }>;
  total: number;
}
