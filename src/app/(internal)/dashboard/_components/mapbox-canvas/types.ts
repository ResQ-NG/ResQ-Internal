import type { InboxListFilterKind } from "@/lib/constants/incident-inbox";
import type { MapIncidentPoint, MapStyleId } from "../mapSampleGeo";

export type ResQMapboxCanvasRef = {
  flyTo: (lng: number, lat: number, zoom?: number) => void;
  fitAll: () => void;
};

export type ResQMapboxCanvasProps = {
  variant: "embed" | "workspace" | "dashboard";
  className?: string;
  /** Controlled Mapbox style. Ignored when variant is `embed`. */
  mapStyleId?: MapStyleId;
  /** Legacy toggles; incident layer uses API points when override is set. */
  visibleLayers?: { projects: boolean; team: boolean; incidents?: boolean };
  /**
   * `dashboard` variant: externally controlled selected incident id.
   * When set, the canvas highlights that marker.
   */
  selectedIncidentId?: string | null;
  onSelectIncident?: (id: string | null) => void;
  /** Optional filter — only show markers within radius km of this point */
  filterCenter?: { lng: number; lat: number; radiusKm?: number } | null;
  /** Filter by kind */
  filterKind?: InboxListFilterKind;
  /**
   * Incident markers (e.g. staff reports with coordinates from the list API).
   * When omitted or empty, no incident pins are shown.
   */
  incidentPointsOverride?: MapIncidentPoint[];
};
