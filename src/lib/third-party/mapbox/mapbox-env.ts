export type MapStyleId =
  | "light"
  | "streets"
  | "dark"
  | "satellite"
  | "outdoors"
  | "navigation-day"
  | "navigation-night"
  | "traffic"
  | "trafficNight"
  | "emerald";

const STYLE_FALLBACK: Record<MapStyleId, string> = {
  light: "mapbox://styles/mapbox/light-v11",
  streets: "mapbox://styles/mapbox/streets-v12",
  dark: "mapbox://styles/mapbox/dark-v11",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
  outdoors: "mapbox://styles/mapbox/outdoors-v12",
  "navigation-day": "mapbox://styles/mapbox/navigation-day-v1",
  "navigation-night": "mapbox://styles/mapbox/navigation-night-v1",
  // More Mapbox style presets can be added here in the future:
  // For example:

  traffic: "mapbox://styles/mapbox/traffic-day-v2",
  trafficNight: "mapbox://styles/mapbox/traffic-night-v2",
  emerald: "mapbox://styles/mapbox/emerald-v9",
};

function readStyleEnv(key: string): string | undefined {
  if (typeof process === "undefined") return undefined;
  const v = process.env[key];
  const t = typeof v === "string" ? v.trim() : "";
  return t.length > 0 ? t : undefined;
}

/**
 * Resolved Mapbox style URL for a UI preset. Optional overrides:
 * - `NEXT_PUBLIC_MAPBOX_STYLE_URL` → streets embed light
 * - `NEXT_PUBLIC_MAPBOX_STYLE_URL_DARK` → dark / embed dark
 * Light, Satellite, Outdoors, and Navigation presets use default Mapbox styles.
 */
export function getMapboxStyleUrl(id: MapStyleId): string {
  if (id === "streets") {
    return (
      readStyleEnv("NEXT_PUBLIC_MAPBOX_STYLE_URL") ?? STYLE_FALLBACK.streets
    );
  }
  if (id === "dark") {
    return (
      readStyleEnv("NEXT_PUBLIC_MAPBOX_STYLE_URL_DARK") ?? STYLE_FALLBACK.dark
    );
  }
  if (id === "light") return STYLE_FALLBACK.light;
  if (id === "outdoors") return STYLE_FALLBACK.outdoors;
  if (id === "navigation-day") return STYLE_FALLBACK["navigation-day"];
  if (id === "navigation-night") return STYLE_FALLBACK["navigation-night"];
  return STYLE_FALLBACK.satellite;
}

/**
 * Public Mapbox token (browser-safe). Set in `.env.local`:
 * `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.…`
 */
export function getMapboxAccessToken(): string | undefined {
  if (typeof process === "undefined") return undefined;
  const t = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  return t && t.length > 0 ? t : undefined;
}
