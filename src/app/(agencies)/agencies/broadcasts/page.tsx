import { AgencyIdentityBar } from "@/app/(agencies)/_components/AgencyIdentityBar";
import { AppHeading, AppParagraph, AppButton } from "@/components/ui";

export default function AgenciesBroadcastsPage() {
  return (
    <div className="p-6 space-y-8">
      <AgencyIdentityBar />
      <section className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <AppHeading as={2} size="sm">
                Active broadcasts
              </AppHeading>
              <AppButton size="sm" variant="primary">
                New broadcast
              </AppButton>
            </div>
            <div className="h-56 rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10 flex items-center justify-center">
              <AppParagraph variant="caption">
                Placeholder for alerts and advisories currently visible to users and media.
              </AppParagraph>
            </div>
          </div>
          <div className="w-full max-w-md rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-3">
              Broadcast history
            </AppHeading>
            <div className="h-56 rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10 flex items-center justify-center">
              <AppParagraph variant="caption">
                Placeholder for previously sent broadcasts.
              </AppParagraph>
            </div>
          </div>
        </section>
    </div>
  );
}

