"use client";

import { usePathname } from "next/navigation";
import { AppParagraph } from "@/components/ui";

export function AgencyIdentityBar() {
  const pathname = usePathname();

  const breadcrumb = (() => {
    if (pathname.startsWith("/agencies/overview")) return "Agencies / Live reports";
    if (pathname.startsWith("/agencies/cases/")) return "Agencies / Case detail";
    if (pathname.startsWith("/agencies/cases")) return "Agencies / Cases";
    if (pathname.startsWith("/agencies/map")) return "Agencies / Map";
    if (pathname.startsWith("/agencies/broadcasts")) return "Agencies / Broadcasts";
    if (pathname.startsWith("/agencies/settings")) return "Agencies / Settings";
    return "Agencies";
  })();

  return (
    <section className="flex items-center justify-between rounded-xl border border-captionDark/20 dark:border-captionDark-dark/25 bg-surface-light/80 dark:bg-black/60 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-accent text-sm font-metropolis-semibold text-white shadow-sm">
          NA
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
            National Safety Agency
          </p>
          <AppParagraph variant="caption" className="text-xs">
            Mainland Operations Branch · Lagos
          </AppParagraph>
        </div>
      </div>
      <AppParagraph variant="caption" className="hidden text-xs text-captionDark-dark/80 sm:block">
        {breadcrumb}
      </AppParagraph>
    </section>
  );
}

