export type SampleInboxKind = "report" | "sos";

export type SampleProcess = "pending triage" | "routing" | "assigned" | "in progress" | "resolved";

/** Tailwind text classes — shared by inbox cards and map badges. */
export function incidentProcessTextClass(process: SampleProcess): string {
  switch (process) {
    case "pending triage":
      return "text-amber-800 dark:text-amber-200";
    case "routing":
      return "text-primary-blue dark:text-primary-blue-dark";
    case "assigned":
      return "text-violet-800 dark:text-violet-200";
    case "in progress":
      return "text-accent-red dark:text-accent-red-dark";
    case "resolved":
      return "text-success-green dark:text-success-green-dark";
    default:
      return "text-captionDark dark:text-captionDark-dark";
  }
}

export type SampleMedia = {
  id: string;
  type: "image" | "video";
  /** Picsum seed URL */
  url: string;
  caption: string;
};

export type SampleTripInfo = {
  startTime: string;
  durationMin: number;
  distanceKm: number;
  checkIns: number;
};

export type SampleInboxRow = {
  id: string;
  kind: SampleInboxKind;
  summary: string;
  created: string;
  category: string | null;
  process: SampleProcess;
  /** true for Watch Me / live-tracking SOS */
  isWatchMe?: boolean;
  locationLabel?: string;
  media?: SampleMedia[];
  trip?: SampleTripInfo;
  reporterName?: string;
  phone?: string;
};

/** Shared sample inbox — keep in sync with UI that surfaces "needs attention". */
export const SAMPLE_INBOX: SampleInboxRow[] = [
  {
    id: "r-901",
    kind: "report",
    summary: "Road blockage — third mainland bridge, multiple lanes affected",
    created: "6 min ago",
    category: null,
    process: "pending triage",
    locationLabel: "Third Mainland Bridge, Lagos",
    reporterName: "Anonymous",
    media: [
      { id: "m1", type: "image", url: "https://picsum.photos/seed/resq-r901-a/400/260", caption: "Bridge obstruction" },
      { id: "m2", type: "image", url: "https://picsum.photos/seed/resq-r901-b/400/260", caption: "Traffic backup" },
    ],
  },
  {
    id: "s-204",
    kind: "sos",
    summary: "Watch Me session · user 8821 — active trip, no check-in for 18 min",
    created: "9 min ago",
    category: null,
    process: "routing",
    isWatchMe: true,
    locationLabel: "Lekki Phase 1, Lagos",
    reporterName: "Adaeze O.",
    phone: "+234 803 xxx 4821",
    media: [
      { id: "m1", type: "video", url: "https://picsum.photos/seed/resq-s204-a/400/260", caption: "Live trip recording" },
      { id: "m2", type: "image", url: "https://picsum.photos/seed/resq-s204-b/400/260", caption: "Last known location snapshot" },
    ],
    trip: { startTime: "10:42 AM", durationMin: 27, distanceKm: 4.2, checkIns: 2 },
  },
  {
    id: "r-900",
    kind: "report",
    summary: "Flooding near Balogun market — water level rising",
    created: "14 min ago",
    category: "Weather",
    process: "assigned",
    locationLabel: "Balogun Market, Lagos Island",
    reporterName: "Emeka T.",
    media: [
      { id: "m1", type: "image", url: "https://picsum.photos/seed/resq-r900-a/400/260", caption: "Street flooding" },
    ],
  },
  {
    id: "s-203",
    kind: "sos",
    summary: "SOS · silent alarm triggered — user unresponsive",
    created: "22 min ago",
    category: null,
    process: "in progress",
    isWatchMe: true,
    locationLabel: "Wuse II, Abuja",
    reporterName: "Chisom A.",
    phone: "+234 806 xxx 2203",
    media: [
      { id: "m1", type: "video", url: "https://picsum.photos/seed/resq-s203-a/400/260", caption: "Auto-recorded clip" },
      { id: "m2", type: "image", url: "https://picsum.photos/seed/resq-s203-b/400/260", caption: "Environment at alarm" },
      { id: "m3", type: "image", url: "https://picsum.photos/seed/resq-s203-c/400/260", caption: "Route segment" },
    ],
    trip: { startTime: "10:19 AM", durationMin: 41, distanceKm: 6.8, checkIns: 5 },
  },
  {
    id: "r-899",
    kind: "report",
    summary: "Medical emergency — unresponsive person at bus stop",
    created: "31 min ago",
    category: null,
    process: "pending triage",
    locationLabel: "Ojota Bus Stop, Lagos",
    reporterName: "Tunde F.",
    media: [
      { id: "m1", type: "image", url: "https://picsum.photos/seed/resq-r899-a/400/260", caption: "Scene photo" },
    ],
  },
  {
    id: "r-898",
    kind: "report",
    summary: "Power line hazard — fallen cable across road",
    created: "48 min ago",
    category: "Infrastructure",
    process: "in progress",
    locationLabel: "Ikeja GRA, Lagos",
    reporterName: "Ngozi P.",
    media: [
      { id: "m1", type: "image", url: "https://picsum.photos/seed/resq-r898-a/400/260", caption: "Fallen cable" },
      { id: "m2", type: "image", url: "https://picsum.photos/seed/resq-r898-b/400/260", caption: "Road closure" },
    ],
  },
  {
    id: "s-202",
    kind: "sos",
    summary: "Watch Me session ended · user confirmed OK",
    created: "1h ago",
    category: "Watch Me",
    process: "resolved",
    isWatchMe: true,
    locationLabel: "Garki, Abuja",
    reporterName: "Blessing K.",
    trip: { startTime: "9:15 AM", durationMin: 52, distanceKm: 8.1, checkIns: 7 },
  },
  {
    id: "r-897",
    kind: "report",
    summary: "Armed robbery in progress — two suspects, residential area",
    created: "1h 12m ago",
    category: null,
    process: "pending triage",
    locationLabel: "Port Harcourt GRA",
    reporterName: "Anonymous",
    media: [
      { id: "m1", type: "image", url: "https://picsum.photos/seed/resq-r897-a/400/260", caption: "Street view" },
    ],
  },
  {
    id: "s-201",
    kind: "sos",
    summary: "Watch Me · user 7742 — late check-in, session still active",
    created: "1h 28m ago",
    category: null,
    process: "routing",
    isWatchMe: true,
    locationLabel: "Kano Municipal",
    reporterName: "Fatima M.",
    phone: "+234 802 xxx 7742",
    media: [
      { id: "m1", type: "video", url: "https://picsum.photos/seed/resq-s201-a/400/260", caption: "Trip recording segment" },
    ],
    trip: { startTime: "9:01 AM", durationMin: 87, distanceKm: 12.3, checkIns: 3 },
  },
  {
    id: "r-896",
    kind: "report",
    summary: "Gas leak near school — fumes reported by teachers",
    created: "2h ago",
    category: null,
    process: "assigned",
    locationLabel: "Benin City, Edo",
    reporterName: "Seun A.",
    media: [
      { id: "m1", type: "image", url: "https://picsum.photos/seed/resq-r896-a/400/260", caption: "School surroundings" },
    ],
  },
];

