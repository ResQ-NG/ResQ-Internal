"use client";

import { useMemo, useState } from "react";
import type { InternalAgencyRow, InternalAgencyStatus } from "../_data/internal-agencies-dummy";
import { INTERNAL_STATUS_FILTER_OPTIONS } from "../_data/internal-agencies-dummy";
import { AppHeading, AppInput, AppParagraph } from "@/components/ui";
import { SearchableDropdown } from "@/app/(internal)/dashboard/_components/SearchableDropdown";
import { InternalAgenciesTable } from "./InternalAgenciesTable";

const STATUS_OPTIONS = INTERNAL_STATUS_FILTER_OPTIONS.map((o) => ({
  value: o.value,
  label: o.label,
}));

export function InternalAgenciesDirectory({ rows }: { rows: InternalAgencyRow[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"" | InternalAgencyStatus>("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (status && r.status !== status) return false;
      if (!q) return true;
      const blob = `${r.code} ${r.name} ${r.jurisdiction} ${r.leadContact}`.toLowerCase();
      return blob.includes(q);
    });
  }, [rows, query, status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-captionDark/10 pb-5 dark:border-captionDark-dark/15">
        <AppHeading as={2} size="sm">
          Directory
        </AppHeading>
        <AppParagraph variant="caption" className="max-w-2xl text-sm">
          Filter agencies on the demo dataset; swap `rows` for live data from your admin API.
        </AppParagraph>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <AppInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search code, name, jurisdiction, contact…"
          className="min-w-0 flex-1 text-sm"
          containerClassName="min-w-0 flex-1 sm:max-w-md"
          aria-label="Search agencies"
        />
        <SearchableDropdown
          value={status}
          onValueChange={(v) => setStatus((v || "") as "" | InternalAgencyStatus)}
          options={STATUS_OPTIONS}
          ariaLabel="Filter by agency status"
          emptyLabel="All statuses"
          placeholder="Search statuses…"
          className="min-w-[11rem]"
        />
        <span className="text-[11px] text-captionDark dark:text-captionDark-dark sm:ml-auto">
          <span className="font-mono font-semibold text-primaryDark dark:text-primaryDark-dark">
            {filtered.length}
          </span>{" "}
          of {rows.length}
        </span>
      </div>

      <InternalAgenciesTable rows={filtered} />
    </div>
  );
}
