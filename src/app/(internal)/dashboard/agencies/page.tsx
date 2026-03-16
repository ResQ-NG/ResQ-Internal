import { AppHeading, AppParagraph } from "@/components/ui";
import { DashboardHeader } from "../../_components/DashboardHeader";

export default function AgenciesPage() {
  return (
    <>
      <DashboardHeader
        title="Agencies · List & branches"
        dateRange="All agencies"
        showExport={false}
      />
      <div className="p-6 space-y-8">
        <section className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
          <AppHeading as={2} size="sm" className="mb-2">
            Agencies
          </AppHeading>
          <AppParagraph variant="caption" className="mb-4">
            Table placeholder for agencies, branches, and key metrics. Wire this to
            your agency list API.
          </AppParagraph>
          <div className="flex h-48 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
            <AppParagraph variant="caption">
              Agencies table placeholder
            </AppParagraph>
          </div>
        </section>
        <section className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
          <AppHeading as={2} size="sm" className="mb-2">
            Branches map
          </AppHeading>
          <AppParagraph variant="caption" className="mb-4">
            Map placeholder showing agency branches and locations with open tickets.
          </AppParagraph>
          <div className="flex h-64 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
            <AppParagraph variant="caption">
              Map placeholder
            </AppParagraph>
          </div>
        </section>
      </div>
    </>
  );
}