export function sampleInboxUncategorizedCount(): number {
  return SAMPLE_INBOX.filter((r) => r.category === null).length;
}

export function sampleInboxAttentionCount(): number {
  return SAMPLE_INBOX.filter((r) => r.category === null || r.process === "pending triage" || r.process === "routing").length;
}

/** Rows that appear on the map — unattended SOS and uncategorized reports */
export function sampleUnattendedRows(): SampleInboxRow[] {
  return SAMPLE_INBOX.filter(
    (r) => r.category === null || r.kind === "sos"
  );
}

export type AdminMediaFeedItem = {
  id: string;
  outlet: string;
  title: string;
  /** Stable Lorem Picsum image for demo previews */
  imageSeed: string;
  live: boolean;
};

export const SAMPLE_ADMIN_MEDIA_ON_AIR: AdminMediaFeedItem[] = [
  { id: "m1", outlet: "NTA Network", title: "Flood watch · evening bulletin", imageSeed: "resq-media-1", live: true },
  { id: "m2", outlet: "Channels 24", title: "Agency briefing — joint desk", imageSeed: "resq-media-2", live: true },
  { id: "m3", outlet: "ResQ Studio", title: "Situation map walkthrough", imageSeed: "resq-media-3", live: false },
  { id: "m4", outlet: "UNICEF Field", title: "School corridor safety", imageSeed: "resq-media-4", live: true },
];

// ─── State Heatmap ────────────────────────────────────────────────────────────

export type StateHeatmapRow = {
  state: string;
  uncategorized: number;
  sos: number;
  /** approximate centroid for map fly-to */
  lat: number;
  lng: number;
};

export const SAMPLE_STATE_HEATMAP: StateHeatmapRow[] = [
  { state: "Lagos", uncategorized: 34, sos: 12, lat: 6.5244, lng: 3.3792 },
  { state: "Abuja (FCT)", uncategorized: 18, sos: 7, lat: 9.0579, lng: 7.4951 },
  { state: "Rivers", uncategorized: 21, sos: 9, lat: 4.8156, lng: 7.0498 },
  { state: "Kano", uncategorized: 14, sos: 5, lat: 11.9914, lng: 8.5317 },
  { state: "Edo", uncategorized: 11, sos: 4, lat: 6.335, lng: 5.627 },
  { state: "Ogun", uncategorized: 9, sos: 3, lat: 7.16, lng: 3.347 },
  { state: "Enugu", uncategorized: 7, sos: 2, lat: 6.441, lng: 7.499 },
  { state: "Borno", uncategorized: 16, sos: 8, lat: 11.846, lng: 13.16 },
  { state: "Delta", uncategorized: 10, sos: 4, lat: 5.52, lng: 5.897 },
  { state: "Kaduna", uncategorized: 13, sos: 6, lat: 10.526, lng: 7.438 },
  { state: "Oyo", uncategorized: 8, sos: 2, lat: 7.857, lng: 3.947 },
  { state: "Anambra", uncategorized: 6, sos: 1, lat: 6.21, lng: 6.957 },
];

// ─── Analytics snapshot ───────────────────────────────────────────────────────

export type AnalyticsSnapshot = {
  activeUsers: number;
  activeUsersDelta: string;
  activeUsersUp: boolean;
  activeAgents: number;
  activeAgentsDelta: string;
  activeAgentsUp: boolean;
  newSignups: number;
  newSignupsDelta: string;
  newSignupsUp: boolean;
  resolvedThisWeek: number;
  resolvedThisWeekDelta: string;
  resolvedThisWeekUp: boolean;
};

export const SAMPLE_ANALYTICS: AnalyticsSnapshot = {
  activeUsers: 1284,
  activeUsersDelta: "+6.2%",
  activeUsersUp: true,
  activeAgents: 47,
  activeAgentsDelta: "+2 this week",
  activeAgentsUp: true,
  newSignups: 213,
  newSignupsDelta: "+18% vs last week",
  newSignupsUp: true,
  resolvedThisWeek: 89,
  resolvedThisWeekDelta: "+14% vs last week",
  resolvedThisWeekUp: true,
};
