import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/** Default ≈ Tailwind `max-w-6xl` (72rem at 16px). */
export const INTERNAL_CONTENT_WIDTH_DEFAULT = 1152;

const MIN_W = 880;
/** Hard ceiling when viewport is unknown (SSR). */
const ABSOLUTE_MAX_W = 4000;

function getMaxContentWidthPx(): number {
  if (typeof window === "undefined") return ABSOLUTE_MAX_W;
  return Math.min(ABSOLUTE_MAX_W, Math.max(MIN_W, window.innerWidth - 24));
}

function clampWidth(n: number) {
  return Math.min(getMaxContentWidthPx(), Math.max(MIN_W, Math.round(n)));
}

type InternalDashboardLayoutState = {
  /** Max width (px) for the main internal list / agencies column. */
  contentMaxWidthPx: number;
  setContentMaxWidthPx: (next: number) => void;
};

export const useInternalDashboardLayoutStore = create<InternalDashboardLayoutState>()(
  persist(
    (set) => ({
      contentMaxWidthPx: INTERNAL_CONTENT_WIDTH_DEFAULT,
      setContentMaxWidthPx: (next) => set({ contentMaxWidthPx: clampWidth(next) }),
    }),
    {
      name: "resq-internal-dashboard-layout",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ contentMaxWidthPx: state.contentMaxWidthPx }),
    }
  )
);
