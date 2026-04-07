"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { useGlobalErrorStore } from "@/store/reusables/global-error-store";
import { cn } from "@/lib/utils";
import { AppButton } from "./AppButton";
import { AppParagraph } from "./AppParagraph";

function titleForCode(code: string | null): string {
  switch (code) {
    case "401":
      return "Session expired";
    case "403":
      return "Access denied";
    case "500":
      return "Server error";
    case "network":
      return "Connection problem";
    default:
      return "Something went wrong";
  }
}

/**
 * Surfaces `useGlobalErrorStore` (axios interceptor) as a glass modal above `AppModalRoot`.
 */
export function GlobalErrorModalRoot() {
  const isOpen = useGlobalErrorStore((s) => s.isOpen);
  const message = useGlobalErrorStore((s) => s.message);
  const code = useGlobalErrorStore((s) => s.code);
  const closeError = useGlobalErrorStore((s) => s.closeError);

  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeError();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeError]);

  useEffect(() => {
    if (!isOpen || !backdropRef.current || !panelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
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
  }, [isOpen]);

  if (!isOpen) return null;

  const body =
    message?.trim() || "An unexpected error occurred. Please try again.";
  const title = titleForCode(code);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[55] flex items-center justify-center bg-black/40 backdrop-blur-xl"
      aria-modal="true"
      role="alertdialog"
      aria-labelledby="global-error-title"
      aria-describedby="global-error-desc"
    >
      <button
        type="button"
        aria-label="Dismiss error"
        className="absolute inset-0 cursor-default"
        onClick={closeError}
      />

      <div
        ref={panelRef}
        className={cn(
          "relative z-10 mx-4 w-full max-w-sm rounded-2xl border border-white/10 bg-surface-dark/60 px-6 py-5 shadow-2xl",
          "backdrop-blur-2xl bg-clip-padding",
          "text-primaryDark-dark"
        )}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2
            id="global-error-title"
            className="text-sm font-metropolis-semibold tracking-wide text-primaryDark-dark"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={closeError}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-primaryDark-dark hover:bg-white/20"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <AppParagraph
          id="global-error-desc"
          variant="body"
          size="sm"
          className="mb-5 text-captionDark-dark"
        >
          {body}
        </AppParagraph>

        <AppButton
          type="button"
          variant="primary"
          size="md"
          className="w-full"
          onClick={closeError}
        >
          OK
        </AppButton>
      </div>
    </div>
  );
}
