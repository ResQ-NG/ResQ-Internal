import { MediaIdentityBar } from "@/app/(media)/_components/MediaIdentityBar";
import { AppHeading, AppParagraph } from "@/components/ui";

export default function MediaMapsPage() {
  return (
    <div className="p-6 space-y-8">
      <MediaIdentityBar />
      <section className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
          <AppHeading as={2} size="sm" className="mb-3">
            Immersive reports map
          </AppHeading>
          <AppParagraph variant="caption" className="mb-4">
            Explore incidents across the map, drill into hotspots, and build stories
            directly from location-based patterns.
          </AppParagraph>
          <div className="flex h-72 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
            <AppParagraph variant="caption">
              Map placeholder – connect to a tile map showing ResQ user reports.
            </AppParagraph>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Avg kidnappings / month
            </AppHeading>
            <p className="text-2xl font-metropolis-bold text-primaryDark dark:text-primaryDark-dark">
              7.4
            </p>
            <AppParagraph variant="caption" className="mt-2">
              Fake metric – helps you imagine the kind of insight this view should
              provide.
            </AppParagraph>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Top 3 incident types
            </AppHeading>
            <AppParagraph variant="caption" className="mt-2">
              Kidnapping, Flooding, Road accidents.
            </AppParagraph>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-2">
              Regions under watch
            </AppHeading>
            <AppParagraph variant="caption" className="mt-2">
              North corridor, Delta coast, Central highway belt.
            </AppParagraph>
          </div>
        </section>
    </div>
  );
}

