"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

export function AppSidebarRoot() {
  const { sidebarOpen, sidebarConfig, closeSidebar } = useUIStore();

  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);

  // Brand-aware entrance animation – slide in with accent edge glow
  useEffect(() => {
    if (!sidebarOpen || !backdropRef.current || !panelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        panelRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.36,
          ease: "power3.out",
        }
      );
    }, panelRef);

    return () => ctx.revert();
  }, [sidebarOpen]);

  if (!sidebarOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-40 flex justify-end bg-black/30 backdrop-blur-xl"
    >
      {/* Glass backdrop */}
      <button
        type="button"
        aria-label="Close sidebar"
        className="h-full flex-1 cursor-default"
        onClick={closeSidebar}
      />

      {/* Glassmorphism sidebar */}
      <aside
        ref={panelRef}
        className={cn(
          "relative h-full w-80 max-w-full border-l border-white/10 bg-surface-dark/70 bg-clip-padding",
          "backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.7)]"
        )}
        aria-label="Global sidebar"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-xs font-metropolis-semibold uppercase tracking-[0.16em] text-captionDark-dark">
            {sidebarConfig.title ?? "Quick panel"}
          </p>
          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-primaryDark-dark hover:bg-white/20"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <div className="h-full overflow-y-auto px-4 py-4 text-sm text-primaryDark-dark">
          {sidebarConfig.content ?? (
            <p className="text-captionDark-dark">
              Use <code className="rounded bg-black/20 px-1 py-0.5 text-[11px]">openSidebar(&#123; content &#125;)</code>{" "}
              to inject any JSX into this global glass sidebar.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

