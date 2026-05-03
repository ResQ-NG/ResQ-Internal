"use client";

import { AppEmpty, AppError, AppGlassSkeleton } from "@/components/ui";
import { cn } from "@/lib/utils/generics";
import { useGetReportDetails } from "@/network/modules/internal/incidents/reports/queries";
import { IncidentDetailActions } from "./incident-detail/IncidentDetailActions";
import { IncidentDetailDeepInference } from "./incident-detail/IncidentDetailDeepInference";
import { IncidentDetailDevice } from "./incident-detail/IncidentDetailDevice";
import { IncidentDetailEvidence } from "./incident-detail/IncidentDetailEvidence";
import { IncidentDetailHeader } from "./incident-detail/IncidentDetailHeader";
import { IncidentDetailHero } from "./incident-detail/IncidentDetailHero";
import { IncidentDetailMeta } from "./incident-detail/IncidentDetailMeta";
import { IncidentDetailNarrative } from "./incident-detail/IncidentDetailNarrative";
import { IncidentDetailValidations } from "./incident-detail/IncidentDetailValidations";
import { type SampleInboxRow } from "./sampleCommandData";

type IncidentDetailCardProps = {
  row: SampleInboxRow;
  onBack?: () => void;
  onClose?: () => void;
  embedded?: boolean;
};

export function IncidentDetailCard({
  row,
  onBack,
  onClose,
  embedded = false,
}: IncidentDetailCardProps) {
  const apiReportId = row.apiReportId;
  const detailQuery = useGetReportDetails(
    apiReportId ? { id: apiReportId } : undefined
  );
  const detail = detailQuery.data ?? null;
  const isLoading = Boolean(apiReportId) && detailQuery.isLoading && !detail;
  const isFetchingMore =
    Boolean(apiReportId) && detailQuery.isFetching && Boolean(detail);
  const isError = Boolean(apiReportId) && detailQuery.isError && !detail;

  return (
    <div
      className={cn(
        "flex min-h-0 flex-col gap-0 overflow-y-auto",
        embedded
          ? "h-full"
          : "rounded-xl border border-captionDark/20 bg-surface-light shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark"
      )}
    >
      <IncidentDetailHeader
        row={row}
        detail={detail}
        isFetching={isFetchingMore}
        onBack={onBack}
        onClose={onClose}
      />

      <div className="flex flex-col gap-3 overflow-y-auto px-4 py-4">
        <IncidentDetailHero row={row} detail={detail} />

        {apiReportId ? (
          <>
            {isLoading ? (
              <div className="flex flex-col gap-3">
                <AppGlassSkeleton
                  lines={3}
                  caption="Loading incident details…"
                />
                <AppGlassSkeleton lines={4} />
              </div>
            ) : null}

            {isError ? (
              <AppError
                title="Couldn't load full details"
                message="We couldn't reach the report service. You can retry or continue with the summary above."
              />
            ) : null}

            {detail ? (
              <>
                <IncidentDetailMeta row={row} detail={detail} />
                <IncidentDetailNarrative detail={detail} />
                <IncidentDetailEvidence detail={detail} />
                <IncidentDetailValidations detail={detail} />
                <IncidentDetailDeepInference detail={detail} />
                <IncidentDetailDevice detail={detail} />
              </>
            ) : null}
          </>
        ) : (
          <AppEmpty
            title="Select a report"
            description="This workspace view is live — choose a staff report to load full incident details."
            compact
          />
        )}

        <IncidentDetailActions
          row={row}
          showCategorize={
            apiReportId
              ? !(detail?.categories && detail.categories.length > 0)
              : row.category === null
          }
        />
      </div>
    </div>
  );
}
