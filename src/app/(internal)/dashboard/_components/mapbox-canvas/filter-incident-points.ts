import {
  INBOX_LIST_FILTER,
  INBOX_ROW_KIND,
  type InboxListFilterKind,
} from "@/lib/constants/incident-inbox";
import type { MapIncidentPoint } from "../mapSampleGeo";

export function filterMapIncidentPoints(
  points: MapIncidentPoint[],
  filterKind: InboxListFilterKind,
  filterCenter: { lng: number; lat: number; radiusKm?: number } | null | undefined
): MapIncidentPoint[] {
  let pts = points;
  if (filterKind === INBOX_LIST_FILTER.SOS)
    pts = pts.filter((p) => p.kind === INBOX_ROW_KIND.SOS);
  if (filterKind === INBOX_LIST_FILTER.REPORT)
    pts = pts.filter((p) => p.kind === INBOX_ROW_KIND.REPORT);
  if (filterCenter) {
    const { lng, lat, radiusKm = 100 } = filterCenter;
    pts = pts.filter((p) => {
      const dLat = (p.lat - lat) * (Math.PI / 180);
      const dLng = (p.lng - lng) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat * (Math.PI / 180)) *
          Math.cos(p.lat * (Math.PI / 180)) *
          Math.sin(dLng / 2) ** 2;
      const dist = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return dist <= radiusKm;
    });
  }
  return pts;
}
