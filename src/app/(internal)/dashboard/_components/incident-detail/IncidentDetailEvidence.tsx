"use client";

import {
  Camera,
  FileAudio,
  FileText,
  Image as ImageIcon,
  Paperclip,
  Video,
} from "lucide-react";
import type { ReportDetailDTO } from "@/network/modules/internal/incidents/reports/types";
import { IncidentDetailSection } from "./IncidentDetailSection";
import { EvidenceRow } from "./EvidenceRow";

const EVIDENCE_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  image: ImageIcon,
  photo: ImageIcon,
  video: Video,
  audio: FileAudio,
  voice: FileAudio,
  document: FileText,
  text: FileText,
};

export function evidenceIcon(type: string | undefined) {
  const key = String(type ?? "").toLowerCase();
  return EVIDENCE_ICONS[key] ?? Paperclip;
}

export function IncidentDetailEvidence({
  detail,
}: {
  detail: ReportDetailDTO;
}) {
  const items = detail.evidence ?? [];
  const uploadedCount = items.filter((e) => e.is_uploaded).length;

  return (
    <IncidentDetailSection
      icon={Camera}
      title={`Evidence (${items.length})`}
      trailing={
        items.length > 0 ? (
          <span className="text-[11px] font-metropolis-medium text-captionDark dark:text-captionDark-dark">
            {uploadedCount}/{items.length} uploaded
          </span>
        ) : null
      }
    >
      {items.length === 0 ? (
        <p className="text-xs text-captionDark dark:text-captionDark-dark">
          No evidence has been linked to this report yet.
        </p>
      ) : (
        <ul className="grid gap-2">
          {items.map((evidence) => (
            <EvidenceRow key={evidence.id} evidence={evidence} />
          ))}
        </ul>
      )}
    </IncidentDetailSection>
  );
}
