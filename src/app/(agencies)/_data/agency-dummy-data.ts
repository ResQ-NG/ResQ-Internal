/**
 * Static demo data for the agencies surface only — replace with API calls later.
 */

export type AgencySeverity = "low" | "medium" | "high" | "critical";

export const AGENCY_PROFILE = {
  shortCode: "NA",
  name: "National Safety Agency",
  subtitle: "Mainland Operations Branch · Lagos",
  jurisdiction: "Lagos State · Ogun corridor",
} as const;

export const AGENCY_OVERVIEW_STATS = [
  {
    key: "reports24h",
    label: "New reports today",
    value: "63",
    hint: "Incoming reports routed to this agency in the last 24 hours.",
  },
  {
    key: "openCases",
    label: "Open cases",
    value: "27",
    hint: "Cases currently in investigation or coordinated response.",
  },
  {
    key: "avgResponse",
    label: "Avg. first response",
    value: "23 min",
    hint: "Median time from report intake to first agency touch (demo).",
  },
] as const;

export type AgencyLiveFeedItem = {
  id: string;
  title: string;
  location: string;
  timeLabel: string;
  severity: AgencySeverity;
  category: string;
};

export const AGENCY_LIVE_FEED: AgencyLiveFeedItem[] = [
  {
    id: "feed-1",
    title: "Multi-vehicle incident — Third Mainland approach",
    location: "Third Mainland Bridge, Lagos",
    timeLabel: "4 min ago",
    severity: "critical",
    category: "Traffic / collision",
  },
  {
    id: "feed-2",
    title: "Flooding reported near market access roads",
    location: "Mile 12, Ketu",
    timeLabel: "12 min ago",
    severity: "high",
    category: "Weather / flooding",
  },
  {
    id: "feed-3",
    title: "Street lighting outage — elevated safety concern",
    location: "Surulere, Bode Thomas axis",
    timeLabel: "26 min ago",
    severity: "medium",
    category: "Infrastructure",
  },
  {
    id: "feed-4",
    title: "Community drill coordination request",
    location: "Ikeja GRA",
    timeLabel: "41 min ago",
    severity: "low",
    category: "Planning",
  },
  {
    id: "feed-5",
    title: "Hazmat concern — warehouse perimeter check",
    location: "Apapa industrial zone",
    timeLabel: "58 min ago",
    severity: "high",
    category: "Industrial",
  },
];

export type AgencyMapHotspot = {
  id: string;
  label: string;
  xPct: number;
  yPct: number;
  severity: AgencySeverity;
};

/** Relative positions inside a faux map panel (0–100%). */
export const AGENCY_MAP_HOTSPOTS: AgencyMapHotspot[] = [
  { id: "h1", label: "Mile 12", xPct: 38, yPct: 22, severity: "high" },
  { id: "h2", label: "Apapa", xPct: 18, yPct: 62, severity: "medium" },
  { id: "h3", label: "Lekki", xPct: 72, yPct: 48, severity: "low" },
  { id: "h4", label: "Mainland bridge", xPct: 45, yPct: 35, severity: "critical" },
  { id: "h5", label: "Ikeja", xPct: 52, yPct: 18, severity: "medium" },
];

export type AgencyCaseStatus =
  | "intake"
  | "investigating"
  | "field_response"
  | "closed";

export type AgencyCaseRow = {
  id: string;
  reference: string;
  title: string;
  status: AgencyCaseStatus;
  lead: string;
  updatedLabel: string;
  region: string;
};

export const AGENCY_CASES: AgencyCaseRow[] = [
  {
    id: "case-2401",
    reference: "NSA-2401",
    title: "Coordinated flood response — Kosofe",
    status: "field_response",
    lead: "DSP Adeyemi",
    updatedLabel: "12 min ago",
    region: "Kosofe",
  },
  {
    id: "case-2398",
    reference: "NSA-2398",
    title: "Bridge debris and lane closure",
    status: "investigating",
    lead: "Eng. Okonkwo",
    updatedLabel: "38 min ago",
    region: "Island",
  },
  {
    id: "case-2392",
    reference: "NSA-2392",
    title: "Night-market electrical hazard",
    status: "intake",
    lead: "Unassigned",
    updatedLabel: "2 hr ago",
    region: "Somolu",
  },
  {
    id: "case-2384",
    reference: "NSA-2384",
    title: "School route safety audit follow-up",
    status: "closed",
    lead: "Capt. Ibrahim",
    updatedLabel: "Yesterday",
    region: "Ikeja",
  },
];

export type AgencyCaseEvent = {
  id: string;
  timeLabel: string;
  title: string;
  detail: string;
};

export type AgencyCasePerson = {
  id: string;
  role: string;
  name: string;
  note?: string;
};

export type AgencyCaseLinkedReport = {
  id: string;
  summary: string;
  timeLabel: string;
};

export type AgencyCaseDetail = AgencyCaseRow & {
  summary: string;
  openedLabel: string;
  timeline: AgencyCaseEvent[];
  people: AgencyCasePerson[];
  linkedReports: AgencyCaseLinkedReport[];
};

