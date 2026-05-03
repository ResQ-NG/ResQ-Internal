/**
 * Canonical inbox / map channel values — use these instead of string literals
 * (`"report"`, `"sos"`, `"all"`, …) across dashboard and stores.
 */

/** What a single inbox row represents (API + map + list). */
export const INBOX_ROW_KIND = {
  REPORT: "report",
  SOS: "sos",
} as const;

export type InboxRowKind = (typeof INBOX_ROW_KIND)[keyof typeof INBOX_ROW_KIND];

/** List and map filter tabs (includes aggregate “all”). */
export const INBOX_LIST_FILTER = {
  ALL: "all",
  SOS: "sos",
  REPORT: "report",
} as const;

export type InboxListFilterKind =
  (typeof INBOX_LIST_FILTER)[keyof typeof INBOX_LIST_FILTER];

/** SOS channel or Watch Me–flagged row (red / live treatment in UI). */
export function isSosOrWatchMeRow(row: {
  kind: InboxRowKind;
  isWatchMe?: boolean;
}): boolean {
  return row.kind === INBOX_ROW_KIND.SOS || Boolean(row.isWatchMe);
}
