import type { AgencyCaseDetail } from "@/app/(agencies)/_data/agency-dummy-data";
import { AppHeading, AppParagraph } from "@/components/ui";
import Link from "next/link";
import { AgencyCaseStatusBadge } from "./AgencyCaseStatusBadge";

export function AgencyCaseDetailView({ detail }: { detail: AgencyCaseDetail }) {
  const hasTimeline = detail.timeline.length > 0;
  const hasPeople = detail.people.length > 0;
  const hasLinked = detail.linkedReports.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/agencies/cases"
            className="text-xs font-metropolis-semibold text-primary-blue hover:underline dark:text-primary-blue-dark"
          >
            ← Back to cases
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-metropolis-bold text-primaryDark dark:text-primaryDark-dark">
              {detail.reference}
            </span>
            <AgencyCaseStatusBadge status={detail.status} />
          </div>
          <AppHeading as={1} size="md" className="mt-1 max-w-3xl">
            {detail.title}
          </AppHeading>
          <AppParagraph variant="caption" className="mt-2 max-w-2xl text-sm">
            {detail.summary}
          </AppParagraph>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-captionDark dark:text-captionDark-dark">
            <span>Region: {detail.region}</span>
            <span>Opened: {detail.openedLabel}</span>
            <span>Lead: {detail.lead}</span>
            <span>Updated: {detail.updatedLabel}</span>
          </div>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[2fr,1.35fr]">
        <div className="rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
          <AppHeading as={2} size="sm" className="mb-4">
            Case timeline
          </AppHeading>
          {hasTimeline ? (
            <ol className="relative ml-1 border-l border-captionDark/20 pl-5 dark:border-captionDark-dark/25">
              {detail.timeline.map((ev) => (
                <li key={ev.id} className="relative pb-6 last:pb-0">
                  <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary-blue ring-4 ring-surface-light dark:bg-primary-blue-dark dark:ring-surface-dark" />
                  <p className="text-xs font-metropolis-bold text-captionDark dark:text-captionDark-dark">
                    {ev.timeLabel}
                  </p>
                  <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
                    {ev.title}
                  </p>
                  <AppParagraph variant="caption" className="mt-1 text-xs leading-relaxed">
                    {ev.detail}
                  </AppParagraph>
                </li>
              ))}
            </ol>
          ) : (
            <div className="flex min-h-[12rem] items-center justify-center rounded-xl border border-dashed border-captionDark/20 bg-surface-light/80 dark:border-captionDark-dark/25 dark:bg-primaryDark/20">
              <AppParagraph variant="caption" className="max-w-xs text-center text-xs">
                No demo timeline entries for this case id — add entries in{" "}
                <code className="rounded bg-captionDark/10 px-1 py-px text-[10px]">agency-dummy-data</code>{" "}
                when prototyping flows.
              </AppParagraph>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
            <AppHeading as={2} size="sm" className="mb-4">
              People involved
            </AppHeading>
            {hasPeople ? (
              <ul className="space-y-3">
                {detail.people.map((p) => (
                  <li
                    key={p.id}
                    className="rounded-xl border border-captionDark/12 bg-surface-light/90 px-3 py-2 dark:border-captionDark-dark/15 dark:bg-primaryDark/25"
                  >
                    <p className="text-[10px] font-metropolis-bold uppercase tracking-wide text-primary-blue dark:text-primary-blue-dark">
                      {p.role}
                    </p>
                    <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
                      {p.name}
                    </p>
                    {p.note ? (
                      <AppParagraph variant="caption" className="mt-0.5 text-xs">
                        {p.note}
                      </AppParagraph>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-dashed border-captionDark/20 px-3 py-8 text-center dark:border-captionDark-dark/25">
                <AppParagraph variant="caption" className="text-xs">
                  No demo people for this case.
                </AppParagraph>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
            <AppHeading as={2} size="sm" className="mb-4">
              Linked reports
            </AppHeading>
            {hasLinked ? (
              <ul className="space-y-2">
                {detail.linkedReports.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-start justify-between gap-2 rounded-xl border border-captionDark/12 px-3 py-2 dark:border-captionDark-dark/15"
                  >
                    <p className="text-sm text-primaryDark dark:text-primaryDark-dark">{r.summary}</p>
                    <span className="shrink-0 text-[10px] text-captionDark dark:text-captionDark-dark">
                      {r.timeLabel}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-dashed border-captionDark/20 px-3 py-8 text-center dark:border-captionDark-dark/25">
                <AppParagraph variant="caption" className="text-xs">
                  No linked reports in the demo payload.
                </AppParagraph>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