const CASE_DETAILS: Record<string, AgencyCaseDetail> = {
  "case-2401": {
    id: "case-2401",
    reference: "NSA-2401",
    title: "Coordinated flood response — Kosofe",
    status: "field_response",
    lead: "DSP Adeyemi",
    updatedLabel: "12 min ago",
    region: "Kosofe",
    summary:
      "Rapid accumulation of surface water after sustained rainfall; community reports blocked drains and stranded vehicles. Field teams coordinating with LASEMA.",
    openedLabel: "Today · 06:12",
    timeline: [
      {
        id: "ev-1",
        timeLabel: "06:12",
        title: "Case opened from merged reports",
        detail: "Three public reports consolidated into a single case file.",
      },
      {
        id: "ev-2",
        timeLabel: "06:40",
        title: "Lead investigator assigned",
        detail: "DSP Adeyemi acknowledged dispatch window and staging point.",
      },
      {
        id: "ev-3",
        timeLabel: "07:05",
        title: "Field unit en route",
        detail: "Two units + pump truck requested from adjacent command.",
      },
    ],
    people: [
      { id: "p1", role: "Lead", name: "DSP Adeyemi", note: "Field command" },
      { id: "p2", role: "Liaison", name: "Chioma E.", note: "LGA desk" },
      { id: "p3", role: "Witness", name: "Anonymous reporter", note: "Via app" },
    ],
    linkedReports: [
      {
        id: "lr-1",
        summary: "Standing water at major intersection",
        timeLabel: "06:08",
      },
      {
        id: "lr-2",
        summary: "Drain blockage — photo evidence",
        timeLabel: "06:11",
      },
    ],
  },
  "case-2398": {
    id: "case-2398",
    reference: "NSA-2398",
    title: "Bridge debris and lane closure",
    status: "investigating",
    lead: "Eng. Okonkwo",
    updatedLabel: "38 min ago",
    region: "Island",
    summary:
      "Structural assessment requested after debris sighting on pedestrian walkway; traffic police notified for partial lane control.",
    openedLabel: "Yesterday · 16:20",
    timeline: [
      {
        id: "ev-1",
        timeLabel: "16:20",
        title: "Case opened",
        detail: "Initial report from patrol unit.",
      },
      {
        id: "ev-2",
        timeLabel: "17:02",
        title: "Engineering consult",
        detail: "Photos uploaded; priority review queued.",
      },
    ],
    people: [
      { id: "p1", role: "Lead", name: "Eng. Okonkwo" },
      { id: "p2", role: "Traffic", name: "Unit 14B" },
    ],
    linkedReports: [
      { id: "lr-1", summary: "Debris on walkway — patrol", timeLabel: "16:18" },
    ],
  },
};

export function getAgencyCaseById(id: string): AgencyCaseDetail | undefined {
  return CASE_DETAILS[id];
}

export function getAgencyCaseRowById(id: string): AgencyCaseRow | undefined {
  return AGENCY_CASES.find((c) => c.id === id);
}

/** Full demo detail when available; otherwise a thin shell from the case row. */
export function getAgencyCaseDetailOrFallback(id: string): AgencyCaseDetail | null {
  const full = CASE_DETAILS[id];
  if (full) return full;
  const row = getAgencyCaseRowById(id);
  if (!row) return null;
  return {
    ...row,
    summary:
      "Extended timeline and people blocks are demo-only for selected cases. Hook your API here for full detail.",
    openedLabel: "—",
    timeline: [],
    people: [],
    linkedReports: [],
  };
}

export type AgencyRegionMetric = {
  region: string;
  openCount: number;
  responsePct: number;
};

export const AGENCY_REGION_METRICS: AgencyRegionMetric[] = [
  { region: "Island", openCount: 9, responsePct: 88 },
  { region: "Mainland", openCount: 14, responsePct: 81 },
  { region: "Ikorodu corridor", openCount: 4, responsePct: 92 },
  { region: "Badagry axis", openCount: 3, responsePct: 76 },
];

export type AgencyBroadcast = {
  id: string;
  title: string;
  audience: string;
  startedLabel: string;
  status: "live" | "scheduled" | "ended";
};

export const AGENCY_BROADCASTS_ACTIVE: AgencyBroadcast[] = [
  {
    id: "bc-a1",
    title: "Heavy rainfall advisory — next 6 hours",
    audience: "Public + media partners",
    startedLabel: "Live · 09:10",
    status: "live",
  },
  {
    id: "bc-a2",
    title: "Alternate routes — bridge maintenance window",
    audience: "Dispatch + field apps",
    startedLabel: "Scheduled · 14:00",
    status: "scheduled",
  },
];

export const AGENCY_BROADCASTS_HISTORY: AgencyBroadcast[] = [
  {
    id: "bc-h1",
    title: "Heat stress precautions — market districts",
    audience: "Public",
    startedLabel: "Ended · Mon 18:30",
    status: "ended",
  },
  {
    id: "bc-h2",
    title: "Drill notice — Ikeja corridor",
    audience: "Agency staff",
    startedLabel: "Ended · Sun 11:00",
    status: "ended",
  },
];

export const AGENCY_SETTINGS_PROFILE_FIELDS = [
  { key: "name", label: "Agency legal name", value: AGENCY_PROFILE.name },
  {
    key: "hq",
    label: "Headquarters address",
    value: "15 Herbert Macaulay Way, Yaba, Lagos",
  },
  {
    key: "line",
    label: "Ops hotline",
    value: "+234 (0) 800 000 RESQ",
  },
  {
    key: "email",
    label: "Public inquiries",
    value: "ops@nationalsafety.demo",
  },
] as const;

export const AGENCY_SETTINGS_ROUTING_SNIPPET =
  "Reports tagged “flooding” or “weather” in Lagos mainland → Kosofe response queue → auto-link to open case if within 2 km.";

export const AGENCY_SETTINGS_STAFF_ROWS = [
  { name: "DSP Adeyemi", role: "Field supervisor", access: "Full ops" },
  { name: "Eng. Okonkwo", role: "Structures lead", access: "Cases + map" },
  { name: "Chioma E.", role: "LGA liaison", access: "Cases (read)" },
] as const;
