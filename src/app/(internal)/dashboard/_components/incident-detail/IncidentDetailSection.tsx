"use client";

import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils/generics";

export function IncidentDetailSection({
  icon: Icon,
  title,
  trailing,
  children,
  className,
}: {
  icon?: ComponentType<{ className?: string }>;
  title: string;
  trailing?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-captionDark/15 bg-surface-light/60 p-3.5 dark:border-captionDark-dark/20 dark:bg-surface-dark/60",
        className,
      )}
    >
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {Icon ? (
            <Icon className="h-3.5 w-3.5 text-captionDark dark:text-captionDark-dark" />
          ) : null}
          <h4 className="text-[11px] font-metropolis-semibold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
            {title}
          </h4>
        </div>
        {trailing ? <div className="shrink-0">{trailing}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function IncidentDetailKeyVal({
  label,
  value,
  mono,
}: {
  label: string;
  value: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-metropolis-medium uppercase tracking-wide text-captionDark/80 dark:text-captionDark-dark/80">
        {label}
      </span>
      <span
        className={cn(
          "text-xs text-primaryDark dark:text-primaryDark-dark",
          mono ? "font-mono" : "font-metropolis-medium",
        )}
      >
        {value ?? "—"}
      </span>
    </div>
  );
}

export function IncidentDetailScoreChip({
  label,
  score,
  toneClass,
}: {
  label: string;
  score: string;
  toneClass: { text: string; bg: string; border: string };
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-metropolis-semibold",
        toneClass.bg,
        toneClass.border,
        toneClass.text,
      )}
    >
      <span className="opacity-80">{label}</span>
      <span>{score}</span>
    </span>
  );
}
