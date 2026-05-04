"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils/generics";
import { useInternalDashboardLayoutStore } from "@/store/internal-dashboard-layout-store";

function getScrollableAncestors(el: HTMLElement | null): (HTMLElement | Window)[] {
  const out: (HTMLElement | Window)[] = [window];
  if (!el) return out;
  let p: HTMLElement | null = el.parentElement;
  while (p && p !== document.body) {
    const { overflowY } = getComputedStyle(p);
    if (overflowY === "auto" || overflowY === "scroll") out.push(p);
    p = p.parentElement;
  }
  return out;
}

function ContentWidthGripStrip({
  side,
  width,
  onWidthChange,
  anchorXPx,
}: {
  side: "left" | "right";
  width: number;
  onWidthChange: (next: number) => void;
  /** Viewport X of the content column edge (left or right) to center the strip on. */
  anchorXPx: number;
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
        const delta = side === "right" ? dx : -dx;
        onWidthChange(w0 + delta);
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
    [onWidthChange, side, width]
  );

  const stripW = 20;
  const x = anchorXPx - stripW / 2;

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label={
        side === "right" ? "Drag right edge to adjust content width" : "Drag left edge to adjust content width"
      }
      title="Drag to adjust width — saved on this device"
      onPointerDown={onPointerDown}
      className={cn(
        "group fixed top-0 z-[35] hidden h-[100dvh] touch-none select-none lg:flex",
        "cursor-col-resize flex-col items-center py-0",
        "w-5 min-w-[20px]"
      )}
      style={{
        left: x,
      }}
    >
      <span
        className={cn(
          "min-h-0 flex-1 self-center rounded-full border border-captionDark/15 bg-surface-light/90 shadow-sm transition-[background-color,transform] dark:border-captionDark-dark/25 dark:bg-surface-dark/90",
          "w-1 group-hover:scale-x-[1.15] group-hover:bg-captionDark/15 group-active:bg-captionDark/25 dark:group-hover:bg-captionDark-dark/20 dark:group-active:bg-captionDark-dark/30"
        )}
      />
      <GripVertical
        className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-captionDark/40 opacity-0 transition-opacity group-hover:opacity-100 dark:text-captionDark-dark/50"
        aria-hidden
      />
    </div>
  );
}

export function InternalContentWidthShell({ children }: { children: React.ReactNode }) {
  const contentMaxWidthPx = useInternalDashboardLayoutStore((s) => s.contentMaxWidthPx);
  const setContentMaxWidthPx = useInternalDashboardLayoutStore((s) => s.setContentMaxWidthPx);
  const boxRef = useRef<HTMLDivElement>(null);
  const [stripLayout, setStripLayout] = useState<{ left: number; right: number } | null>(null);

  const syncEdges = useCallback(() => {
    const el = boxRef.current;
    if (!el || typeof window === "undefined") return;
    const r = el.getBoundingClientRect();
    setStripLayout({ left: r.left, right: r.right });
  }, []);

  useLayoutEffect(() => {
    syncEdges();
    const el = boxRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => syncEdges());
    ro.observe(el);

    const scrollers = getScrollableAncestors(el);
    const onScrollOrResize = () => syncEdges();
    window.addEventListener("resize", onScrollOrResize);
    for (const s of scrollers) {
      if (s !== window) s.addEventListener("scroll", onScrollOrResize, { passive: true });
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onScrollOrResize);
      for (const s of scrollers) {
        if (s !== window) s.removeEventListener("scroll", onScrollOrResize);
      }
    };
  }, [syncEdges, contentMaxWidthPx]);

  useEffect(() => {
    const sync = () => {
      const { contentMaxWidthPx: w, setContentMaxWidthPx: set } = useInternalDashboardLayoutStore.getState();
      set(w);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const showStrips = stripLayout && stripLayout.right > stripLayout.left + 40;

  return (
    <div className="relative w-full px-4 sm:px-6">
      <div
        ref={boxRef}
        className="relative mx-auto w-full pl-1 pr-1 lg:pl-5 lg:pr-5"
        style={{
          maxWidth: contentMaxWidthPx,
        }}
      >
        {children}
      </div>

      {showStrips ? (
        <>
          <ContentWidthGripStrip
            side="left"
            width={contentMaxWidthPx}
            onWidthChange={setContentMaxWidthPx}
            anchorXPx={stripLayout.left}
          />
          <ContentWidthGripStrip
            side="right"
            width={contentMaxWidthPx}
            onWidthChange={setContentMaxWidthPx}
            anchorXPx={stripLayout.right}
          />
        </>
      ) : null}

      <p className="mx-auto mt-2 max-w-full text-center text-[10px] text-captionDark/80 dark:text-captionDark-dark/80">
        powered by resq
      </p>
    </div>
  );
}
