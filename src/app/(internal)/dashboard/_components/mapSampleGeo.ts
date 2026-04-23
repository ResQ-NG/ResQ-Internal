import { SAMPLE_INBOX, sampleUnattendedRows, type SampleInboxRow } from "./sampleCommandData";

export type MapProjectPoint = {
  id: string;
  lat: number;
  lng: number;
  project: string;
  count: number;
  color: string;
};

export const MAP_PROJECT_POINTS: MapProjectPoint[] = [
  { id: "1", lat: 6.5244, lng: 3.3792, project: "Lagos corridor", count: 38, color: "#0000FF" },
  { id: "2", lat: 9.0765, lng: 7.3986, project: "Abuja metro", count: 22, color: "#2563eb" },
  { id: "3", lat: 4.8156, lng: 7.0498, project: "Rivers delta", count: 19, color: "#7c3aed" },
  { id: "4", lat: 11.9914, lng: 8.5317, project: "Kano north", count: 14, color: "#0891b2" },
  { id: "5", lat: 7.25, lng: 5.2, project: "Edo / central", count: 11, color: "#0d9488" },
];

export type MapActivityPoint = {
  id: string;
  lat: number;
  lng: number;
  team: string;
  action: string;
  when: string;
  color: string;
};

export const MAP_ACTIVITY_POINTS: MapActivityPoint[] = [
  { id: "a1", lat: 6.45, lng: 3.35, team: "Field unit A", action: "On-site verification", when: "12m ago", color: "#16a34a" },
  { id: "a2", lat: 9.05, lng: 7.42, team: "Dispatch north", action: "Agency handoff", when: "28m ago", color: "#ca8a04" },
  { id: "a3", lat: 4.77, lng: 7.02, team: "Coast response", action: "SOS session joined", when: "41m ago", color: "#dc2626" },
  { id: "a4", lat: 8.12, lng: 4.56, team: "Logistics", action: "Supplies routed", when: "1h ago", color: "#2563eb" },
  { id: "a5", lat: 10.52, lng: 7.44, team: "Field unit B", action: "Case closed", when: "2h ago", color: "#64748b" },
];

export const MAP_DEFAULT_CENTER = { lng: 6.5, lat: 8.5 } as const;
export const MAP_DEFAULT_ZOOM = 6;

export type { MapStyleId } from "@/lib/mapbox-env";

/** Inbox rows with demo coordinates (aligned with Nigeria sample region). */
export type MapIncidentPoint = SampleInboxRow & { lat: number; lng: number };

/** Expanded coordinates for all 10 sample inbox rows */
const INCIDENT_MAP_COORDS: readonly [number, number][] = [
  [3.382, 6.505],   // r-901 – Third Mainland Bridge, Lagos
  [3.456, 6.443],   // s-204 – Lekki Phase 1, Lagos
  [3.377, 6.461],   // r-900 – Balogun Market, Lagos Island
  [7.492, 9.062],   // s-203 – Wuse II, Abuja
  [3.358, 6.572],   // r-899 – Ojota Bus Stop, Lagos
  [3.341, 6.601],   // r-898 – Ikeja GRA, Lagos
  [7.471, 9.04],    // s-202 – Garki, Abuja
  [7.013, 4.793],   // r-897 – Port Harcourt GRA
  [8.517, 12.003],  // s-201 – Kano Municipal
  [5.614, 6.317],   // r-896 – Benin City, Edo
];

export const MAP_INCIDENT_POINTS: MapIncidentPoint[] = SAMPLE_INBOX.map((row, i) => {
  const [lng, lat] = INCIDENT_MAP_COORDS[i % INCIDENT_MAP_COORDS.length];
  return { ...row, lng, lat };
});

/** Only the unattended rows (SOS + uncategorized) with coordinates */
export const MAP_UNATTENDED_POINTS: MapIncidentPoint[] = sampleUnattendedRows().map((row) => {
  const full = MAP_INCIDENT_POINTS.find((p) => p.id === row.id);
  return full ?? { ...row, lng: 3.382, lat: 6.505 };
});

export function allSampleLngLats(): [number, number][] {
  return [
    ...MAP_PROJECT_POINTS.map((p) => [p.lng, p.lat] as [number, number]),
    ...MAP_ACTIVITY_POINTS.map((p) => [p.lng, p.lat] as [number, number]),
    ...MAP_INCIDENT_POINTS.map((p) => [p.lng, p.lat] as [number, number]),
  ];
}

export function unattendedLngLats(): [number, number][] {
  return MAP_UNATTENDED_POINTS.map((p) => [p.lng, p.lat] as [number, number]);
}
