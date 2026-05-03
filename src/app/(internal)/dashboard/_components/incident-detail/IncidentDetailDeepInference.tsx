"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import type {
  ReportDeepInferenceResultDTO,
  ReportDetailDTO,
} from "@/network/modules/internal/incidents/reports/types";
import {
  IncidentDetailKeyVal,
  IncidentDetailScoreChip,
  IncidentDetailSection,
} from "./IncidentDetailSection";
import {
  formatDateTime,
  formatPercent,
  scoreToTone,
} from "./incident-detail.helpers";

export function IncidentDetailDeepInference({
  detail,
}: {
  detail: ReportDetailDTO;
}) {
  const results = detail.deep_inference_results ?? [];
  if (results.length === 0) return null;

  const latest = pickLatest(results);
  const tone = scoreToTone(latest.confidence_score);

  return (
    <IncidentDetailSection
      icon={Sparkles}
      title="Deep inference"
      trailing={
        <IncidentDetailScoreChip
          label="conf"
          score={formatPercent(latest.confidence_score)}
          toneClass={tone}
        />
      }
    >
      <div className="grid grid-cols-2 gap-3">
        <IncidentDetailKeyVal
          label="Inferenced at"
          value={formatDateTime(latest.inferenced_at)}
        />
        <IncidentDetailKeyVal
          label="Recommended action"
          value={
            <span className="capitalize">
              {latest.recommended_action?.replace(/_/g, " ") || "—"}
            </span>
          }
        />
      </div>

      {latest.summary ? (
        <p className="mt-3 rounded-md bg-primary-blue/[0.05] px-2.5 py-2 text-[11px] leading-relaxed text-primaryDark dark:bg-primary-blue-dark/[0.10] dark:text-primaryDark-dark">
          {latest.summary}
        </p>
      ) : null}

      {latest.routing_recommendation ? (
        <div className="mt-3 rounded-md border border-primary-blue/20 bg-primary-blue/[0.05] px-2.5 py-2 text-[11px] dark:border-primary-blue-dark/25 dark:bg-primary-blue-dark/[0.08]">
          <p className="font-metropolis-semibold text-primary-blue dark:text-primary-blue-dark">
            Routing recommendation
          </p>
          {latest.routing_recommendation.note ? (
            <p className="mt-1 text-captionDark dark:text-captionDark-dark">
              {latest.routing_recommendation.note}
            </p>
          ) : null}
          {latest.routing_recommendation.suggested_category_slugs?.length ? (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {latest.routing_recommendation.suggested_category_slugs.map((slug) => (
                <span
                  key={slug}
                  className="inline-flex items-center gap-1 rounded-full bg-primary-blue/10 px-1.5 py-0.5 text-[10px] font-metropolis-medium text-primary-blue dark:bg-primary-blue-dark/15 dark:text-primary-blue-dark"
                >
                  <ArrowRight className="h-2.5 w-2.5" />
                  {slug}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {latest.reasons?.length ? (
        <div className="mt-3 space-y-1.5">
          <p className="text-[10px] font-metropolis-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
            Reasoning
          </p>
          <ul className="space-y-1">
            {latest.reasons.map((reason, idx) => (
              <li
                key={`${reason.category}-${idx}`}
                className="rounded-md bg-captionDark/5 px-2 py-1.5 text-[11px] text-primaryDark dark:bg-captionDark-dark/10 dark:text-primaryDark-dark"
              >
                <span className="font-metropolis-semibold capitalize text-primary-blue dark:text-primary-blue-dark">
                  {reason.category}
                </span>{" "}
                <span className="text-captionDark dark:text-captionDark-dark">
                  · {reason.reason}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </IncidentDetailSection>
  );
}

function pickLatest(
  results: ReportDeepInferenceResultDTO[],
): ReportDeepInferenceResultDTO {
  return [...results].sort((a, b) => {
    const ta = new Date(a.inferenced_at || a.created_at || 0).getTime();
    const tb = new Date(b.inferenced_at || b.created_at || 0).getTime();
    return tb - ta;
  })[0];
}
