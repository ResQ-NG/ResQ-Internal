import { AgencyIdentityBar } from "@/app/(agencies)/_components/AgencyIdentityBar";
import { AppHeading, AppParagraph } from "@/components/ui";

interface CaseDetailPageProps {
  params: { id: string };
}

export default function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { id } = params;

  return (
    <div className="p-6 space-y-8">
      <AgencyIdentityBar />
      <section className="grid gap-6 lg:grid-cols-[2fr,1.4fr]">
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-3">
              Case timeline
            </AppHeading>
            <div className="flex h-72 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
              <AppParagraph variant="caption">
                Placeholder for chronological events, notes, and status changes for this case.
              </AppParagraph>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
              <AppHeading as={2} size="sm" className="mb-3">
                People involved
              </AppHeading>
              <div className="flex h-32 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
                <AppParagraph variant="caption">
                  Placeholder for victims, witnesses, and assigned responders.
                </AppParagraph>
              </div>
            </div>
            <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
              <AppHeading as={2} size="sm" className="mb-3">
                Linked reports
              </AppHeading>
              <div className="flex h-32 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
                <AppParagraph variant="caption">
                  Placeholder for reports that were merged into this case.
                </AppParagraph>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}

