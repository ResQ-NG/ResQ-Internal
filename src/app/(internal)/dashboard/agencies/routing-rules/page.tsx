import { DashboardHeader } from "@/app/(internal)/_components/DashboardHeader";
import { AppHeading, AppParagraph } from "@/components/ui";


export default function RoutingRulesPage() {
  return (
    <>
      <DashboardHeader
        title="Agencies · Routing rules"
        dateRange="When new reports arrive"
        showExport={false}
      />
      <div className="p-6">
        <section className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
          <AppHeading as={2} size="sm" className="mb-2">
            Routing rules
          </AppHeading>
          <AppParagraph variant="caption" className="mb-4">
            Configure how incoming incidents are routed to agencies based on type,
            severity, location, and schedules.
          </AppParagraph>
          <div className="flex h-64 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
            <AppParagraph variant="caption">
              Routing rules designer placeholder
            </AppParagraph>
          </div>
        </section>
      </div>
    </>
  );
}
