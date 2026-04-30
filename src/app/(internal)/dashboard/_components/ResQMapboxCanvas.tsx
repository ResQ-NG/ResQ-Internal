"use client";

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  type MapRef,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { FileText, Focus, Radio } from "lucide-react";
import { getMapboxAccessToken, getMapboxStyleUrl } from "@/lib/mapbox-env";
import { cn } from "@/lib/utils";
import { incidentProcessTextClass } from "./sampleCommandData";
import {
  MAP_ACTIVITY_POINTS,
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_INCIDENT_POINTS,
  MAP_PROJECT_POINTS,
  MAP_UNATTENDED_POINTS,
  allSampleLngLats,
  unattendedLngLats,
  type MapIncidentPoint,
  type MapStyleId,
} from "./mapSampleGeo";

const controlBtn =
  "flex h-9 w-9 items-center justify-center rounded-lg border border-captionDark/20 bg-surface-light/95 text-primaryDark shadow-sm backdrop-blur-md transition-colors hover:bg-primary-blue/10 hover:border-primary-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue dark:border-captionDark-dark/30 dark:bg-surface-dark/95 dark:text-primaryDark-dark dark:hover:bg-primary-blue-dark/15 dark:hover:border-primary-blue-dark/50 dark:focus-visible:ring-primary-blue-dark dark:ring-offset-surface-dark";

const controlBtnWorkspace =
  "flex h-10 w-10 items-center justify-center rounded-xl border border-captionDark/20 bg-surface-light/95 text-primaryDark shadow-md backdrop-blur-md transition-colors hover:bg-primary-blue/10 hover:border-primary-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue dark:border-captionDark-dark/30 dark:bg-surface-dark/95 dark:text-primaryDark-dark dark:hover:bg-primary-blue-dark/15 dark:hover:border-primary-blue-dark/50 dark:focus-visible:ring-primary-blue-dark dark:ring-offset-surface-dark";

type Selected =
  | { kind: "project"; id: string }
  | { kind: "activity"; id: string }
  | { kind: "incident"; id: string }
  | null;

export type ResQMapboxCanvasRef = {
  flyTo: (lng: number, lat: number, zoom?: number) => void;
  fitAll: () => void;
};

export type ResQMapboxCanvasProps = {
  variant: "embed" | "workspace" | "dashboard";
  className?: string;
  /** Controlled Mapbox style. Ignored when variant is `embed`. */
  mapStyleId?: MapStyleId;
  visibleLayers?: { projects: boolean; team: boolean; incidents?: boolean };
  /**
   * `dashboard` variant: externally controlled selected incident id.
   * When set, the canvas highlights that marker and suppresses its popup.
   */
  selectedIncidentId?: string | null;
  onSelectIncident?: (id: string | null) => void;
  /** Optional filter — only show markers within radius km of this point */
  filterCenter?: { lng: number; lat: number; radiusKm?: number } | null;
  /** Filter by kind */
  filterKind?: "all" | "sos" | "report";
};

function MapboxTokenMissing({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-captionDark/30 bg-surface-light/90 p-6 text-center dark:border-captionDark-dark/30 dark:bg-primaryDark/40",
        className
      )}
    >
      <p className="max-w-md text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
        Mapbox token required
      </p>
      <p className="max-w-md text-xs text-captionDark dark:text-captionDark-dark">
        Add{" "}
        <code className="rounded bg-captionDark/10 px-1 py-0.5 text-[11px]">
          NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        </code>{" "}
        to{" "}
        <code className="rounded bg-captionDark/10 px-1 py-0.5 text-[11px]">
          .env.local
        </code>{" "}
        (public token from your Mapbox account), then restart the dev server.
      </p>
    </div>
  );
}

export const ResQMapboxCanvas = forwardRef<
  ResQMapboxCanvasRef,
  ResQMapboxCanvasProps
