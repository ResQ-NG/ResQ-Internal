import { MediaIdentityBar } from "@/app/(media)/_components/MediaIdentityBar";
import { AppHeading, AppParagraph } from "@/components/ui";

export default function MediaOverviewPage() {
  return (
    <div className="p-6 space-y-8">
      <MediaIdentityBar />

      <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Verified reports today
            </AppHeading>
            <p className="text-3xl font-metropolis-bold text-primaryDark dark:text-primaryDark-dark">
              128
            </p>
            <AppParagraph variant="caption" className="mt-2">
              Number of reports verified by ResQ and partner agencies in the last
              24 hours.
            </AppParagraph>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Agencies broadcasting
            </AppHeading>
            <p className="text-3xl font-metropolis-bold text-primaryDark dark:text-primaryDark-dark">
              9
            </p>
            <AppParagraph variant="caption" className="mt-2">
              Agencies with active alerts or situation reports visible to media.
            </AppParagraph>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Stories in production
            </AppHeading>
            <p className="text-3xl font-metropolis-bold text-primaryDark dark:text-primaryDark-dark">
              14
            </p>
            <AppParagraph variant="caption" className="mt-2">
              Active editorial projects your newsroom is tracking from ResQ data.
            </AppParagraph>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-4">
              Top live stories
            </AppHeading>
            <div className="space-y-3">
              {["Major flooding in coastal region", "School safety incidents spike", "Kidnapping trend in northern corridor"].map(
                (headline) => (
                  <div
                    key={headline}
                    className="flex flex-col rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10 px-3 py-2"
                  >
                    <span className="text-sm font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                      {headline}
                    </span>
                    <AppParagraph variant="caption">
                      Story stub – replace with a live feed of newsroom-prioritized
                      stories.
                    </AppParagraph>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-4">
              Agency broadcast stream
            </AppHeading>
            <div className="space-y-3">
              {["Public safety advisory", "Transport disruption", "Weather alert"].map(
                (title) => (
                  <div
                    key={title}
                    className="flex flex-col rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10 px-3 py-2"
                  >
                    <span className="text-sm font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                      {title}
                    </span>
                    <AppParagraph variant="caption">
                      Placeholder broadcast summary – wire this to live agency
                      messages.
                    </AppParagraph>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
    </div>
  );
}

