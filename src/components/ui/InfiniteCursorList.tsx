"use client";

import type { ReactNode, Key } from "react";
import { useRef } from "react";
import { Loader2 } from "lucide-react";
import type { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import type { CursorPaginatedResult } from "@/network/types";
import { useIntersectFetchNext } from "@/lib/hooks/use-intersect-fetch-next";
import { cn } from "@/lib/utils";
import { AppButton } from "./AppButton";
import { AppEmpty } from "./AppEmpty";
import { AppError } from "./AppError";
import { AppParagraph } from "./AppParagraph";

export function flattenCursorItems<T>(
  data: InfiniteData<CursorPaginatedResult<T>> | undefined,
): T[] {
  return data?.pages.flatMap((p) => p.items) ?? [];
}

export type InfiniteCursorListProps<TItem> = {
  query: Pick<
    UseInfiniteQueryResult<InfiniteData<CursorPaginatedResult<TItem>>, Error>,
    | "data"
    | "isLoading"
    | "isFetching"
    | "isError"
    | "error"
    | "hasNextPage"
    | "fetchNextPage"
    | "isFetchingNextPage"
    | "refetch"
  >;
  flatten?: (
    data: InfiniteData<CursorPaginatedResult<TItem>> | undefined,
  ) => TItem[];
  getItemKey: (item: TItem) => Key;
  renderItem: (item: TItem, index: number) => ReactNode;
  /** Sticky-ish summary above the list (e.g. count + filters) */
  footerSummary?: ReactNode;
  loadingMessage?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  errorTitle?: string;
  /** Outer wrapper. Caller is expected to constrain height (e.g. `flex-1 min-h-0`). */
  className?: string;
  /** Padding/gap inside the scrollport */
  scrollAreaClassName?: string;
};

export function InfiniteCursorList<TItem>({
  query,
  flatten = flattenCursorItems<TItem>,
  getItemKey,
  renderItem,
  loadingMessage = "Loading…",
  emptyTitle = "Nothing here yet",
  emptyDescription,
  errorTitle = "Couldn’t load data",
  footerSummary,
  className,
  scrollAreaClassName,
}: InfiniteCursorListProps<TItem>) {
  const items = flatten(query.data);
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useIntersectFetchNext({
    rootRef: scrollRootRef,
    targetRef: sentinelRef,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage ?? false,
    fetchNextPage: query.fetchNextPage,
    enabled: !query.isLoading && !query.isError,
  });

  if (query.isLoading) {
    return (
      <div
        className={cn(
          "flex min-h-[160px] flex-1 items-center justify-center rounded-xl border border-captionDark/15 bg-surface-light/80 dark:border-captionDark-dark/15 dark:bg-primaryDark/10",
        )}
      >
        <AppParagraph variant="caption">{loadingMessage}</AppParagraph>
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="space-y-3 px-1">
        <AppError
          title={errorTitle}
          message={
            query.error instanceof Error ? query.error.message : "Unknown error"
          }
        />
        <AppButton variant="outline" size="sm" onClick={() => query.refetch()}>
          Retry
        </AppButton>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <AppEmpty compact title={emptyTitle} description={emptyDescription} />
    );
  }

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col overflow-hidden", className)}>
      {footerSummary ? (
        <div className="mb-2 shrink-0">{footerSummary}</div>
      ) : null}

      <div
        ref={scrollRootRef}
        className={cn(
          "min-h-0 flex-1 overflow-y-auto overscroll-contain",
          scrollAreaClassName,
        )}
      >
        <div className="grid gap-2.5">
          {items.map((item, index) => {
            const node = renderItem(item, index);
            if (node === null) return null;
            return <div key={getItemKey(item)}>{node}</div>;
          })}
        </div>

        {query.hasNextPage ? (
          <div ref={sentinelRef} aria-hidden className="h-px w-full" />
        ) : null}

        {query.isFetchingNextPage ? (
          <div className="flex items-center justify-center gap-2 py-3 text-captionDark dark:text-captionDark-dark">
            <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" aria-hidden />
            <span className="text-[11px] font-metropolis-medium">Loading more…</span>
          </div>
        ) : !query.hasNextPage ? (
          <p className="py-3 text-center text-[10px] uppercase tracking-wide text-captionDark/70 dark:text-captionDark-dark/70">
            End of list
          </p>
        ) : null}
      </div>
    </div>
  );
}
