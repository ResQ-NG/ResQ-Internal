"use client";

import { Focus } from "lucide-react";
import { cn } from "@/lib/utils/generics";
import {
  MAP_CANVAS_CONTROL_BTN,
  MAP_CANVAS_CONTROL_BTN_WORKSPACE,
} from "./control-styles";

type MapCanvasCustomControlsProps = {
  spacious: boolean;
  isDashboard: boolean;
  onFitAll: () => void;
  onResetView: () => void;
};

export function MapCanvasCustomControls({
  spacious,
  isDashboard,
  onFitAll,
  onResetView,
}: MapCanvasCustomControlsProps) {
  const large = spacious || isDashboard;
  return (
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
          large ? "rounded-2xl" : "rounded-xl"
        )}
      >
        <button
          type="button"
          className={cn(
            large ? MAP_CANVAS_CONTROL_BTN_WORKSPACE : MAP_CANVAS_CONTROL_BTN,
            "rounded-none rounded-t-xl border-0 border-b border-captionDark/15 dark:border-captionDark-dark/20"
          )}
          onClick={onFitAll}
          aria-label="Fit all markers"
          title="Fit all markers"
        >
          <Focus
            className={large ? "h-[18px] w-[18px]" : "h-4 w-4"}
            strokeWidth={2.25}
          />
        </button>
        <button
          type="button"
          className={cn(
            large ? MAP_CANVAS_CONTROL_BTN_WORKSPACE : MAP_CANVAS_CONTROL_BTN,
            "rounded-none rounded-b-xl border-0"
          )}
          onClick={onResetView}
          aria-label="Reset view"
          title="Reset view"
        >
          <span
            className={cn(
              "font-metropolis-semibold",
              large ? "text-xs" : "text-[11px]"
            )}
          >
            Reset
          </span>
        </button>
      </div>
    </div>
  );
}
