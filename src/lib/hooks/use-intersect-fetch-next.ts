import { RefObject, useEffect, useRef } from "react";

/** Fetch next page when `targetRef` enters the viewport of `rootRef`. */
export function useIntersectFetchNext({
  rootRef,
  targetRef,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  enabled = true,
  rootMargin = "120px",
}: {
  rootRef: RefObject<Element | null>;
  targetRef: RefObject<Element | null>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  enabled?: boolean;
  rootMargin?: string;
}) {
  const latest = useRef({ hasNextPage, isFetchingNextPage, fetchNextPage });
  latest.current = { hasNextPage, isFetchingNextPage, fetchNextPage };

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const target = targetRef.current;
    if (!root || !target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const { hasNextPage, isFetchingNextPage, fetchNextPage } = latest.current;
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root, rootMargin, threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [enabled, rootMargin, rootRef, targetRef]);
}
