"use client";
import { cn } from "@/lib/utils/generics";

export function MapboxTokenMissing({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-captionDark/30 bg-surface-light/90 p-6 text-center dark:border-captionDark-dark/30 dark:bg-primaryDark/40",
        className
      )}
    >
      <p className="max-w-md text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
        Mapbox token required
      </p>
      <p className="max-w-md text-xs text-captionDark dark:text-captionDark-dark">
        Add{" "}
        <code className="rounded bg-captionDark/10 px-1 py-0.5 text-[11px]">
          NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        </code>{" "}
        to{" "}
        <code className="rounded bg-captionDark/10 px-1 py-0.5 text-[11px]">
          .env.local
        </code>{" "}
        (public token from your Mapbox account), then restart the dev server.
      </p>
    </div>
  );
}
