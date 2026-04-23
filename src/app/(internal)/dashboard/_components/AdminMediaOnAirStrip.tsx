"use client";

import Link from "next/link";
import { Radio } from "lucide-react";
import { AppHeading, AppParagraph } from "@/components/ui";
import { cn } from "@/lib/utils";
import { SAMPLE_ADMIN_MEDIA_ON_AIR } from "./sampleCommandData";

type AdminMediaOnAirStripProps = {
  className?: string;
  /** Optional window label (e.g. from dashboard header). */
  dateRange?: string;
  /** `overlay` floats on the map; `embedded` flows inside a sidebar column. */
  variant?: "overlay" | "embedded";
};

function thumbUrl(seed: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/280/160`;
}

export function AdminMediaOnAirStrip({ className, dateRange, variant = "overlay" }: AdminMediaOnAirStripProps) {
  const isEmbedded = variant === "embedded";

  return (
    <div
      className={cn(
        !isEmbedded &&
          "pointer-events-none absolute left-2 right-2 top-2 z-[500] md:left-3 md:right-auto md:max-w-[min(100%,420px)]",
        isEmbedded && "w-full min-w-0",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-xl border border-captionDark/15 bg-surface-light/95 p-2.5 shadow-lg backdrop-blur-md dark:border-captionDark-dark/20 dark:bg-primaryDark/90 md:p-3",
          !isEmbedded && "pointer-events-auto",
          isEmbedded && "max-h-[min(48vh,480px)] min-h-0 overflow-y-auto",
        )}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-red/60 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-red dark:bg-accent-red-dark" />
            </span>
            <AppHeading as={2} size="sm" className="truncate text-primaryDark dark:text-primaryDark-dark">
              Media on air
            </AppHeading>
          </div>
          <Link
            href="/media/overview"
            className="shrink-0 text-[11px] font-medium text-primary-blue transition-opacity hover:opacity-80 dark:text-primary-blue-dark"
          >
            Media hub →
          </Link>
        </div>
        <AppParagraph variant="caption" size="sm" className="mb-2.5 line-clamp-2">
          Streams and packages your admin console is surfacing right now (sample feeds).
          {dateRange ? (
            <span className="mt-1 block text-[10px] text-captionDark dark:text-captionDark-dark">{dateRange}</span>
          ) : null}
        </AppParagraph>

        <div className="-mx-0.5 flex gap-2 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:thin]">
          {SAMPLE_ADMIN_MEDIA_ON_AIR.map((item, index) => (
            <Link
              key={item.id}
              href="/media/broadcasts"
              className={cn(
                "animate-inbox-card-enter group relative w-[7.25rem] shrink-0 overflow-hidden rounded-lg border border-captionDark/15 bg-captionDark/5 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-primary-blue/35 dark:border-captionDark-dark/25 dark:bg-captionDark-dark/10 dark:hover:border-primary-blue-dark/40",
              )}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element -- demo thumbnails; swap for next/image + remotePatterns when wired */}
                <img
                  src={thumbUrl(item.imageSeed)}
                  alt={`${item.outlet}: ${item.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primaryDark/85 via-primaryDark/20 to-transparent dark:from-black/80" />
                {item.live && (
                  <span className="absolute left-1 top-1 flex items-center gap-0.5 rounded bg-accent-red/95 px-1 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white shadow-sm">
                    <Radio className="h-2.5 w-2.5" aria-hidden />
                    Live
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-1.5">
                  <p className="truncate text-[9px] font-medium uppercase tracking-wide text-white/90">{item.outlet}</p>
                  <p className="mt-0.5 line-clamp-2 text-[10px] font-metropolis-medium leading-tight text-white">{item.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
