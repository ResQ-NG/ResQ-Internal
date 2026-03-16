import { AppHeading, AppParagraph, AppButton } from "@/components/ui";
import { DashboardHeader } from "../../../_components/DashboardHeader";

export default function NewAgencyPage() {
  return (
    <>
      <DashboardHeader
        title="Agencies · Create agency"
        dateRange="Setup"
        showExport={false}
      />
      <div className="p-6">
        <section className="mx-auto max-w-2xl rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
          <AppHeading as={2} size="sm" className="mb-2">
            New agency
          </AppHeading>
          <AppParagraph variant="caption" className="mb-6">
            Basic scaffold for creating a new agency. Replace with a real form wired
            to your backend.
          </AppParagraph>
          <div className="space-y-4 text-sm text-captionDark dark:text-captionDark-dark">
            <div className="h-10 rounded-md bg-surface-light dark:bg-primaryDark/20" />
            <div className="h-10 rounded-md bg-surface-light dark:bg-primaryDark/20" />
            <div className="h-10 rounded-md bg-surface-light dark:bg-primaryDark/20" />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <AppButton variant="ghost" size="sm">
              Cancel
            </AppButton>
            <AppButton variant="primary" size="sm">
              Save agency
            </AppButton>
          </div>
        </section>
      </div>
    </>
  );
}

