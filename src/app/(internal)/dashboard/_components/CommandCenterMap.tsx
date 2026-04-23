"use client";

import { ResQMapboxCanvas } from "./ResQMapboxCanvas";

/** Map canvas only — command chrome (stats, media) lives in `DashboardWideMapSection` sidebars. */
export function CommandCenterMap() {
  return (
    <div className="absolute inset-0 z-0 flex min-h-0 flex-1 flex-col">
      <div className="relative min-h-0 flex-1">
        <ResQMapboxCanvas variant="embed" className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
}
