import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { MapStyleId } from "@/lib/mapbox-env";
import { MAP_SIDEBAR_LEFT } from "@/app/(internal)/dashboard/_components/MapSidebarResizeGrip";

export type MapWorkspaceFilterKind = "all" | "sos" | "report";

type MapWorkspaceState = {
  mapStyleId: MapStyleId;
  setMapStyleId: (id: MapStyleId) => void;

  filterKind: MapWorkspaceFilterKind;
  setFilterKind: (next: MapWorkspaceFilterKind) => void;

  leftSidebarWidth: number;
  setLeftSidebarWidth: (next: number) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export const useMapWorkspaceStore = create<MapWorkspaceState>()(
  persist(
    (set) => ({
      mapStyleId: "streets",
      setMapStyleId: (id) => set({ mapStyleId: id }),

      filterKind: "all",
      setFilterKind: (next) => set({ filterKind: next }),

      leftSidebarWidth: MAP_SIDEBAR_LEFT.default,
      setLeftSidebarWidth: (next) =>
        set({
          leftSidebarWidth: clamp(
            Math.round(next),
            MAP_SIDEBAR_LEFT.min,
            MAP_SIDEBAR_LEFT.max
          ),
        }),
    }),
    {
      name: "resq-map-workspace",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        mapStyleId: state.mapStyleId,
        filterKind: state.filterKind,
        leftSidebarWidth: state.leftSidebarWidth,
      }),
    }
  )
);

