import type { SampleInboxRow } from "./sampleCommandData";

/** Inbox row with coordinates (from API list / detail — no demo geometry). */
export type MapIncidentPoint = SampleInboxRow & { lat: number; lng: number };

export const MAP_DEFAULT_CENTER = { lng: 6.5, lat: 8.5 } as const;
export const MAP_DEFAULT_ZOOM = 6;

export type { MapStyleId } from "@/lib/third-party/mapbox/mapbox-env";
