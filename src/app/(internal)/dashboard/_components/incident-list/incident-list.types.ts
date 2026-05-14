import type { SampleInboxRow } from "../sampleCommandData";

export type { InboxListFilterKind as IncidentListFilterKind } from "@/lib/constants/incident-inbox";

/** Extra staff-reports query fields (see `ReportQueryParamsDTO`). */
export type IncidentListAdvancedFilters = {
  country: string;
  state: string;
  city: string;
  reporter_name: string;
  created_from: string;
  created_to: string;
};

export const INCIDENT_LIST_ADVANCED_EMPTY: IncidentListAdvancedFilters = {
  country: "",
  state: "",
  city: "",
  reporter_name: "",
  created_from: "",
  created_to: "",
};

export type IncidentListDetailPanelProps = {
  selectedRow?: SampleInboxRow | null;
  onSelectRow?: (row: SampleInboxRow | null) => void;
  /** When true, report rows load from the staff reports API; SOS stays on sample demo data */
  useLiveReports?: boolean;
  /** Optional hook for workspace map markers (live rows with coordinates). */
  onApiRowsChange?: (rows: SampleInboxRow[]) => void;
  /**
   * When true, selecting a row replaces the list body with the full
   * IncidentDetailCard inside the same panel (instead of a floating right card).
   * A back button lets the user return to the list.
   */
  showDetailInPanel?: boolean;
};
