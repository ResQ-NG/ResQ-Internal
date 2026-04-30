export const REPORT_EVENT_TYPES = {
  report_created: "report_created",
  sent_to_ai_auto_processing: "sent_to_ai_auto_processing",
  title_and_summary_updated: "title_and_summary_updated",
  evidence_upload_completed: "evidence_upload_completed",
  light_categorization_completed: "light_categorization_completed",
  deterministic_validation_completed: "deterministic_validation_completed",
  probabilistic_validation_completed: "probabilistic_validation_completed",
  evidence_inference: "evidence_inference",
  evidence_analysis_completed: "evidence_analysis_completed",
  report_inference_triggered: "report_inference_triggered",
  deep_inference_completed: "deep_inference_completed",
} as const;

export type ReportEventType = (typeof REPORT_EVENT_TYPES)[keyof typeof REPORT_EVENT_TYPES];

