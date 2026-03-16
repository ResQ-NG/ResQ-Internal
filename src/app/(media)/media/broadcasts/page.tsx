import { MediaIdentityBar } from "@/app/(media)/_components/MediaIdentityBar";
import { AppHeading, AppParagraph, AppButton } from "@/components/ui";

export default function MediaBroadcastsPage() {
  return (
    <div className="p-6 space-y-8">
      <MediaIdentityBar />
      <section className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <AppHeading as={2} size="sm">
                Active broadcasts
              </AppHeading>
              <AppButton size="sm" variant="primary">
                Create broadcast
              </AppButton>
            </div>
            <div className="h-56 rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10 flex items-center justify-center">
              <AppParagraph variant="caption">
                List placeholder for ongoing alerts and situation reports from agencies.
              </AppParagraph>
            </div>
          </div>
          <div className="w-full max-w-md rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-3">
              Draft broadcasts
            </AppHeading>
            <div className="h-56 rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10 flex items-center justify-center">
              <AppParagraph variant="caption">
                Placeholder for saved drafts your newsroom plans to publish.
              </AppParagraph>
            </div>
          </div>
        </section>
    </div>
  );
}

