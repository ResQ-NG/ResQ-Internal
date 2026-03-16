import { AgencyIdentityBar } from "@/app/(agencies)/_components/AgencyIdentityBar";
import { AppHeading, AppParagraph } from "@/components/ui";

export default function AgenciesSettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <AgencyIdentityBar />
      <section className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
          <AppHeading as={2} size="sm" className="mb-2">
            Agency profile
          </AppHeading>
          <AppParagraph variant="caption" className="mb-4">
            Basic information about this agency – name, contact details, jurisdictions.
            Replace this with a real form.
          </AppParagraph>
          <div className="space-y-3">
            <div className="h-8 rounded-md bg-surface-light dark:bg-primaryDark/20" />
            <div className="h-8 rounded-md bg-surface-light dark:bg-primaryDark/20" />
          </div>
        </section>

        <section className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
          <AppHeading as={2} size="sm" className="mb-2">
            Routing rules
          </AppHeading>
          <AppParagraph variant="caption" className="mb-4">
            Define how incoming reports are routed to teams, queues, or cases.
          </AppParagraph>
          <div className="h-32 rounded-md bg-surface-light dark:bg-primaryDark/20" />
        </section>

        <section className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
          <AppHeading as={2} size="sm" className="mb-2">
            Staff & permissions
          </AppHeading>
          <AppParagraph variant="caption" className="mb-4">
            Manage responders, dispatchers and supervisors, including their access
            levels.
          </AppParagraph>
          <div className="h-32 rounded-md bg-surface-light dark:bg-primaryDark/20" />
        </section>
    </div>
  );
}

