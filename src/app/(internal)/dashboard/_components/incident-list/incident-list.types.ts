import type { SampleInboxRow } from "../sampleCommandData";

export type { InboxListFilterKind as IncidentListFilterKind } from "@/lib/constants/incident-inbox";

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
