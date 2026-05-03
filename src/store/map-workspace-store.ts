import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { MapStyleId } from "@/lib/third-party/mapbox/mapbox-env";
import { MAP_SIDEBAR_LEFT } from "@/app/(internal)/dashboard/_components/MapSidebarResizeGrip";
import {
  INBOX_LIST_FILTER,
  type InboxListFilterKind,
} from "@/lib/constants/incident-inbox";

export type MapWorkspaceFilterKind = InboxListFilterKind;

type MapWorkspaceState = {
  mapStyleId: MapStyleId;
  setMapStyleId: (id: MapStyleId) => void;

  filterKind: MapWorkspaceFilterKind;
  setFilterKind: (next: MapWorkspaceFilterKind) => void;

  /** Poll reports while workspace map is open so list + markers stay fresh. */
  mapLiveMode: boolean;
  setMapLiveMode: (next: boolean) => void;

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

      filterKind: INBOX_LIST_FILTER.ALL,
      setFilterKind: (next) => set({ filterKind: next }),

      mapLiveMode: false,
      setMapLiveMode: (next) => set({ mapLiveMode: next }),

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
        mapLiveMode: state.mapLiveMode,
        leftSidebarWidth: state.leftSidebarWidth,
      }),
    }
  )
);
