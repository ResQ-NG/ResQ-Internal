import { AgencyIdentityBar } from "@/app/(agencies)/_components/AgencyIdentityBar";
import { AppHeading, AppParagraph } from "@/components/ui";

export default function AgenciesCasesPage() {
  return (
    <div className="p-6 space-y-8">
      <AgencyIdentityBar />
      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm overflow-hidden">
            <AppHeading as={2} size="sm" className="mb-4">
              Case list
            </AppHeading>
            <div className="mb-3 flex items-center justify-between text-xs text-captionDark dark:text-captionDark-dark">
              <span>Case ID</span>
              <span className="w-32 text-right">Title</span>
              <span className="w-24 text-right">Status</span>
              <span className="w-32 text-right">Lead</span>
              <span className="w-24 text-right">Updated</span>
            </div>
            <div className="h-64 rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10 flex items-center justify-center">
              <AppParagraph variant="caption">
                Table placeholder – hook this up to your case list API.
              </AppParagraph>
            </div>
          </div>
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <AppHeading as={2} size="sm" className="mb-3">
              Filters
            </AppHeading>
            <div className="space-y-3 text-sm text-captionDark dark:text-captionDark-dark">
              <div className="h-8 rounded-md bg-surface-light dark:bg-primaryDark/20" />
              <div className="h-8 rounded-md bg-surface-light dark:bg-primaryDark/20" />
              <div className="h-8 rounded-md bg-surface-light dark:bg-primaryDark/20" />
            </div>
          </div>
        </section>
    </div>
  );
}

