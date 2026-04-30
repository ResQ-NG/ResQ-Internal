"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Compass,
  Map,
  Mountain,
  Satellite,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { AppGlassSkeleton } from "@/components/ui";
import { cn } from "@/lib/utils";
import { getMapboxAccessToken } from "@/lib/mapbox-env";
import type { MapStyleId } from "@/lib/mapbox-env";
import { IncidentDetailCard } from "./IncidentDetailCard";
import { IncidentListDetailPanel } from "./IncidentListDetailPanel";
import {
  MAP_SIDEBAR_LEFT,
  SidebarResizeGrip,
  useLgUp,
} from "./MapSidebarResizeGrip";
import { MAP_UNATTENDED_POINTS } from "./mapSampleGeo";
import type { SampleInboxRow } from "./sampleCommandData";
import { type ResQMapboxCanvasRef } from "./ResQMapboxCanvas";
import { useMapWorkspaceStore, type MapWorkspaceFilterKind } from "@/store/map-workspace-store";

const ResQMapboxCanvas = dynamic(
  () => import("./ResQMapboxCanvas").then((m) => m.ResQMapboxCanvas),
  {
    ssr: false,
    loading: () => (
      <AppGlassSkeleton
        className="h-full min-h-[380px]"
        caption="Loading map…"
        showOrb
        lines={3}
      />
    ),
  }
);

const STYLE_OPTIONS: {
  id: MapStyleId;
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "streets", label: "Streets", icon: <Map className="h-3 w-3" /> },
  { id: "outdoors", label: "Outdoors", icon: <Mountain className="h-3 w-3" /> },
  {
    id: "navigation-day",
    label: "Nav Day",
    icon: <Compass className="h-3 w-3" />,
  },
  {
    id: "navigation-night",
    label: "Nav Night",
    icon: <Compass className="h-3 w-3" />,
  },
  {
    id: "satellite",
    label: "Satellite",
    icon: <Satellite className="h-3 w-3" />,
  },
];

const FILTER_OPTIONS: { id: MapWorkspaceFilterKind; label: string; dot?: string }[] = [
  { id: "all", label: "All" },
  { id: "sos", label: "SOS", dot: "bg-accent-red" },
  { id: "report", label: "Reports", dot: "bg-primary-blue" },
];

export type CommandMapWorkspaceProps = {
  /** Extra classes on the root `<section>` (e.g. `flex-1 min-h-0` for full-page map). */
  className?: string;
};

