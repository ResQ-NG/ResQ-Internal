import { DashboardHeader } from "@/app/(internal)/_components/DashboardHeader";
import { InternalContentWidthShell } from "@/app/(internal)/_components/InternalContentWidthShell";
import { AppParagraph } from "@/components/ui";
import { InternalPlatformHub } from "./_components/InternalPlatformHub";
import {
  getPlatformSummary,
  PLATFORM_ALERTS,
  PLATFORM_DEPLOYMENTS,
  PLATFORM_SERVICES,
} from "./_data/internal-platform-dummy";

export default function PlatformPage() {
  const summary = getPlatformSummary(PLATFORM_SERVICES, PLATFORM_ALERTS);

  return (
    <>
      <DashboardHeader
        title="Platform · Health & status"
        dateRange="Current status"
        showExport={false}
      />
      <InternalContentWidthShell>
        <div className="space-y-8 py-6 pb-12">
          <AppParagraph
            variant="caption"
            className="max-w-2xl text-sm leading-relaxed"
          >
            Platform is a demo operational view: health snapshot, active alerts,
            a service scoreboard, and a deployment timeline. The layout + components
            are intentionally different from the Users page.
          </AppParagraph>

          <InternalPlatformHub
            services={PLATFORM_SERVICES}
            deployments={PLATFORM_DEPLOYMENTS}
            alerts={PLATFORM_ALERTS}
            summary={summary}
          />
        </div>
      </InternalContentWidthShell>
    </>
  );
}
