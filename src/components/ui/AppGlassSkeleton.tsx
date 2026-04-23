"use client";

import { cn } from "@/lib/utils";

const BAR_WIDTHS = ["w-[88%]", "w-[62%]", "w-[74%]", "w-[48%]", "w-[68%]"] as const;

export type AppGlassSkeletonProps = {
  className?: string;
  /** `aria-label` / screen reader (defaults to caption or "Loading") */
  label?: string;
  /** Short line shown under the bars */
  caption?: string;
  /** Horizontal placeholder bars; `0` or `"none"` = glass shell only */
  lines?: number | "none";
  /** Optional circle (e.g. avatar / map pin placeholder) above the bars */
  showOrb?: boolean;
};

/**
 * Frosted glass loading shell with a subtle brand-tinted sheen sweep.
 * Use inside `dynamic(..., { loading })`, route `loading.tsx`, or any in-view loading state.
 */
export function AppGlassSkeleton({
  className,
  label,
  caption,
  lines = 3,
  showOrb = false,
}: AppGlassSkeletonProps) {
  const lineCount = lines === "none" ? 0 : Math.max(0, Math.min(lines, BAR_WIDTHS.length));
  const ariaLabel = label ?? caption ?? "Loading";

  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel}
      className={cn(
        "relative flex min-h-[200px] w-full flex-col justify-center gap-4 overflow-hidden rounded-xl border border-captionDark/20 bg-surface-light/75 p-6 shadow-sm backdrop-blur-md dark:border-captionDark-dark/25 dark:bg-primaryDark/55 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90 dark:opacity-100"
        aria-hidden
      >
        <div
          className={cn(
            "absolute -left-1/2 top-0 h-full w-1/2",
            "bg-gradient-to-r from-transparent via-primary-blue/[0.14] to-transparent",
            "dark:via-primary-blue-dark/[0.22]",
            "animate-glass-sheen will-change-transform motion-reduce:animate-none",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 -z-10 bg-gradient-to-br from-primary-blue/[0.04] via-transparent to-accent-red/[0.03]",
            "dark:from-primary-blue-dark/[0.07] dark:to-accent-red-dark/[0.04]",
            "animate-glass-skeleton-pulse motion-reduce:animate-none",
          )}
        />
      </div>

      <div className="relative z-[1] flex flex-col items-start gap-3">
        {showOrb && (
          <div
            className={cn(
              "h-12 w-12 shrink-0 rounded-full border border-captionDark/15 bg-primaryDark/[0.06] dark:border-captionDark-dark/20 dark:bg-primaryDark-dark/[0.08]",
              "animate-glass-skeleton-pulse shadow-inner motion-reduce:animate-none",
            )}
            aria-hidden
          />
        )}

        {lineCount > 0 && (
          <div className="flex w-full max-w-md flex-col gap-2.5">
            {Array.from({ length: lineCount }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "h-3 rounded-full border border-captionDark/10 bg-primaryDark/[0.07] shadow-inner dark:border-captionDark-dark/15 dark:bg-primaryDark-dark/[0.09]",
                  "animate-glass-skeleton-pulse motion-reduce:animate-none",
                  BAR_WIDTHS[i % BAR_WIDTHS.length],
                )}
                style={{ animationDelay: `${i * 120}ms` }}
                aria-hidden
              />
            ))}
          </div>
        )}

        {caption ? (
          <p className="text-xs font-medium text-captionDark dark:text-captionDark-dark">{caption}</p>
        ) : null}
      </div>
    </div>
  );
}