export function CommandMapWorkspace({ className }: CommandMapWorkspaceProps) {
  const lgUp = useLgUp();
  const mapRef = useRef<ResQMapboxCanvasRef>(null);

  const leftWidth = useMapWorkspaceStore((s) => s.leftSidebarWidth);
  const setLeftWidth = useMapWorkspaceStore((s) => s.setLeftSidebarWidth);
  const mapStyleId = useMapWorkspaceStore((s) => s.mapStyleId);
  const setMapStyleId = useMapWorkspaceStore((s) => s.setMapStyleId);
  const filterKind = useMapWorkspaceStore((s) => s.filterKind);
  const setFilterKind = useMapWorkspaceStore((s) => s.setFilterKind);

  const [selectedRow, setSelectedRow] = useState<SampleInboxRow | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const leftStyle = lgUp
    ? ({
        width: leftWidth,
        minWidth: MAP_SIDEBAR_LEFT.min,
        maxWidth: MAP_SIDEBAR_LEFT.max,
      } as const)
    : undefined;

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchQuery.trim()) return;
      const token = getMapboxAccessToken();
      if (!token) return;
      setSearching(true);
      setSearchError("");
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${token}&limit=1&country=ng`
        );
        const data = await res.json();
        const feature = data?.features?.[0];
        if (feature) {
          const [lng, lat] = feature.center as [number, number];
          mapRef.current?.flyTo(lng, lat, 11);
        } else {
          setSearchError("Location not found — try a more specific name.");
        }
      } catch {
        setSearchError("Search failed. Check your connection.");
      } finally {
        setSearching(false);
      }
    },
    [searchQuery]
  );

  const handleSelectIncident = useCallback((id: string | null) => {
    if (!id) {
      setSelectedRow(null);
      return;
    }
    const point = MAP_UNATTENDED_POINTS.find((p) => p.id === id);
    setSelectedRow(point ?? null);
    if (point) {
      mapRef.current?.flyTo(point.lng, point.lat, 13);
    }
  }, []);

  return (
    <section
      className={cn(
        "flex min-h-[min(560px,calc(100vh-10rem))] flex-col overflow-hidden rounded-2xl border border-captionDark/20 bg-surface-light shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark lg:min-h-[min(86dvh,56rem)] lg:flex-row",
        className
      )}
    >
      <div
        className={cn(
          "relative flex shrink-0 flex-col overflow-hidden border-captionDark/20 transition-[width] duration-300 ease-out dark:border-captionDark-dark/20",
          "h-[min(62vh,460px)] w-full border-b lg:h-full lg:border-b-0 lg:border-r"
        )}
        style={leftStyle}
      >
        {lgUp && (
          <SidebarResizeGrip
            ariaLabel="Resize incidents sidebar"
            side="left"
            width={leftWidth}
            min={MAP_SIDEBAR_LEFT.min}
            max={MAP_SIDEBAR_LEFT.max}
            onWidthChange={setLeftWidth}
          />
        )}

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <IncidentListDetailPanel
            selectedRow={selectedRow}
            onSelectRow={(row) => {
              setSelectedRow(row);
              if (row) {
                const point = MAP_UNATTENDED_POINTS.find((p) => p.id === row.id);
                if (point) mapRef.current?.flyTo(point.lng, point.lat, 13);
              }
            }}
          />
        </div>
      </div>

      <div className="relative flex min-h-[min(64dvh,520px)] w-full min-w-0 flex-1 flex-col lg:min-h-0">
        <div className="pointer-events-auto absolute left-4 top-4 z-[500] w-[min(280px,calc(100%-5rem))]">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-1.5 rounded-xl border border-captionDark/20 bg-surface-light shadow-lg dark:border-captionDark-dark/30 dark:bg-surface-dark"
          >
            <Search
              className="ml-3 h-4 w-4 shrink-0 text-captionDark dark:text-captionDark-dark"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search location (e.g. Lekki, Abuja)…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchError("");
              }}
              className="min-w-0 flex-1 bg-transparent py-2.5 pr-1 text-sm text-primaryDark placeholder:text-captionDark/55 focus:outline-none dark:text-primaryDark-dark dark:placeholder:text-captionDark-dark/45"
            />
            <button
              type="submit"
              disabled={searching || !searchQuery.trim()}
              className="mr-2 rounded-lg bg-primary-blue px-3 py-1.5 text-xs font-metropolis-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {searching ? "…" : "Go"}
            </button>
          </form>

          {searchError && (
            <div className="mt-1.5 rounded-lg border border-accent-red/30 bg-surface-light px-3 py-2 text-xs text-accent-red shadow-md dark:bg-surface-dark dark:text-accent-red-dark">
              {searchError}
            </div>
          )}
        </div>

        <div className="pointer-events-auto absolute left-4 top-[3.75rem] z-[500] flex flex-wrap items-center gap-2">
          <div className="flex overflow-hidden rounded-xl border border-captionDark/20 bg-surface-light shadow-md dark:border-captionDark-dark/30 dark:bg-surface-dark">
            {STYLE_OPTIONS.map(({ id, label, icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMapStyleId(id)}
                className={cn(
                  "flex items-center gap-1.5 border-r border-captionDark/15 px-3 py-2 text-[11px] font-metropolis-semibold transition-all duration-150 last:border-r-0 dark:border-captionDark-dark/20",
                  mapStyleId === id
                    ? "bg-primary-blue text-white dark:bg-primary-blue-dark"
                    : "text-captionDark hover:bg-captionDark/8 hover:text-primaryDark dark:text-captionDark-dark dark:hover:bg-captionDark-dark/10 dark:hover:text-primaryDark-dark"
                )}
                aria-pressed={mapStyleId === id}
                aria-label={`${label} map style`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div
            className="hidden h-4 w-px bg-captionDark/20 dark:bg-captionDark-dark/25 sm:block"
            aria-hidden
          />

          <div className="flex items-center overflow-hidden rounded-xl border border-captionDark/20 bg-surface-light shadow-md dark:border-captionDark-dark/30 dark:bg-surface-dark">
            <SlidersHorizontal
              className="mx-3 h-3 w-3 shrink-0 text-captionDark dark:text-captionDark-dark"
              aria-hidden
            />
            {FILTER_OPTIONS.map(({ id, label, dot }) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilterKind(id)}
                className={cn(
                  "flex items-center gap-1.5 border-l border-captionDark/15 px-3 py-2 text-[11px] font-metropolis-semibold transition-all duration-150 dark:border-captionDark-dark/20",
                  filterKind === id
                    ? "bg-primary-blue/15 text-primary-blue dark:bg-primary-blue-dark/20 dark:text-primary-blue-dark"
                    : "text-captionDark hover:bg-captionDark/8 hover:text-primaryDark dark:text-captionDark-dark dark:hover:bg-captionDark-dark/10 dark:hover:text-primaryDark-dark"
                )}
                aria-pressed={filterKind === id}
              >
                {dot && (
                  <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
                )}
                {label}
              </button>
            ))}
          </div>
        </div>

        {selectedRow && (
          <div className="pointer-events-auto absolute bottom-4 right-4 top-4 z-[510] flex w-[min(320px,calc(100%-2rem))] animate-inbox-card-enter flex-col overflow-hidden rounded-2xl border border-captionDark/20 bg-surface-light shadow-2xl dark:border-captionDark-dark/25 dark:bg-surface-dark">
            <IncidentDetailCard
              row={selectedRow}
              embedded
              onClose={() => setSelectedRow(null)}
            />
          </div>
        )}

        {/* Fill flex slot so Mapbox gets correct width/height on first paint */}
        <div className="relative min-h-0 min-w-0 flex-1 basis-0">
          <div className="absolute inset-0 min-h-0 min-w-0">
            <ResQMapboxCanvas
              ref={mapRef}
              variant="dashboard"
              mapStyleId={mapStyleId}
              visibleLayers={{ projects: false, team: false, incidents: true }}
              selectedIncidentId={selectedRow?.id ?? null}
              onSelectIncident={handleSelectIncident}
              filterKind={filterKind}
              className="h-full w-full min-h-0 min-w-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
