"use client";

import type { RefObject } from "react";
import { Marker } from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import type Supercluster from "supercluster";
import { isSosOrWatchMeRow } from "@/lib/constants/incident-inbox";
import type { MapIncidentPoint } from "../mapSampleGeo";
import { IncidentClusterMarker } from "./IncidentClusterMarker";
import { IncidentMapMarker } from "./IncidentMapMarker";

type ClusterIndex = Supercluster<MapIncidentPoint>;
type VisibleFeature = ReturnType<ClusterIndex["getClusters"]>[number];

type MapIncidentMarkersLayerProps = {
  showIncidents: boolean;
  visibleClusters: VisibleFeature[];
  clusterIndex: ClusterIndex;
  mapRef: RefObject<MapRef | null>;
  isDashboard: boolean;
  selectedIncidentId: string | null;
  expandedIncidentId: string | null;
  onToggleExpand: (rowId: string) => void;
  onSelectIncidentRow: (rowId: string) => void;
};

export function MapIncidentMarkersLayer({
  showIncidents,
  visibleClusters,
  clusterIndex,
  mapRef,
  isDashboard,
  selectedIncidentId,
  expandedIncidentId,
  onToggleExpand,
  onSelectIncidentRow,
}: MapIncidentMarkersLayerProps) {
  if (!showIncidents) return null;

  return (
    <>
      {visibleClusters.map((feature) => {
        const [lng, lat] = feature.geometry.coordinates;
        const props = feature.properties;
        const clusterId: number | undefined = (props as { cluster_id?: number })
          .cluster_id;
        const isCluster = Boolean((props as { cluster?: boolean }).cluster);
        const pointCount: number =
          (props as { point_count?: number }).point_count ?? 0;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${clusterId}`}
              longitude={lng}
              latitude={lat}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                if (!clusterId) return;
                const expansionZoom = Math.min(
                  clusterIndex.getClusterExpansionZoom(clusterId),
                  20
                );
                mapRef.current?.getMap().flyTo({
                  center: [lng, lat],
                  zoom: expansionZoom,
                  duration: 500,
                });
              }}
            >
              <IncidentClusterMarker count={pointCount} />
            </Marker>
          );
        }

        const row = props as MapIncidentPoint;
        return (
          <Marker
            key={`inc-${row.id}`}
            longitude={lng}
            latitude={lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              onToggleExpand(row.id);
              onSelectIncidentRow(row.id);
            }}
          >
            <IncidentMapMarker
              row={row}
              active={selectedIncidentId === row.id}
              expanded={expandedIncidentId === row.id}
              pulsate={isDashboard && isSosOrWatchMeRow(row)}
            />
          </Marker>
        );
      })}
    </>
  );
}
