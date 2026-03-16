import { AppHeading, AppParagraph } from "@/components/ui";
import { DashboardHeader } from "@/app/(internal)/_components/DashboardHeader";

export default function LiveIncidentsPage() {
  return (
    <>
      <DashboardHeader
        title="Command Center · Live incidents"
        dateRange="Live view"
        showExport={false}
      />

      <div className="p-6 space-y-8">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Active incidents (live)
            </AppHeading>
            <AppParagraph variant="caption">
              Stream of incidents currently in progress. Wire this to your live data
              feed.
            </AppParagraph>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Floating / unassigned
            </AppHeading>
            <AppParagraph variant="caption">
              Incidents that have not yet been routed to an agency.
            </AppParagraph>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Queue health
            </AppHeading>
            <AppParagraph variant="caption">
              Backlog size, oldest incident age, and key response metrics.
            </AppParagraph>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Pipeline by status
            </AppHeading>
            <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
              <AppParagraph variant="caption">
                Placeholder for pipeline chart (reported → assigned → in progress →
                resolved).
              </AppParagraph>
            </div>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Unrouted reports map
            </AppHeading>
            <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
              <AppParagraph variant="caption">
                Map placeholder showing all unrouted reports.
              </AppParagraph>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
