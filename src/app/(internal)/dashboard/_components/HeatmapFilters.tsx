"use client";

import { cn } from "@/lib/utils";
import { SearchableDropdown } from "./SearchableDropdown";

export function HeatmapFilters({
  groupBy,
  setGroupBy,
  stateFilter,
  setStateFilter,
  cityFilter,
  setCityFilter,
  states,
  citiesForState,
}: {
  groupBy: "state" | "city";
  setGroupBy: (next: "state" | "city") => void;
  stateFilter: string;
  setStateFilter: (next: string) => void;
  cityFilter: string;
  setCityFilter: (next: string) => void;
  states: string[];
  citiesForState: Array<{ city: string; state: string }>;
}) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {/* Group by */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-metropolis-semibold text-captionDark dark:text-captionDark-dark">
          Group
        </span>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value as "state" | "city")}
          className="h-8 rounded-lg border border-captionDark/20 bg-surface-light px-2.5 text-[11px] font-metropolis-semibold text-primaryDark shadow-sm outline-none focus:border-primary-blue/40 focus:ring-2 focus:ring-primary-blue/20 dark:border-captionDark-dark/25 dark:bg-surface-dark dark:text-primaryDark-dark dark:focus:border-primary-blue-dark/45 dark:focus:ring-primary-blue-dark/20"
          aria-label="Group heatmap by"
        >
          <option value="state">State</option>
          <option value="city">City</option>
        </select>
      </div>

      {/* State filter */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-metropolis-semibold text-captionDark dark:text-captionDark-dark">
          State
        </span>
        <SearchableDropdown
          value={stateFilter}
          onValueChange={setStateFilter}
          options={states.map((s) => ({ value: s, label: s }))}
          ariaLabel="Filter by state"
          emptyLabel="All states"
          placeholder="Search states…"
        />
      </div>

      {/* City filter (only when grouping by city) */}
      {groupBy === "city" ? (
        <div
          className={cn("hidden items-center gap-2 sm:flex", !stateFilter && "opacity-50")}
        >
          <span className="text-[11px] font-metropolis-semibold text-captionDark dark:text-captionDark-dark">
            City
          </span>
          <SearchableDropdown
            value={cityFilter}
            onValueChange={setCityFilter}
            disabled={!stateFilter}
            options={citiesForState
              .map((c) => (c.city?.trim() ? c.city : ""))
              .filter((city, idx, arr) => city !== "" && arr.indexOf(city) === idx)
              .map((city) => ({ value: city, label: city }))}
            ariaLabel="Filter by city"
            emptyLabel="All cities"
            placeholder="Search cities…"
          />
        </div>
      ) : null}
    </div>
  );
}

