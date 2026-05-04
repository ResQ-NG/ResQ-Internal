"use client";

import { useState } from "react";
import { AppHeading } from "@/components/ui";
import { cn } from "@/lib/utils/generics";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "intake", label: "Intake" },
  { id: "investigating", label: "Investigating" },
  { id: "field", label: "Field" },
  { id: "closed", label: "Closed" },
] as const;

export function AgencyCaseFilters() {
  const [active, setActive] = useState<(typeof FILTERS)[number]["id"]>("all");

  return (
    <div>
      <AppHeading as={2} size="sm" className="mb-4">
        Filters
      </AppHeading>
      <div className="flex flex-col gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActive(f.id)}
            className={cn(
              "rounded-xl border px-3 py-2 text-left text-sm font-metropolis-medium transition-colors",
              active === f.id
                ? "border-primary-blue/35 bg-primary-blue/10 text-primary-blue dark:border-primary-blue-dark/30 dark:bg-primary-blue-dark/15 dark:text-primary-blue-dark"
                : "border-captionDark/15 text-captionDark hover:border-captionDark/25 hover:bg-captionDark/5 dark:border-captionDark-dark/20 dark:text-captionDark-dark dark:hover:bg-captionDark-dark/10"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-[10px] leading-relaxed text-captionDark dark:text-captionDark-dark">
        UI-only for now — connect to query params or a store when the case API exists.
      </p>
    </div>
  );
}
