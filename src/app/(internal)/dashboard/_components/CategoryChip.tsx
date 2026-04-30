"use client";
import { type IncidentCategoryBadge } from "./sampleCommandData";
import { sanitizeColor } from "@/network/modules/internal/incidents/reports/utils";

export function CategoryChip({ badge }: { badge: IncidentCategoryBadge }) {
  const color = sanitizeColor(badge.color);
  if (!color) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-captionDark/10 px-1.5 py-0.5 text-[10px] text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark">
        {badge.icon ? <span aria-hidden>{badge.icon}</span> : null}
        <span className="font-metropolis-medium">{badge.title}</span>
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-metropolis-medium"
      style={{
        backgroundColor: `${color}1F`,
        color,
        boxShadow: `inset 0 0 0 1px ${color}33`,
      }}
    >
      {badge.icon ? <span aria-hidden>{badge.icon}</span> : null}
      <span>{badge.title}</span>
    </span>
  );
}
