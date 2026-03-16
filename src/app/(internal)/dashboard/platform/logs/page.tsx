import { AppHeading, AppParagraph } from "@/components/ui";
import { DashboardHeader } from "@/app/(internal)/_components/DashboardHeader";

export default function PlatformLogsPage() {
  return (
    <>
      <DashboardHeader
        title="Platform · Logs & diagnostics"
        dateRange="Recent activity"
        showExport={false}
      />
      <div className="p-6">
        <section className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
          <AppHeading as={2} size="sm" className="mb-2">
            Logs & diagnostics
          </AppHeading>
          <AppParagraph variant="caption" className="mb-4">
            Placeholder for logs, traces, and diagnostic information from the ResQ
            platform.
          </AppParagraph>
          <div className="flex h-64 items-center justify-center rounded-lg border border-captionDark/15 dark:border-captionDark-dark/15 bg-surface-light/80 dark:bg-primaryDark/10">
            <AppParagraph variant="caption">
              Logs / diagnostics view placeholder
            </AppParagraph>
          </div>
        </section>
      </div>
    </>
  );
}
