import type {
  IncidentCategoryBadge,
  SampleInboxRow,
  SampleProcess,
} from "../_components/sampleCommandData";
import { formatRelativeShort } from "@/lib/format-relative-short";
import type { ReportListItemDTO } from "@/network/modules/internal/incidents/reports/types";
import { REPORT_EVENT_TYPES, type ReportEventType } from "@/network/modules/internal/incidents/reports/constants";
import {
  humanizeReportEventType,
  normalizeReportCategoryLabel,
} from "@/network/modules/internal/incidents/reports/utils";

/** Map raw event-stage string to the visual `process` chip. */
function mapStageToProcess(stageRaw: string): SampleProcess {
  const stage = (stageRaw || "").trim() as ReportEventType;

  switch (stage) {
    case REPORT_EVENT_TYPES.report_created:
      return "pending triage";
    case REPORT_EVENT_TYPES.sent_to_ai_auto_processing:
    case REPORT_EVENT_TYPES.title_and_summary_updated:
    case REPORT_EVENT_TYPES.evidence_upload_completed:
    case REPORT_EVENT_TYPES.light_categorization_completed:
    case REPORT_EVENT_TYPES.deterministic_validation_completed:
    case REPORT_EVENT_TYPES.probabilistic_validation_completed:
    case REPORT_EVENT_TYPES.evidence_inference:
    case REPORT_EVENT_TYPES.evidence_analysis_completed:
    case REPORT_EVENT_TYPES.report_inference_triggered:
    case REPORT_EVENT_TYPES.deep_inference_completed:
      return "routing";
  }

  const s = (stageRaw || "").toLowerCase();
  if (s.includes("triage") || s.includes("untriaged") || s.includes("pending_triage"))
    return "pending triage";
  if (s.includes("assign")) return "assigned";
  if (s.includes("progress")) return "in progress";
  if (s.includes("resolv") || s.includes("closed")) return "resolved";
  return "routing";
}

export function reportSimplifiedToSampleInboxRow(r: ReportListItemDTO): SampleInboxRow {
  const title = r.title?.trim();
  const stageRaw = r.stage ?? "";

  const categoryBadges: IncidentCategoryBadge[] | undefined = (r.categories ?? []).map((c) => ({
    title: c.title?.trim() || c.slug,
    slug: c.slug,
    icon: c.icon,
    color: c.color,
  }));

  const fallbackCategory = normalizeReportCategoryLabel(r.category_label);

  return {
    id: `api-report-${r.id}`,
    kind: "report",
    summary: title || `Report #${r.id}`,
    created: formatRelativeShort(r.display_date),
    evidenceUploadedCount: r.uploaded_evidence ?? 0,
    category: categoryBadges?.[0]?.title ?? fallbackCategory,
    categoryBadges: categoryBadges && categoryBadges.length > 0 ? categoryBadges : undefined,
    requiresHumanReview: Boolean(r.needs_review),
    statusLabel: r.status,
    stageRaw,
    stageLabel: r.stage_label?.trim() || humanizeReportEventType(stageRaw),
    process: mapStageToProcess(stageRaw),
    locationLabel: r.location_label?.trim() || undefined,
  };
}