>(function ResQMapboxCanvas(
  {
    variant,
    className,
    mapStyleId = "streets",
    visibleLayers = { projects: true, team: true, incidents: true },
    selectedIncidentId,
    onSelectIncident,
    filterCenter,
    filterKind = "all",
  },
  ref
) {
  const showIncidents = visibleLayers.incidents !== false;
  const isDashboard = variant === "dashboard";
  const token = getMapboxAccessToken();
  const mapRef = useRef<MapRef>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [internalSelected, setInternalSelected] = useState<Selected>(null);
  const [isDarkApp, setIsDarkApp] = useState(false);

  const resizeMap = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    map.resize();
    requestAnimationFrame(() => {
      map.resize();
    });
  }, []);

  useEffect(() => {
    if (!token) return;
    const el = hostRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      resizeMap();
    });
    ro.observe(el);
    resizeMap();
    return () => ro.disconnect();
  }, [token, resizeMap, mapStyleId, variant]);

  // Expose imperative handle for parent fly-to
  useImperativeHandle(ref, () => ({
    flyTo: (lng, lat, zoom = 13) => {
      mapRef.current
        ?.getMap()
        .flyTo({ center: [lng, lat], zoom, duration: 800 });
    },
    fitAll: () => fitAll(),
  }));

  useEffect(() => {
    if (variant !== "embed") return;
    const sync = () =>
      setIsDarkApp(document.documentElement.classList.contains("dark"));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => mo.disconnect();
  }, [variant]);

  const mapStyle = useMemo(() => {
    if (variant === "embed") {
      return isDarkApp ? getMapboxStyleUrl("dark") : getMapboxStyleUrl("light");
    }
    return getMapboxStyleUrl(mapStyleId);
  }, [variant, isDarkApp, mapStyleId]);

  const maxProject = useMemo(
    () => Math.max(...MAP_PROJECT_POINTS.map((p) => p.count)),
    []
  );

  const fitAll = useCallback(() => {
    const pts = isDashboard ? unattendedLngLats() : allSampleLngLats();
    if (pts.length === 0) return;
    let minLng = pts[0][0];
    let minLat = pts[0][1];
    let maxLng = pts[0][0];
    let maxLat = pts[0][1];
    for (const [lng, lat] of pts) {
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
    }
    const pad = 0.35;
    mapRef.current?.getMap().fitBounds(
      [
        [minLng - pad, minLat - pad],
        [maxLng + pad, maxLat + pad],
      ],
      {
        padding: variant === "workspace" ? 112 : 56,
        maxZoom: 11,
        duration: 700,
      }
    );
  }, [variant, isDashboard]);

  const resetView = useCallback(() => {
    mapRef.current?.getMap().flyTo({
      center: [MAP_DEFAULT_CENTER.lng, MAP_DEFAULT_CENTER.lat],
      zoom: MAP_DEFAULT_ZOOM,
      pitch: 0,
      bearing: 0,
      duration: 600,
    });
  }, []);

  if (!token) {
    return <MapboxTokenMissing className={className} />;
  }

  // For dashboard mode: use external selectedId; for others use internal
  const selected: Selected = isDashboard
    ? selectedIncidentId
      ? { kind: "incident", id: selectedIncidentId }
      : null
    : internalSelected;

  const handleIncidentSelect = (id: string) => {
    if (isDashboard) {
      onSelectIncident?.(id);
    } else {
      setInternalSelected({ kind: "incident", id });
    }
  };

  const showPopup = !isDashboard && selected !== null;
  const popupLngLat =
    selected?.kind === "project"
      ? (() => {
          const p = MAP_PROJECT_POINTS.find((x) => x.id === selected.id);
          return p ? ([p.lng, p.lat] as [number, number]) : null;
        })()
      : selected?.kind === "activity"
        ? (() => {
            const p = MAP_ACTIVITY_POINTS.find((x) => x.id === selected.id);
            return p ? ([p.lng, p.lat] as [number, number]) : null;
          })()
        : selected?.kind === "incident"
          ? (() => {
              const p = MAP_INCIDENT_POINTS.find((x) => x.id === selected.id);
              return p ? ([p.lng, p.lat] as [number, number]) : null;
            })()
          : null;

  const spacious = variant === "workspace";

  // Which incident points to render
  const incidentPoints = isDashboard
    ? MAP_UNATTENDED_POINTS
    : MAP_INCIDENT_POINTS;
  const filteredIncidentPoints = useMemo(() => {
    let pts = incidentPoints;
    if (filterKind === "sos") pts = pts.filter((p) => p.kind === "sos");
    if (filterKind === "report") pts = pts.filter((p) => p.kind === "report");
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
  }, [incidentPoints, filterKind, filterCenter]);

  return (
    <div
      ref={hostRef}
      className={cn(
        "resq-mapbox-host relative isolate min-h-0 min-w-0 flex-1",
        spacious &&
          "[&_.mapboxgl-ctrl-top-right]:!top-5 [&_.mapboxgl-ctrl-top-right]:!right-5 [&_.mapboxgl-ctrl-bottom-right]:!bottom-8 [&_.mapboxgl-ctrl-bottom-right]:!right-5",
        isDashboard &&
          "[&_.mapboxgl-ctrl-top-right]:!top-4 [&_.mapboxgl-ctrl-top-right]:!right-4",
        className
      )}
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={token}
        mapStyle={mapStyle}
        initialViewState={{
          longitude: MAP_DEFAULT_CENTER.lng,
          latitude: MAP_DEFAULT_CENTER.lat,
          zoom: MAP_DEFAULT_ZOOM,
        }}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
        reuseMaps
        cursor={showPopup ? "pointer" : "grab"}
        onLoad={() => {
          resizeMap();
        }}
        onClick={() => {
          if (isDashboard) onSelectIncident?.(null);
          else setInternalSelected(null);
        }}
      >
        <NavigationControl position="top-right" showCompass showZoom />
        {(spacious || isDashboard) && (
          <>
            <FullscreenControl position="top-right" />
            <GeolocateControl
              position="top-right"
              trackUserLocation
              showAccuracyCircle
            />
            <ScaleControl position="bottom-right" unit="metric" />
          </>
        )}

        {/* Project clusters — workspace + embed only */}
        {!isDashboard &&
          visibleLayers.projects &&
          MAP_PROJECT_POINTS.map((p) => {
            const px = Math.round(
              (spacious ? 22 : 14) +
                (p.count / maxProject) * (spacious ? 24 : 22)
            );
            return (
              <Marker
                key={p.id}
                longitude={p.lng}
                latitude={p.lat}
                anchor="center"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setInternalSelected({ kind: "project", id: p.id });
                }}
              >
                <button
                  type="button"
                  className="block rounded-full border-2 shadow-md transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
                  style={{
                    width: px,
                    height: px,
                    backgroundColor: p.color,
                    borderColor: "rgba(255,255,255,0.9)",
                    opacity: 0.88,
                  }}
                  aria-label={`${p.project}, ${p.count} incidents`}
                />
              </Marker>
            );
          })}

        {/* Team activity dots — workspace + embed only */}
        {!isDashboard &&
          visibleLayers.team &&
          MAP_ACTIVITY_POINTS.map((p) => (
            <Marker
              key={p.id}
              longitude={p.lng}
              latitude={p.lat}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setInternalSelected({ kind: "activity", id: p.id });
              }}
            >
              <button
                type="button"
                className={cn(
                  "flex items-center justify-center rounded-full border-[3px] border-white bg-white shadow-md dark:border-surface-dark",
                  spacious ? "h-7 w-7" : "h-5 w-5"
                )}
                style={{ borderColor: p.color, color: p.color }}
                aria-label={`${p.team}`}
              >
                <span
                  className={cn(
                    "rounded-full",
                    spacious ? "h-2.5 w-2.5" : "h-2 w-2"
                  )}
                  style={{ backgroundColor: p.color }}
                />
              </button>
            </Marker>
          ))}

        {/* Incident markers */}
        {showIncidents &&
          filteredIncidentPoints.map((row) => (
            <Marker
              key={`inc-${row.id}`}
              longitude={row.lng}
              latitude={row.lat}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleIncidentSelect(row.id);
              }}
            >
              <IncidentMapMarker
                row={row}
                spacious={spacious || isDashboard}
                active={selected?.kind === "incident" && selected.id === row.id}
                pulsate={isDashboard && (row.kind === "sos" || !!row.isWatchMe)}
              />
            </Marker>
          ))}

        {/* Popup — workspace / embed only (dashboard uses side panel) */}
        {showPopup && popupLngLat && (
          <Popup
            longitude={popupLngLat[0]}
            latitude={popupLngLat[1]}
            anchor="top"
            maxWidth={spacious ? "min(340px, 92vw)" : "min(280px, 90vw)"}
            onClose={() => setInternalSelected(null)}
            closeButton
            closeOnClick={false}
          >
            {selected?.kind === "project" ? (
              <ProjectPopup id={selected.id} />
            ) : selected?.kind === "activity" ? (
              <ActivityPopup id={selected.id} />
            ) : selected?.kind === "incident" ? (
              <IncidentPopup id={selected.id} />
            ) : null}
          </Popup>
        )}
      </Map>

      {/* Custom control strip */}
      <div
        className={cn(
          "pointer-events-auto absolute z-10 flex flex-col gap-2",
          spacious
            ? "bottom-0.5 left-5 top-auto md:bottom-2 md:left-6"
            : "right-4 top-[72%] -translate-y-1/2",
          isDashboard && "bottom-auto left-auto right-4 top-[308px]"
        )}
      >
        <div
          className={cn(
            "flex flex-col overflow-hidden border border-captionDark/20 bg-surface-light/90 shadow-lg backdrop-blur-md dark:border-captionDark-dark/25 dark:bg-primaryDark/80",
            spacious || isDashboard ? "rounded-2xl" : "rounded-xl"
          )}
        >
          <button
            type="button"
            className={cn(
              spacious || isDashboard ? controlBtnWorkspace : controlBtn,
              "rounded-none rounded-t-xl border-0 border-b border-captionDark/15 dark:border-captionDark-dark/20"
            )}
            onClick={fitAll}
            aria-label="Fit all markers"
            title="Fit all markers"
          >
            <Focus
              className={
                spacious || isDashboard ? "h-[18px] w-[18px]" : "h-4 w-4"
              }
              strokeWidth={2.25}
            />
          </button>
          <button
            type="button"
            className={cn(
              spacious || isDashboard ? controlBtnWorkspace : controlBtn,
              "rounded-none rounded-b-xl border-0"
            )}
            onClick={resetView}
            aria-label="Reset view"
            title="Reset view"
          >
            <span
              className={cn(
                "font-metropolis-semibold",
                spacious || isDashboard ? "text-xs" : "text-[11px]"
              )}
            >
              Reset
            </span>
          </button>
        </div>
      </div>
    </div>
  );
});

