"use client";
import {
  CheckCircle2,
  Clock3,
  HelpCircle,
  MapPin,
  Tag as TagIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/generics";
import type { ReportEvidenceDTO } from "@/network/modules/internal/incidents/reports/types";
import {
  formatBytes,
  formatDuration,
  formatLatLng,
  formatShortDateTime,
} from "./incident-detail.helpers";
import { evidenceIcon } from "./IncidentDetailEvidence";

export function EvidenceRow({ evidence }: { evidence: ReportEvidenceDTO }) {
  const Icon = evidenceIcon(evidence.evidence_type);
  const tags = [
    ...(evidence.user_tags ?? []),
    ...(evidence.client_side_tags ?? []),
  ].filter(Boolean);

  return (
    <li className="rounded-lg border border-captionDark/10 bg-surface-light px-3 py-2.5 dark:border-captionDark-dark/15 dark:bg-surface-dark">
      <div className="flex items-start gap-2.5">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            evidence.is_uploaded
              ? "bg-success-green/10 text-success-green dark:bg-success-green-dark/15 dark:text-success-green-dark"
              : "bg-captionDark/10 text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-metropolis-semibold capitalize text-primaryDark dark:text-primaryDark-dark">
              {evidence.evidence_type || "evidence"}
            </span>
            <span className="text-[11px] text-captionDark dark:text-captionDark-dark">
              {evidence.mime_type}
            </span>
            {evidence.is_uploaded ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-success-green/12 px-1.5 py-0.5 text-[10px] font-metropolis-medium text-success-green dark:bg-success-green-dark/15 dark:text-success-green-dark">
                <CheckCircle2 className="h-3 w-3" />
                uploaded
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/12 px-1.5 py-0.5 text-[10px] font-metropolis-medium text-amber-800 dark:text-amber-200">
                <HelpCircle className="h-3 w-3" />
                pending
              </span>
            )}
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-captionDark dark:text-captionDark-dark">
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3 w-3" />
              {formatShortDateTime(evidence.captured_at)}
            </span>
            {evidence.duration_seconds ? (
              <span>· {formatDuration(evidence.duration_seconds)}</span>
            ) : null}
            <span>· {formatBytes(evidence.size_bytes)}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {formatLatLng(evidence.latitude, evidence.longitude)}
            </span>
            {evidence.source ? (
              <span className="capitalize">· {evidence.source}</span>
            ) : null}
          </div>

          {tags.length > 0 ? (
            <div className="mt-1.5 flex flex-wrap items-center gap-1">
              {tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-captionDark/10 px-1.5 py-0.5 text-[10px] text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark"
                >
                  <TagIcon className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}
