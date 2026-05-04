"use client";

import { useMemo, useState } from "react";
import type {
  InternalAgencyBranchHotspot,
  InternalPrimaryBranch,
} from "../_data/internal-agencies-dummy";
import { getAllBranchHotspots } from "../_data/internal-agencies-dummy";
import { AppHeading, AppParagraph } from "@/components/ui";
import { SearchableDropdown } from "@/app/(internal)/dashboard/_components/SearchableDropdown";
import { cn } from "@/lib/utils/generics";

function HotspotDot({ h }: { h: InternalAgencyBranchHotspot }) {
  const hub = h.role === "hub";
  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5"
      style={{ left: `${h.xPct}%`, top: `${h.yPct}%` }}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-primary-blue shadow-md ring-white dark:bg-primary-blue-dark dark:ring-surface-dark",
          hub ? "h-4 w-4 ring-[3px]" : "h-2.5 w-2.5 ring-2"
        )}
        title={`${h.label} · ${h.tickets} open`}
        aria-hidden
      />
      <span className="max-w-[5.5rem] truncate rounded bg-black/60 px-1 py-px text-[8px] font-metropolis-semibold text-white backdrop-blur-sm dark:bg-black/70">
        {h.label}
      </span>
      <span className="rounded bg-white/90 px-1 py-px text-[8px] font-mono font-bold text-primaryDark shadow-sm dark:bg-primaryDark/90 dark:text-primaryDark-dark">
        {h.tickets}
      </span>
    </div>
  );
}

export function InternalAgenciesBranchFootprint({
  primaryBranches,
}: {
  primaryBranches: InternalPrimaryBranch[];
}) {
  const [primaryId, setPrimaryId] = useState("");

  const dropdownOptions = useMemo(
    () => primaryBranches.map((p) => ({ value: p.id, label: p.label })),
    [primaryBranches]
  );

  const selectedPrimary = useMemo(
    () => primaryBranches.find((p) => p.id === primaryId),
    [primaryBranches, primaryId]
  );

  const hotspots = useMemo(() => {
    if (!primaryId) return getAllBranchHotspots();
    return selectedPrimary?.hotspots ?? [];
  }, [primaryId, selectedPrimary]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <AppHeading as={2} size="sm" className="mb-1">
            Branch footprint
          </AppHeading>
          <AppParagraph variant="caption" className="max-w-2xl text-sm">
            Choose a <span className="font-metropolis-semibold">main branch</span> to plot every satellite
            office tied to that HQ. Clear the dropdown to overlay all demo footprints together.
          </AppParagraph>
        </div>
        <div className="flex shrink-0 flex-col gap-1.5 sm:items-end">
          <span className="text-[10px] font-medium uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
            Main branch
          </span>
          <SearchableDropdown
            value={primaryId}
            onValueChange={setPrimaryId}
            options={dropdownOptions}
            ariaLabel="Select main branch footprint"
            emptyLabel="All main branches"
            placeholder="Search main branches…"
            className="w-full min-w-[min(100%,18rem)] sm:w-auto"
            inputClassName="min-w-[12rem]"
          />
        </div>
      </div>

      {selectedPrimary ? (
        <p className="mb-3 text-xs text-captionDark dark:text-captionDark-dark">
          <span className="font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
            {selectedPrimary.agencyName}
          </span>
          {" · "}
          {hotspots.length} sites in this footprint
        </p>
      ) : (
        <p className="mb-3 text-xs text-captionDark dark:text-captionDark-dark">
          Showing <span className="font-mono font-semibold">{hotspots.length}</span> branch markers across{" "}
          {primaryBranches.length} main branches (demo merge).
        </p>
      )}

      <div className="relative min-h-[300px] overflow-hidden rounded-xl border border-captionDark/15 bg-gradient-to-br from-primary-blue/[0.06] via-surface-light to-violet-500/[0.05] dark:border-captionDark-dark/20 dark:from-primary-blue-dark/12 dark:via-primaryDark/35 dark:to-violet-500/10">
        <div
          className="absolute inset-0 opacity-[0.12] dark:opacity-[0.16]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 8h48v48H8z' fill='none' stroke='%2394a3b8' stroke-opacity='0.35' stroke-width='1'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="absolute left-3 top-3 max-w-[85%] rounded-lg border border-captionDark/15 bg-surface-light/90 px-2.5 py-1 text-[10px] font-metropolis-semibold text-primaryDark shadow-sm backdrop-blur-sm dark:border-captionDark-dark/25 dark:bg-primaryDark/80 dark:text-primaryDark-dark">
          Nigeria · relative footprint (demo) — replace with Mapbox when coordinates are available
        </div>

        {hotspots.map((h) => (
          <HotspotDot key={h.id} h={h} />
        ))}
      </div>
    </div>
  );
}
