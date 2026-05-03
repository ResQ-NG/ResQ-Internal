"use client";

import { Brain, ShieldCheck, ShieldX } from "lucide-react";
import { cn } from "@/lib/utils/generics";
import type {
  ReportDeterministicValidationDTO,
  ReportDetailDTO,
  ReportProbabilisticValidationDTO,
} from "@/network/modules/internal/incidents/reports/types";
import {
  IncidentDetailKeyVal,
  IncidentDetailScoreChip,
  IncidentDetailSection,
} from "./IncidentDetailSection";
import { formatPercent, scoreToTone } from "./incident-detail.helpers";

export function IncidentDetailValidations({
  detail,
}: {
  detail: ReportDetailDTO;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <DeterministicCard validation={detail.deterministic_validation} />
      <ProbabilisticCard validation={detail.probabilistic_validation} />
    </div>
  );
}

function DeterministicCard({
  validation,
}: {
  validation: ReportDeterministicValidationDTO | null | undefined;
}) {
  if (!validation) {
    return (
      <IncidentDetailSection
        icon={ShieldCheck}
        title="Deterministic validation"
      >
        <p className="text-xs text-captionDark dark:text-captionDark-dark">
          Not run yet.
        </p>
      </IncidentDetailSection>
    );
  }

  const tone = scoreToTone(validation.trust_score);

  return (
    <IncidentDetailSection
      icon={validation.is_valid ? ShieldCheck : ShieldX}
      title="Deterministic validation"
      trailing={
        <IncidentDetailScoreChip
          label="trust"
          score={formatPercent(validation.trust_score)}
          toneClass={tone}
        />
      }
    >
      <div className="grid grid-cols-2 gap-3">
        <IncidentDetailKeyVal
          label="Verdict"
          value={
            <span
              className={cn(
                "font-metropolis-semibold",
                validation.is_valid
                  ? "text-success-green dark:text-success-green-dark"
                  : "text-accent-red dark:text-accent-red-dark"
              )}
            >
              {validation.is_valid ? "Valid" : "Invalid"}
            </span>
          }
        />
        <IncidentDetailKeyVal
          label="LLM review"
          value={validation.requires_llm_review ? "Required" : "Not required"}
        />
        <IncidentDetailKeyVal
          label="Reporter history"
          value={`${validation.metadata?.reporter_history_count ?? 0} prior reports`}
        />
        <IncidentDetailKeyVal
          label="Rejected reports"
          value={validation.metadata?.rejected_reports_count ?? 0}
        />
        <IncidentDetailKeyVal
          label="Frequency score"
          value={formatPercent(validation.metadata?.report_frequency_score, 1)}
        />
        <IncidentDetailKeyVal
          label="Device fingerprint"
          value={
            validation.metadata?.device_fingerprint_match ? "Match" : "No match"
          }
        />
      </div>

      {validation.issues?.length ? (
        <div className="mt-3 space-y-1.5">
          <p className="text-[10px] font-metropolis-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
            Issues
          </p>
          <ul className="space-y-1">
            {validation.issues.map((issue, idx) => (
              <li
                key={`${issue.field}-${idx}`}
                className="rounded-md border border-amber-500/25 bg-amber-500/[0.06] px-2 py-1.5 text-[11px] text-amber-900 dark:text-amber-100"
              >
                <span className="font-metropolis-semibold capitalize">
                  {issue.field}:
                </span>{" "}
                {issue.message}
                {issue.level ? (
                  <span className="ml-1 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                    {issue.level}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {validation.inferences?.length ? (
        <div className="mt-3 space-y-1.5">
          <p className="text-[10px] font-metropolis-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
            Inferences
          </p>
          <ul className="space-y-1">
            {validation.inferences.map((inf, idx) => (
              <li
                key={`${inf.category}-${idx}`}
                className="rounded-md bg-captionDark/5 px-2 py-1.5 text-[11px] text-captionDark dark:bg-captionDark-dark/10 dark:text-captionDark-dark"
              >
                <span className="font-metropolis-semibold capitalize text-primaryDark dark:text-primaryDark-dark">
                  {inf.category}
                </span>{" "}
                · {inf.observation}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </IncidentDetailSection>
  );
}

function ProbabilisticCard({
  validation,
}: {
  validation: ReportProbabilisticValidationDTO | null | undefined;
}) {
  if (!validation) {
    return (
      <IncidentDetailSection icon={Brain} title="Probabilistic validation">
        <p className="text-xs text-captionDark dark:text-captionDark-dark">
          Not run yet.
        </p>
      </IncidentDetailSection>
    );
  }

  const tone = scoreToTone(validation.confidence_score);
  const concerns = Object.entries(validation.category_concerns ?? {});

  return (
    <IncidentDetailSection
      icon={Brain}
      title="Probabilistic validation"
      trailing={
        <IncidentDetailScoreChip
          label="conf"
          score={formatPercent(validation.confidence_score)}
          toneClass={tone}
        />
      }
    >
      <div className="grid grid-cols-2 gap-3">
        <IncidentDetailKeyVal
          label="Final status"
          value={
            <span className="capitalize">
              {validation.final_validity_status?.replace(/_/g, " ") || "—"}
            </span>
          }
        />
        <IncidentDetailKeyVal
          label="Human review"
          value={validation.requires_human_review ? "Required" : "Not required"}
        />
      </div>

      {validation.summary ? (
        <p className="mt-3 rounded-md bg-captionDark/5 px-2.5 py-2 text-[11px] leading-relaxed text-captionDark dark:bg-captionDark-dark/10 dark:text-captionDark-dark">
          {validation.summary}
        </p>
      ) : null}

      {validation.reasons?.length ? (
        <div className="mt-3 space-y-1.5">
          <p className="text-[10px] font-metropolis-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
            Reasons
          </p>
          <ul className="space-y-1">
            {validation.reasons.map((reason, idx) => (
              <li
                key={`${reason.category}-${idx}`}
                className="rounded-md border border-captionDark/15 bg-surface-light px-2 py-1.5 text-[11px] text-primaryDark dark:border-captionDark-dark/20 dark:bg-surface-dark dark:text-primaryDark-dark"
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

      {concerns.length > 0 ? (
        <div className="mt-3 space-y-1.5">
          <p className="text-[10px] font-metropolis-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
            Category concerns
          </p>
          <ul className="space-y-1">
            {concerns.map(([cat, note]) => (
              <li
                key={cat}
                className="rounded-md bg-amber-500/[0.07] px-2 py-1.5 text-[11px] text-amber-900 dark:text-amber-100"
              >
                <span className="font-metropolis-semibold capitalize">
                  {cat}:
                </span>{" "}
                {note}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </IncidentDetailSection>
  );
}
