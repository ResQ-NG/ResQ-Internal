import { AppHeading, AppParagraph } from "@/components/ui";
import { DashboardHeader } from "@/app/(internal)/_components/DashboardHeader";

export default function PlatformPage() {
  return (
    <>
      <DashboardHeader
        title="Platform · Health & status"
        dateRange="Current status"
        showExport={false}
      />
      <div className="p-6 space-y-8">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Services
            </AppHeading>
            <AppParagraph variant="caption">
              Placeholder for core service health (API, websockets, workers, etc.).
            </AppParagraph>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Queues
            </AppHeading>
            <AppParagraph variant="caption">
              Placeholder for queue depths and processing latency.
            </AppParagraph>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Error rate
            </AppHeading>
            <AppParagraph variant="caption">
              Placeholder for error rate and alerting status.
            </AppParagraph>
          </div>
        </section>
      </div>
    </>
  );
}
