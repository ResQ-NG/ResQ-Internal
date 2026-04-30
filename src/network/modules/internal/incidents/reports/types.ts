import type { ReportEventType } from "./constants";

export interface ReportCategoryDTO {
  ai_confidence_threshold: number;
  created_at: string;
  customization: {
    color: string;
    icon: string;
  };
  default_priority: string;
  default_urgency: string;
  description: string;
  id: number;
  is_active: boolean;
  keywords: string[];
  requires_human_review: boolean;
  slug: string;
  title: string;
  updated_at: string;
}

export interface ReportDeepInferenceResultReasonDTO {
  category: string;
  reason: string;
}

export interface ReportDeepInferenceRoutingRecommendationDTO {
  note: string;
  suggested_category_slugs: string[];
}

export interface ReportDeepInferenceResultDTO {
  confidence_score: number;
  created_at: string;
  id: number;
  inferenced_at: string;
  reasons: ReportDeepInferenceResultReasonDTO[];
  recommended_action: string;
  report_id: number;
  routing_recommendation: ReportDeepInferenceRoutingRecommendationDTO;
  summary: string;
  triggered_by_id: string;
  updated_at: string;
}

export interface ReportDeterministicInferenceDTO {
  category: string;
  level: string;
  observation: string;
}

export interface ReportDeterministicIssueDTO {
  field: string;
  level: string;
  message: string;
}

export interface ReportDeterministicMetadataDTO {
  average_evidence_distance: number;
  device_fingerprint_match: boolean;
  rejected_reports_count: number;
  report_frequency_score: number;
  reporter_history_count: number;
  reporter_join_date: string;
}

export interface ReportDeterministicValidationDTO {
  created_at: string;
  id: number;
  inferences: ReportDeterministicInferenceDTO[];
  is_valid: boolean;
  issues: ReportDeterministicIssueDTO[];
  metadata: ReportDeterministicMetadataDTO;
  requires_llm_review: boolean;
  trust_score: number;
  updated_at: string;
  validated_at: string;
}

export interface ReportDeviceInformationDTO {
  app_build: string;
  app_version: string;
  cellular_type: string;
  device_battery_level: number;
  device_battery_status: string;
  device_id: string;
  device_manufacturer: string;
  device_model: string;
  device_type: string;
  network_type: string;
  os: string;
  os_version: string;
}

export interface ReportEvidenceDTO {
  captured_at: string;
  client_side_tags: string[];
  created_at: string;
  duration_seconds: number;
  evidence_id: string;
  evidence_type: string;
  file_upload_timestamp: string;
  id: number;
  is_uploaded: boolean;
  latitude: number;
  link_requested_at: string;
  longitude: number;
  mime_type: string;
  size_bytes: number;
  source: string;
  updated_at: string;
  user_tags: string[];
}

export interface ReportLocationDTO {
  city: string;
  country: string;
  country_code: string;
  id: number;
  latitude: number;
  longitude: number;
  state: string;
}

export interface ReportProbabilisticReasonDTO {
  category: string;
  reason: string;
}

export interface ReportProbabilisticValidationDTO {
  category_concerns: Record<string, string>;
  confidence_score: number;
  created_at: string;
  final_validity_status: string;
  id: number;
  reasons: ReportProbabilisticReasonDTO[];
  requires_human_review: boolean;
  summary: string;
  updated_at: string;
  validated_at: string;
}

export interface ReportProcessingDTO {
  last_event_at: string;
  stage: ReportEventType | string;
}

export type ReportListCategoryDTO = {
  title: string;
  slug: string;
  icon?: string;
  color?: string;
};

/** Lightweight list item returned by staff report listing endpoint. */
export type ReportListItemDTO = {
  id: number;
  display_date: string;
  title: string;
  status: string;
  category_label?: string;
  categories?: ReportListCategoryDTO[];
  needs_review: boolean;
  stage_label?: string;
  stage: ReportEventType | string;
  location_label?: string;
  uploaded_evidence: number;
};

export interface ReportTextContentDTO {
  created_at: string;
  id: number;
  text: string;
  updated_at: string;
}

export interface ReportQueryParamsDTO {
  limit?: number;
  statuses?: string[];
  cursor?: string;
  category_slugs?: string[];
  reporter_name?: string;
  state?: string;
  city?: string;
  country?: string;
  created_from?: string;
  created_to?: string;
  incident_to?: string;
  incident_from?: string;
  search?: string;
}

export interface ReportSimplifiedDTO {
  categories: ReportCategoryDTO[];
  created_at: string;
  deep_inference_results: ReportDeepInferenceResultDTO[];
  deterministic_validation: ReportDeterministicValidationDTO;
  device_information: ReportDeviceInformationDTO;
  evidence: ReportEvidenceDTO[];
  id: number;
  incident_datetime: string;
  is_anonymous: boolean;
  location: ReportLocationDTO;
  probabilistic_validation: ReportProbabilisticValidationDTO;
  processing: ReportProcessingDTO;
  reporter_id: number;
  status: string;
  summary: string;
  text_contents: ReportTextContentDTO[];
  title: string;
  updated_at: string;
  user_tags: string[];
}
