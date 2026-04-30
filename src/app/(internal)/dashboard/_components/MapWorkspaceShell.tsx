"use client";

import { cn } from "@/lib/utils";
import { CommandMapWorkspace } from "./CommandMapWorkspace";

export type MapWorkspaceShellProps = {
  /** Merged into the map root section for layout inside the full map page. */
  className?: string;
};

/**
 * Full-screen Workspace map — same UX as the dashboard command map
 * (left list, overlays, right detail card, dashboard map variant).
 */
export function MapWorkspaceShell({ className }: MapWorkspaceShellProps) {
  return (
    <CommandMapWorkspace
      className={cn(
        "min-h-0 w-full flex-1 lg:min-h-[calc(100dvh-9.5rem)]",
        className,
      )}
    />
  );
}
