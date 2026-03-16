import { AgencyIdentityBar } from "@/app/(agencies)/_components/AgencyIdentityBar";
import { AppHeading, AppParagraph } from "@/components/ui";

export default function AgenciesOverviewPage() {
  return (
    <div className="p-6 space-y-8">
      <AgencyIdentityBar />

      <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              New reports today
            </AppHeading>
            <p className="text-3xl font-metropolis-bold text-primaryDark dark:text-primaryDark-dark">
              63
            </p>
            <AppParagraph variant="caption" className="mt-2">
              Incoming reports routed to this agency in the last 24 hours.
            </AppParagraph>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Open cases
            </AppHeading>
            <p className="text-3xl font-metropolis-bold text-primaryDark dark:text-primaryDark-dark">
              27
            </p>
            <AppParagraph variant="caption" className="mt-2">
              Cases currently in investigation or response.
            </AppParagraph>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Avg response time
            </AppHeading>
            <p className="text-3xl font-metropolis-bold text-primaryDark dark:text-primaryDark-dark">
              23 min
            </p>
            <AppParagraph variant="caption" className="mt-2">
              Time from report to first agency action (fake data).
            </AppParagraph>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1.4fr]">
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-3">
              Live report feed
            </AppHeading>
            <div className="flex h-72 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
              <AppParagraph variant="caption">
                Placeholder feed of incoming reports assigned to this agency.
              </AppParagraph>
            </div>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-3">
              Agency reports map
            </AppHeading>
            <div className="flex h-72 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
              <AppParagraph variant="caption">
                Map placeholder showing current incidents by location for this agency.
              </AppParagraph>
            </div>
          </div>
        </section>
    </div>
  );
}

