"use client";

import { MessageSquare, Tag as TagIcon } from "lucide-react";
import type { ReportDetailDTO } from "@/network/modules/internal/incidents/reports/types";
import { IncidentDetailSection } from "./IncidentDetailSection";

export function IncidentDetailNarrative({
  detail,
}: {
  detail: ReportDetailDTO;
}) {
  const texts = (detail.text_contents ?? []).filter((t) => t.text?.trim());
  const tags = (detail.user_tags ?? []).filter(Boolean);

  if (texts.length === 0 && tags.length === 0) return null;

  return (
    <IncidentDetailSection icon={MessageSquare} title="Reporter narrative">
      {texts.length > 0 ? (
        <ul className="space-y-1.5">
          {texts.map((entry) => (
            <li
              key={entry.id}
              className="rounded-md bg-captionDark/5 px-2.5 py-2 text-[12px] leading-relaxed text-primaryDark dark:bg-captionDark-dark/10 dark:text-primaryDark-dark"
            >
              {entry.text}
            </li>
          ))}
        </ul>
      ) : null}

      {tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-1">
          {tags.map((tag) => (
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
    </IncidentDetailSection>
  );
}
