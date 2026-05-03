"use client";

import {
  useCallback,
  useMemo,
  useState,
  type RefObject,
} from "react";
import type { MapRef } from "react-map-gl/mapbox";
import Supercluster from "supercluster";
import { MAP_DEFAULT_ZOOM } from "../mapSampleGeo";
import type { MapIncidentPoint } from "../mapSampleGeo";

type MapboxMapLike = {
  getZoom: () => number;
  getBounds: () => {
    getWest: () => number;
    getSouth: () => number;
    getEast: () => number;
    getNorth: () => number;
  } | null;
};

export function useMapIncidentClusters(
  mapRef: RefObject<MapRef | null>,
  filteredIncidentPoints: MapIncidentPoint[]
) {
  const [mapZoom, setMapZoom] = useState(MAP_DEFAULT_ZOOM);
  const [mapBounds, setMapBounds] = useState<[number, number, number, number]>([
    3.0, 5.5, 5.5, 7.5,
  ]);

  const clusterIndex = useMemo(() => {
    const sc = new Supercluster<MapIncidentPoint>({ radius: 60, maxZoom: 14 });
    sc.load(
      filteredIncidentPoints.map((p) => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [p.lng, p.lat] },
        properties: p,
      }))
    );
    return sc;
  }, [filteredIncidentPoints]);

  const visibleClusters = useMemo(
    () => clusterIndex.getClusters(mapBounds, Math.floor(mapZoom)),
    [clusterIndex, mapBounds, mapZoom]
  );

  const syncBoundsFromMap = useCallback((map: MapboxMapLike) => {
    setMapZoom(map.getZoom());
    const b = map.getBounds();
    if (b) {
      setMapBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]);
    }
  }, []);

  const handleMapLoad = useCallback(
    (map: MapboxMapLike) => {
      syncBoundsFromMap(map);
    },
    [syncBoundsFromMap]
  );

  const handleMapMove = useCallback(
    (viewStateZoom: number) => {
      setMapZoom(viewStateZoom);
      const map = mapRef.current?.getMap();
      if (map) syncBoundsFromMap(map);
    },
    [mapRef, syncBoundsFromMap]
  );

  return {
    clusterIndex,
    visibleClusters,
    handleMapLoad,
    handleMapMove,
  };
}