function ProjectPopup({ id }: { id: string }) {
  const p = MAP_PROJECT_POINTS.find((x) => x.id === id);
  if (!p) return null;
  return (
    <div className="min-w-[160px] text-sm text-primaryDark">
      <p className="font-metropolis-semibold">{p.project}</p>
      <p className="mt-1 text-captionDark">{p.count} open incidents (sample)</p>
    </div>
  );
}

function ActivityPopup({ id }: { id: string }) {
  const p = MAP_ACTIVITY_POINTS.find((x) => x.id === id);
  if (!p) return null;
  return (
    <div className="min-w-[160px] text-sm text-primaryDark">
      <p className="font-metropolis-semibold">{p.team}</p>
      <p className="mt-1 text-captionDark">{p.action}</p>
      <p className="mt-1 text-xs text-captionDark">{p.when}</p>
    </div>
  );
}

function IncidentMapMarker({
  row,
  active,
  spacious,
  pulsate = false,
}: {
  row: MapIncidentPoint;
  active: boolean;
  spacious: boolean;
  pulsate?: boolean;
}) {
  const isWatchMe = row.kind === "sos" || row.isWatchMe;
  return (
    <button
      type="button"
      className={cn(
        "relative flex flex-col rounded-2xl border bg-surface-light/98 text-left shadow-lg backdrop-blur-md transition-transform dark:bg-surface-dark/95",
        spacious ? "max-w-[11.5rem] gap-2 p-2.5" : "max-w-[9rem] gap-1 p-2",
        isWatchMe
          ? "border-accent-red/45 ring-2 ring-accent-red/15 dark:border-accent-red-dark/50 dark:ring-accent-red-dark/25"
          : "border-primary-blue/25 dark:border-primary-blue-dark/35",
        active ? "scale-105 shadow-xl" : "hover:scale-[1.02]"
      )}
      aria-label={`${row.kind === "sos" ? "SOS" : "Report"}: ${row.summary}`}
    >
      {/* Pulsating ring for Watch Me / SOS */}
      {pulsate && isWatchMe && (
        <>
          <span
            className="pointer-events-none absolute -inset-2 animate-ping rounded-2xl bg-accent-red/20 dark:bg-accent-red-dark/20"
            style={{ animationDuration: "1.5s" }}
          />
          <span
            className="pointer-events-none absolute -inset-1 animate-ping rounded-2xl bg-accent-red/15 dark:bg-accent-red-dark/15"
            style={{ animationDuration: "2s", animationDelay: "0.5s" }}
          />
        </>
      )}

      {isWatchMe ? (
        <span
          className={cn(
            "absolute z-[1] rounded font-bold uppercase leading-none text-white shadow-sm dark:bg-accent-red-dark",
            spacious
              ? "-right-1.5 -top-1.5 bg-accent-red px-1.5 py-0.5 text-[8px]"
              : "-right-1 -top-1 bg-accent-red px-1 py-px text-[7px]"
          )}
        >
          SOS
        </span>
      ) : null}

      <div className={cn("flex items-start", spacious ? "gap-2" : "gap-1.5")}>
        <span
          className={cn(
            "mt-0.5 flex shrink-0 items-center justify-center rounded-xl",
            spacious ? "h-9 w-9" : "h-7 w-7 rounded-lg",
            isWatchMe
              ? "bg-accent-red/12 text-accent-red dark:text-accent-red-dark"
              : "bg-primary-blue/10 text-primary-blue dark:text-primary-blue-dark"
          )}
        >
          {isWatchMe ? (
            <Radio
              className={spacious ? "h-4 w-4" : "h-3.5 w-3.5"}
              strokeWidth={2}
            />
          ) : (
            <FileText
              className={spacious ? "h-4 w-4" : "h-3.5 w-3.5"}
              strokeWidth={2}
            />
          )}
        </span>
        <span
          className={cn(
            "line-clamp-2 font-metropolis-semibold leading-snug text-primaryDark dark:text-primaryDark-dark",
            spacious ? "text-[11px]" : "text-[10px]"
          )}
        >
          {row.summary}
        </span>
      </div>

      <div
        className={cn(
          "flex flex-wrap items-center",
          spacious ? "gap-1.5" : "gap-1",
          "pl-0.5"
        )}
      >
        <span
          className={cn(
            "rounded-md font-bold uppercase tracking-wide",
            spacious ? "px-1.5 py-0.5 text-[8px]" : "px-1 py-px text-[7px]",
            isWatchMe
              ? "bg-accent-red/15 text-accent-red dark:text-accent-red-dark"
              : "bg-primary-blue/12 text-primary-blue dark:text-primary-blue-dark"
          )}
        >
          {isWatchMe ? "Watch Me" : "Report"}
        </span>
        {row.category === null ? (
          <span
            className={cn(
              "rounded-md bg-amber-500/18 font-semibold text-amber-950 dark:text-amber-100",
              spacious ? "px-1.5 py-0.5 text-[8px]" : "px-1 py-px text-[7px]"
            )}
          >
            {spacious ? "Uncategorized" : "Uncat."}
          </span>
        ) : (
          <span
            className={cn(
              "truncate rounded-md bg-captionDark/10 font-medium text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark",
              spacious
                ? "max-w-[6rem] px-1.5 py-0.5 text-[8px]"
                : "max-w-[4.5rem] px-1 py-px text-[7px]"
            )}
          >
            {row.category}
          </span>
        )}
        <span
          className={cn(
            "truncate font-semibold capitalize",
            spacious ? "max-w-[6.5rem] text-[8px]" : "max-w-[5rem] text-[7px]",
            incidentProcessTextClass(row.process)
          )}
        >
          {row.process}
        </span>
      </div>

      {/* map pin pointer */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-px [clip-path:polygon(50%_100%,0_0,100%_0)]",
          spacious ? "h-2.5 w-4" : "h-2 w-3.5",
          "bg-surface-light dark:bg-surface-dark"
        )}
      />
    </button>
  );
}

