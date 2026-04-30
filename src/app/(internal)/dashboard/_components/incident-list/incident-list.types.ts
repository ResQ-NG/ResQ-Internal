import type { SampleInboxRow } from "../sampleCommandData";

export type IncidentListFilterKind = "all" | "sos" | "report";

export type IncidentListDetailPanelProps = {
  selectedRow?: SampleInboxRow | null;
  onSelectRow?: (row: SampleInboxRow | null) => void;
  /** When true, report rows load from the staff reports API; SOS stays on sample demo data */
  useLiveReports?: boolean;
};

