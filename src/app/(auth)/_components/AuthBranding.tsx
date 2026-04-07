"use client";

import Link from "next/link";
import { LottieLogo } from "@/components/LottieLogo";
import { AppParagraph } from "@/components/ui";

export function AuthBranding() {
  return (
    <Link
      href="/"
      className="group flex flex-col items-center gap-3 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl px-2 py-1"
    >
      <div className="relative h-24 w-24 shrink-0 transition-opacity group-hover:opacity-90">
        <LottieLogo size="md" className="h-full w-full max-h-24 max-w-24" />
      </div>
      <div>
        <p className="font-metropolis-semibold text-lg text-white tracking-tight">
          ResQ Authentication
        </p>
        <AppParagraph
          variant="caption"
          size="sm"
          className="text-white/65 dark:text-white/65"
        >
          Secure access to your workspace
        </AppParagraph>
      </div>
    </Link>
  );
}