function IncidentPopup({ id }: { id: string }) {
  const row = MAP_INCIDENT_POINTS.find((x) => x.id === id);
  if (!row) return null;
  const isWatchMe = row.kind === "sos" || row.isWatchMe;
  return (
    <div className="min-w-[220px] max-w-[min(340px,92vw)] px-0.5 py-1 text-sm leading-relaxed text-primaryDark dark:text-primaryDark-dark">
      <div className="flex flex-wrap items-center gap-1.5">
        <span
          className={cn(
            "rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase",
            isWatchMe
              ? "bg-accent-red/15 text-accent-red dark:text-accent-red-dark"
              : "bg-primary-blue/12 text-primary-blue dark:text-primary-blue-dark"
          )}
        >
          {isWatchMe ? "Watch Me / SOS" : "Report"}
        </span>
        <span className="text-[10px] text-captionDark dark:text-captionDark-dark">
          {row.created}
        </span>
      </div>
      <p className="mt-2 font-metropolis-semibold leading-snug">
        {row.summary}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {row.category === null ? (
          <span className="rounded-md bg-amber-500/12 px-2 py-0.5 text-[11px] font-medium text-amber-900 dark:text-amber-100">
            Uncategorized
          </span>
        ) : (
          <span className="rounded-md bg-captionDark/10 px-2 py-0.5 text-[11px] text-captionDark dark:text-captionDark-dark">
            {row.category}
          </span>
        )}
        <span
          className={cn(
            "text-[11px] font-medium capitalize",
            incidentProcessTextClass(row.process)
          )}
        >
          {row.process}
        </span>
      </div>
    </div>
  );
}
