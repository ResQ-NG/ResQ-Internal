"use client";

import { useEffect, useRef } from "react";
import { ShieldAlert, X } from "lucide-react";
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
      return "Permission required";
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
  const isPermission = code === "403";

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
          "text-primaryDark-dark",
          isPermission && "max-w-md border-amber-500/25",
        )}
      >
        {isPermission ? (
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 ring-1 ring-amber-400/30">
              <ShieldAlert className="h-7 w-7 text-amber-300" aria-hidden />
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "mb-3 items-start gap-2",
            isPermission
              ? "grid grid-cols-[2.25rem_minmax(0,1fr)_2.25rem]"
              : "flex justify-between gap-3",
          )}
        >
          {isPermission ? <span className="col-start-1 block w-9 shrink-0" aria-hidden /> : null}
          <h2
            id="global-error-title"
            className={cn(
              "min-w-0 text-sm font-metropolis-semibold leading-snug tracking-wide text-primaryDark-dark",
              isPermission ? "col-start-2 text-center" : "flex-1 pr-1",
            )}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={closeError}
            aria-label="Dismiss error"
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
              "bg-white/10 text-primaryDark-dark transition-colors hover:bg-white/20",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40",
              "translate-y-px",
              isPermission ? "col-start-3 justify-self-end" : "",
            )}
          >
            <X className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
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
