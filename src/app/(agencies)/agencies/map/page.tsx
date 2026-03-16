import { AgencyIdentityBar } from "@/app/(agencies)/_components/AgencyIdentityBar";
import { AppHeading, AppParagraph } from "@/components/ui";

export default function AgenciesMapPage() {
  return (
    <div className="p-6 space-y-8">
      <AgencyIdentityBar />
      <section className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
          <AppHeading as={2} size="sm" className="mb-3">
            Operations map
          </AppHeading>
          <div className="flex h-80 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
            <AppParagraph variant="caption">
              Map placeholder – visualize all active incidents handled by this agency.
            </AppParagraph>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Open incidents by region
            </AppHeading>
            <AppParagraph variant="caption" className="mt-2">
              Summary of how many open incidents exist in each region (fake data).
            </AppParagraph>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Response rate by region
            </AppHeading>
            <AppParagraph variant="caption" className="mt-2">
              Placeholder for per-region response rate, latency and closure metrics.
            </AppParagraph>
          </div>
        </section>
    </div>
  );
}

