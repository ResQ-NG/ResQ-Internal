"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function AppModalRoot() {
  const { modalOpen, modalConfig, closeModal } = useUIStore();

  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const size = modalConfig.size ?? "md";

  // Brand-aware entrance animation – ResQ blue glow + soft lift
  useEffect(() => {
    if (!modalOpen || !backdropRef.current || !panelRef.current) return;

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
        { opacity: 0, y: 24, scale: 0.96, boxShadow: "0 0 0 rgba(0,0,0,0)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.36,
          ease: "power3.out",
          boxShadow: "0 22px 60px rgba(0,0,0,0.75)",
          // subtle brand glow using primary blue
          onStart: () => {
            panelRef.current?.style.setProperty(
              "boxShadow",
              "0 0 0 1px rgba(0,0,255,0.25), 0 22px 60px rgba(0,0,0,0.75)"
            );
          },
        }
      );
    }, panelRef);

    return () => ctx.revert();
  }, [modalOpen]);

  if (!modalOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xl"
      aria-modal="true"
      role="dialog"
    >
      {/* Clickable glass backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 cursor-default"
        onClick={closeModal}
      />

      {/* Glassmorphism modal */}
      <div
        ref={panelRef}
        className={cn(
          "relative z-10 w-full rounded-2xl border border-white/10 bg-surface-dark/60 px-6 py-5 shadow-2xl",
          "backdrop-blur-2xl bg-clip-padding",
          "text-primaryDark-dark",
          sizeClasses[size]
        )}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          {modalConfig.title && (
            <h2 className="text-sm font-metropolis-semibold tracking-wide text-primaryDark-dark">
              {modalConfig.title}
            </h2>
          )}
          <button
            type="button"
            onClick={closeModal}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-primaryDark-dark hover:bg-white/20"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto text-sm">
          {modalConfig.content ?? (
            <p className="text-captionDark-dark">
              Plug any JSX into{" "}
              <code className="rounded bg-black/20 px-1 py-0.5 text-[11px]">
                openModal(&#123; content &#125;)
              </code>{" "}
              to render it here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

