import { FileText, Radio, Siren } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { INBOX_ROW_KIND, type InboxRowKind } from "@/lib/constants/incident-inbox";

/** Lucide icon for staff incident reports ({@link INBOX_ROW_KIND.REPORT}). */
export const REPORT_ICON = FileText;

/** Lucide icon for Watch Me live-tracking / session flows. */
export const WATCH_ME_ICON = Radio;

/** Lucide icon for discrete emergency SOS (not framed as a Watch Me session). */
export const SOS_ICON = Siren;

export type IncidentKindIconRow = {
  kind: InboxRowKind;
  isWatchMe?: boolean;
};

/**
 * Pick the Lucide icon for an inbox/map row.
 * - Reports → {@link REPORT_ICON}
 * - SOS rows flagged as Watch Me → {@link WATCH_ME_ICON}
 * - Other SOS rows → {@link SOS_ICON}
 */
export function lucideIconForIncidentRow(row: IncidentKindIconRow): LucideIcon {
  if (row.kind === INBOX_ROW_KIND.REPORT) return REPORT_ICON;
  if (row.isWatchMe) return WATCH_ME_ICON;
  return SOS_ICON;
}
