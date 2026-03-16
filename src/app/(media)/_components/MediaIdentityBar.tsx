"use client";

import { usePathname } from "next/navigation";
import { AppParagraph } from "@/components/ui";

export function MediaIdentityBar() {
  const pathname = usePathname();

  const breadcrumb = (() => {
    if (pathname.startsWith("/media/overview")) return "Media / Overview";
    if (pathname.startsWith("/media/reports")) return "Media / Verified reports";
    if (pathname.startsWith("/media/broadcasts")) return "Media / Broadcasts";
    if (pathname.startsWith("/media/maps")) return "Media / Maps";
    if (pathname.startsWith("/media/teams")) return "Media / Teams";
    return "Media";
  })();

  return (
    <section className="flex items-center justify-between rounded-xl border border-captionDark/20 dark:border-captionDark-dark/25 bg-surface-light/80 dark:bg-black/60 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-sm font-metropolis-semibold text-white shadow-sm">
          MC
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
            ResQ Media Collective
          </p>
          <AppParagraph variant="caption" className="text-xs">
            Lagos Bureau · West Africa desk
          </AppParagraph>
        </div>
      </div>
      <AppParagraph variant="caption" className="hidden text-xs text-captionDark-dark/80 sm:block">
        {breadcrumb}
      </AppParagraph>
    </section>
  );
}

