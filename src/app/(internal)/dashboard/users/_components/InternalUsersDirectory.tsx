"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import type { InternalUserPlatform, InternalUserRow } from "../_data/internal-users-dummy";
import { AppHeading, AppInput, AppParagraph, AppButton } from "@/components/ui";
import { SearchableDropdown } from "@/app/(internal)/dashboard/_components/SearchableDropdown";
import { InternalUsersTable } from "./InternalUsersTable";

const PAGE_SIZE = 10;

const PLATFORM_OPTIONS: { value: InternalUserPlatform; label: string }[] = [
  { value: "ios", label: "iOS" },
  { value: "android", label: "Android" },
  { value: "web", label: "Web" },
];

const iconBtn =
  "h-9 w-9 shrink-0 border border-captionDark/15 bg-transparent p-0 text-primaryDark shadow-none hover:bg-captionDark/[0.07] disabled:opacity-35 dark:border-captionDark-dark/20 dark:text-primaryDark-dark dark:hover:bg-captionDark-dark/10";

export function InternalUsersDirectory({
  users,
  onPickUser,
}: {
  users: InternalUserRow[];
  onPickUser: (u: InternalUserRow) => void;
}) {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<"" | InternalUserPlatform>("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      if (platform && u.platform !== platform) return false;
      if (!q) return true;
      const blob = `${u.displayName} ${u.email} ${u.state} ${u.city} ${u.phone}`.toLowerCase();
      return blob.includes(q);
    });
  }, [users, query, platform]);

  useEffect(() => {
    setPage(1);
  }, [query, platform]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageSlice = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  useEffect(() => {
    if (page !== safePage) setPage(safePage);
  }, [page, safePage]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-captionDark/10 pb-5 dark:border-captionDark-dark/15">
        <AppHeading as={2} size="sm">
          Directory
        </AppHeading>
        <AppParagraph variant="caption" className="max-w-2xl text-sm">
          Filter the list, then open any row for the full profile in the side panel.
        </AppParagraph>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <AppInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, phone, location…"
          className="min-w-0 flex-1 text-sm"
          containerClassName="min-w-0 flex-1 sm:max-w-md"
          aria-label="Search users"
        />
        <SearchableDropdown
          value={platform}
          onValueChange={(v) => setPlatform((v || "") as "" | InternalUserPlatform)}
          options={PLATFORM_OPTIONS}
          ariaLabel="Filter by platform"
          emptyLabel="All platforms"
          placeholder="Search platforms…"
          className="min-w-[11rem]"
        />
        <span className="text-[11px] text-captionDark dark:text-captionDark-dark sm:ml-auto">
          <span className="font-mono font-semibold text-primaryDark dark:text-primaryDark-dark">
            {filtered.length}
          </span>{" "}
          matches · page{" "}
          <span className="font-mono font-semibold">{safePage}</span> / {totalPages}
        </span>
      </div>

      <InternalUsersTable rows={pageSlice} onRowClick={onPickUser} />

      <nav
        className="flex flex-col items-stretch gap-4 border-t border-captionDark/10 pt-5 dark:border-captionDark-dark/15 sm:flex-row sm:items-center sm:justify-between"
        aria-label="Pagination"
      >
        <p className="text-center text-[11px] text-captionDark dark:text-captionDark-dark sm:text-left">
          Showing{" "}
          <span className="font-mono font-semibold text-primaryDark dark:text-primaryDark-dark">
            {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}
          </span>
          –
          <span className="font-mono font-semibold text-primaryDark dark:text-primaryDark-dark">
            {Math.min(filtered.length, safePage * PAGE_SIZE)}
          </span>{" "}
          of {filtered.length}
        </p>
        <div className="flex items-center justify-center gap-1.5 sm:justify-end">
          <AppButton
            type="button"
            variant="ghost"
            size="sm"
            className={iconBtn}
            disabled={safePage <= 1}
            onClick={() => setPage(1)}
            aria-label="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </AppButton>
          <AppButton
            type="button"
            variant="ghost"
            size="sm"
            className={iconBtn}
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </AppButton>
          <AppButton
            type="button"
            variant="ghost"
            size="sm"
            className={iconBtn}
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </AppButton>
          <AppButton
            type="button"
            variant="ghost"
            size="sm"
            className={iconBtn}
            disabled={safePage >= totalPages}
            onClick={() => setPage(totalPages)}
            aria-label="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </AppButton>
        </div>
      </nav>
    </div>
  );
}
