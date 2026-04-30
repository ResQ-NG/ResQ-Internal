"use client";

import { useCallback, useEffect, useState } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export const MAP_SIDEBAR_LEFT = { min: 320, max: 640, default: 420 } as const;
export const MAP_SIDEBAR_RIGHT = { min: 280, max: 440, default: 360 } as const;

export function useLgUp() {
  const [lg, setLg] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return lg;
}

export function SidebarResizeGrip({
  ariaLabel,
  side,
  width,
  min,
  max,
  onWidthChange,
}: {
  ariaLabel: string;
  side: "left" | "right";
  width: number;
  min: number;
  max: number;
  onWidthChange: (next: number) => void;
}) {
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const el = e.currentTarget;
      el.setPointerCapture(e.pointerId);
      const x0 = e.clientX;
      const w0 = width;

      const onMove = (ev: PointerEvent) => {
        const dx = ev.clientX - x0;
        const delta = side === "left" ? dx : -dx;
        const next = Math.round(w0 + delta);
        onWidthChange(Math.min(max, Math.max(min, next)));
      };
      const onUp = (ev: PointerEvent) => {
        try {
          el.releasePointerCapture(ev.pointerId);
        } catch {
          /* ignore */
        }
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [max, min, onWidthChange, side, width],
  );

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label={ariaLabel}
      onPointerDown={onPointerDown}
      className={cn(
        "group absolute top-0 z-[560] flex h-full min-w-[2.75rem] max-w-[2.75rem] shrink-0 touch-none items-center justify-center px-2",
        "cursor-col-resize select-none",
        side === "left" ? "-right-3" : "-left-3",
      )}
    >
      <span
        className={cn(
          "h-[min(72%,10rem)] w-1 rounded-full border border-captionDark/15 bg-surface-light/90 shadow-sm transition-[background-color,transform] dark:border-captionDark-dark/25 dark:bg-surface-dark/90",
          "group-hover:scale-y-[1.02] group-hover:bg-primary-blue/25 group-active:bg-primary-blue/35 dark:group-hover:bg-primary-blue-dark/30 dark:group-active:bg-primary-blue-dark/40",
        )}
      />
      <GripVertical
        className="pointer-events-none absolute h-5 w-5 text-captionDark/50 opacity-0 transition-opacity group-hover:opacity-100 dark:text-captionDark-dark/55"
        aria-hidden
      />
    </div>
  );
}
