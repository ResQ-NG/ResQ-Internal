import { AppHeading, AppParagraph } from "@/components/ui";
import { DashboardHeader } from "../../../_components/DashboardHeader";

export default function WatchMeSosPage() {
  return (
    <>
      <DashboardHeader
        title="Incidents · Watch Me & SOS"
        dateRange="Live & historical"
        showExport={false}
      />
      <div className="p-6">
        <section className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
          <AppHeading as={2} size="sm" className="mb-2">
            Watch Me & SOS sessions
          </AppHeading>
          <AppParagraph variant="caption" className="mb-4">
            Session-based incidents with streaming location and status.
          </AppParagraph>
          <div className="flex h-64 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
            <AppParagraph variant="caption">
              Sessions table placeholder
            </AppParagraph>
          </div>
        </section>
      </div>
    </>
  );
}

