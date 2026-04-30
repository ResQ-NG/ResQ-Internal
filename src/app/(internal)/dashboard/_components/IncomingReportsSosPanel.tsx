"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, FileText, Radio } from "lucide-react";
import { AppHeading, AppLink, AppParagraph } from "@/components/ui";
import { cn } from "@/lib/utils";
import { INTERNAL_DASHBOARD_ROUTES } from "@/lib/routes/internal-dashboard-routes";
import {
  SAMPLE_INBOX,
  incidentProcessTextClass,
  sampleInboxAttentionCount,
  sampleInboxUncategorizedCount,
} from "./sampleCommandData";

type IncomingReportsSosPanelProps = {
  embedded?: boolean;
  /** When embedded beside the map, parent can collapse the column to a slim rail. */
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export function IncomingReportsSosPanel({
  embedded = false,
  collapsed = false,
  onToggleCollapse,
}: IncomingReportsSosPanelProps) {
  const [uncategorizedOnly, setUncategorizedOnly] = useState(false);
  const [bodyOpen, setBodyOpen] = useState(true);

  const cards = useMemo(() => {
    const list = uncategorizedOnly ? SAMPLE_INBOX.filter((r) => r.category === null) : [...SAMPLE_INBOX];
    return list.slice(0, 6);
  }, [uncategorizedOnly]);

  const uncategorizedCount = sampleInboxUncategorizedCount();
  const attentionCount = sampleInboxAttentionCount();

  const shell = embedded
    ? "flex h-full min-h-0 min-w-0 flex-col bg-surface-light dark:bg-surface-dark"
    : "rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm";

  if (embedded && collapsed && onToggleCollapse) {
    return (
      <div className="flex h-full min-h-0 w-full flex-col bg-surface-light dark:bg-surface-dark">
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-expanded={false}
          className="relative flex w-full items-center justify-between gap-2 border-b border-captionDark/15 px-3 py-2.5 text-left transition-colors hover:bg-captionDark/5 dark:border-captionDark-dark/20 dark:hover:bg-captionDark-dark/10 md:hidden"
        >
          <span className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              {attentionCount > 0 ? (
                <>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-red/70 opacity-80" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-red dark:bg-accent-red-dark" />
                </>
              ) : (
                <span className="block h-2.5 w-2.5 rounded-full bg-captionDark/35 dark:bg-captionDark-dark/45" aria-hidden />
              )}
            </span>
            <span className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">Watch Me inbox</span>
            {attentionCount > 0 ? (
              <span className="rounded-full bg-accent-red px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-white shadow-sm">
                {attentionCount > 99 ? "99+" : attentionCount}
              </span>
            ) : null}
          </span>
          <span className="flex shrink-0 items-center gap-2">
            {uncategorizedCount > 0 ? (
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[11px] font-medium text-amber-900 dark:text-amber-100">
                {uncategorizedCount} uncategorized
              </span>
            ) : null}
            <ChevronDown className="h-4 w-4 text-captionDark dark:text-captionDark-dark" aria-hidden />
          </span>
        </button>
        <div className="hidden min-h-[160px] flex-1 md:block" aria-hidden />
      </div>
    );
  }

  return (
    <section className={cn(shell, embedded && "p-4 md:pl-12")}>
      <div className="mb-3 rounded-xl border border-captionDark/15 bg-surface-light/80 p-3.5 dark:border-captionDark-dark/20 dark:bg-primaryDark/25">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <AppHeading as={2} size="sm" className="text-primaryDark dark:text-primaryDark-dark">
              Watch Me & new reports
            </AppHeading>
            <AppParagraph variant="caption" size="sm" className="mt-1">
              Fresh items only — triage from here.
            </AppParagraph>
          </div>
          <div className="flex shrink-0 items-start gap-1">
            {!embedded && (
              <button
                type="button"
                onClick={() => setBodyOpen((v) => !v)}
                className="rounded-lg p-1.5 text-captionDark transition-colors hover:bg-captionDark/10 hover:text-primaryDark dark:text-captionDark-dark dark:hover:bg-captionDark-dark/15 dark:hover:text-primaryDark-dark"
                aria-expanded={bodyOpen}
                aria-label={bodyOpen ? "Collapse list" : "Expand list"}
              >
                {bodyOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            )}
            <AppLink href={INTERNAL_DASHBOARD_ROUTES.incidents.watchMeSos} variant="primary" className="text-xs leading-none py-1.5">
              Open queue →
            </AppLink>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-xs text-captionDark dark:text-captionDark-dark">
            {uncategorizedCount} uncategorized waiting
          </p>
          <button
            type="button"
            onClick={() => setUncategorizedOnly((v) => !v)}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
              uncategorizedOnly
                ? "bg-primary-blue/15 text-primary-blue dark:bg-primary-blue-dark/20 dark:text-primary-blue-dark"
                : "text-captionDark hover:bg-captionDark/10 dark:text-captionDark-dark dark:hover:bg-captionDark-dark/15",
            )}
          >
            {uncategorizedOnly ? "Showing uncategorized" : "Uncategorized only"}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid min-h-0 flex-1 transition-[grid-template-rows] duration-300 ease-out",
          embedded || bodyOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "flex min-h-0 flex-col gap-2.5 overflow-y-auto pr-0.5",
              embedded ? "max-h-[min(52vh,480px)] flex-1 pb-1 md:max-h-none md:flex-1" : "max-h-[420px]",
            )}
          >
            {cards.length === 0 ? (
              <p className="py-6 text-center text-sm text-captionDark dark:text-captionDark-dark">Nothing in this filter.</p>
            ) : (
              cards.map((row, index) => (
                <article
                  key={`${uncategorizedOnly ? "u" : "a"}-${row.id}`}
                  style={{ animationDelay: `${index * 75}ms` }}
                  className={cn(
                    "animate-inbox-card-enter rounded-xl border border-captionDark/15 bg-surface-light p-3.5 shadow-sm transition-transform duration-200 dark:border-captionDark-dark/20 dark:bg-surface-dark",
                    row.kind === "sos" && "border-accent-red/30 ring-1 ring-accent-red/15 dark:border-accent-red-dark/35 dark:ring-accent-red-dark/20",
                    "hover:-translate-y-0.5 hover:border-captionDark/25 dark:hover:border-captionDark-dark/35",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                        row.kind === "sos"
                          ? "bg-accent-red/12 text-accent-red dark:text-accent-red-dark"
                          : "bg-primary-blue/10 text-primary-blue dark:text-primary-blue-dark",
                      )}
                    >
                      {row.kind === "sos" ? <Radio className="h-4 w-4" strokeWidth={2} /> : <FileText className="h-4 w-4" strokeWidth={2} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                          {row.kind === "sos" ? "Watch Me / SOS" : "Report"}
                        </span>
                        <span className="text-[11px] text-captionDark dark:text-captionDark-dark">{row.created}</span>
                      </div>
                      <p className="mt-1 font-metropolis-medium text-sm leading-snug text-primaryDark dark:text-primaryDark-dark">
                        {row.summary}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {row.category === null ? (
                          <span className="rounded-md bg-amber-500/12 px-2 py-0.5 text-[11px] font-medium text-amber-900 dark:text-amber-100">
                            Uncategorized
                          </span>
                        ) : (
                          <span className="rounded-md bg-captionDark/10 px-2 py-0.5 text-[11px] text-captionDark dark:text-captionDark-dark">
                            {row.category}
                          </span>
                        )}
                        <span className={cn("text-[11px] font-medium capitalize", incidentProcessTextClass(row.process))}>{row.process}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          <div className="mt-3 flex justify-center border-t border-captionDark/10 pt-3 dark:border-captionDark-dark/15">
            <AppLink href={INTERNAL_DASHBOARD_ROUTES.incidents.reports} variant="muted" className="text-xs">
              All reports →
            </AppLink>
          </div>
        </div>
      </div>

      {!embedded && bodyOpen && (
        <p className="mt-2 text-center text-[11px] text-captionDark dark:text-captionDark-dark">
          Sample data — connect to your API for live updates.
        </p>
      )}
    </section>
  );
}
