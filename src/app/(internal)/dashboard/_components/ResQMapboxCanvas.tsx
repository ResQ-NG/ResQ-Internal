"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  type MapRef,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { INBOX_LIST_FILTER } from "@/lib/constants/incident-inbox";
import {
  getMapboxAccessToken,
  getMapboxStyleUrl,
} from "@/lib/third-party/mapbox/mapbox-env";
import { cn } from "@/lib/utils/generics";
import { MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM } from "./mapSampleGeo";
import { MapboxTokenMissing } from "./MapboxTokenMissing";
import { MapCanvasCustomControls } from "./mapbox-canvas/MapCanvasCustomControls";
import { MapIncidentMarkersLayer } from "./mapbox-canvas/MapIncidentMarkersLayer";
import { filterMapIncidentPoints } from "./mapbox-canvas/filter-incident-points";
import type {
  ResQMapboxCanvasProps,
  ResQMapboxCanvasRef,
} from "./mapbox-canvas/types";
import { useMapIncidentClusters } from "./mapbox-canvas/use-map-incident-clusters";

export type {
  ResQMapboxCanvasProps,
  ResQMapboxCanvasRef,
} from "./mapbox-canvas/types";

function boundsFromLngLats(pts: [number, number][], pad: number) {
  if (pts.length === 0) return null;
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
  return [
    [minLng - pad, minLat - pad],
    [maxLng + pad, maxLat + pad],
  ] as [[number, number], [number, number]];
}

export const ResQMapboxCanvas = forwardRef<
  ResQMapboxCanvasRef,
  ResQMapboxCanvasProps
>(function ResQMapboxCanvas(
  {
    variant,
    className,
    mapStyleId = "streets",
    visibleLayers = { projects: false, team: false, incidents: true },
    selectedIncidentId,
    onSelectIncident,
    filterCenter,
    filterKind = INBOX_LIST_FILTER.ALL,
    incidentPointsOverride,
  },
  ref
) {
  const showIncidents = visibleLayers.incidents !== false;
  const isDashboard = variant === "dashboard";
  const token = getMapboxAccessToken();
  const mapRef = useRef<MapRef>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [expandedIncidentId, setExpandedIncidentId] = useState<string | null>(
    null
  );
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

  const incidentPoints = incidentPointsOverride ?? [];

  const filteredIncidentPoints = useMemo(
    () => filterMapIncidentPoints(incidentPoints, filterKind, filterCenter),
    [incidentPoints, filterKind, filterCenter]
  );

  const fitAll = useCallback(() => {
    const pts = filteredIncidentPoints.map(
      (p) => [p.lng, p.lat] as [number, number]
    );
    const box = boundsFromLngLats(pts, 0.35);
    if (!box) {
      mapRef.current?.getMap().flyTo({
        center: [MAP_DEFAULT_CENTER.lng, MAP_DEFAULT_CENTER.lat],
        zoom: MAP_DEFAULT_ZOOM,
        duration: 600,
      });
      return;
    }
    mapRef.current?.getMap().fitBounds(box, {
      padding: variant === "workspace" ? 112 : 56,
      maxZoom: 11,
      duration: 700,
    });
  }, [variant, filteredIncidentPoints]);

  const resetView = useCallback(() => {
    mapRef.current?.getMap().flyTo({
      center: [MAP_DEFAULT_CENTER.lng, MAP_DEFAULT_CENTER.lat],
      zoom: MAP_DEFAULT_ZOOM,
      pitch: 0,
      bearing: 0,
      duration: 600,
    });
  }, []);

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

  const { clusterIndex, visibleClusters, handleMapLoad, handleMapMove } =
    useMapIncidentClusters(mapRef, filteredIncidentPoints);

  if (!token) {
    return <MapboxTokenMissing className={className} />;
  }

  const handleIncidentSelect = (id: string) => {
    if (isDashboard) {
      onSelectIncident?.(id);
    }
  };

  const spacious = variant === "workspace";
  const selectedId = isDashboard ? (selectedIncidentId ?? null) : null;

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
        cursor="grab"
        onLoad={(e) => {
          resizeMap();
          handleMapLoad(e.target);
        }}
        onMove={(e) => {
          handleMapMove(e.viewState.zoom);
        }}
        onClick={() => {
          if (isDashboard) onSelectIncident?.(null);
          setExpandedIncidentId(null);
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

        <MapIncidentMarkersLayer
          showIncidents={showIncidents}
          visibleClusters={visibleClusters}
          clusterIndex={clusterIndex}
          mapRef={mapRef}
          isDashboard={isDashboard}
          selectedIncidentId={selectedId}
          expandedIncidentId={expandedIncidentId}
          onToggleExpand={(rowId) =>
            setExpandedIncidentId((prev) => (prev === rowId ? null : rowId))
          }
          onSelectIncidentRow={handleIncidentSelect}
        />
      </Map>

      <MapCanvasCustomControls
        spacious={spacious}
        isDashboard={isDashboard}
        onFitAll={fitAll}
        onResetView={resetView}
      />
    </div>
  );
});
