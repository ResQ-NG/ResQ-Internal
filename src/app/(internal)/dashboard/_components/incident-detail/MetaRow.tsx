"use client";
import type { ComponentType } from "react";

export function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 text-xs">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-captionDark dark:text-captionDark-dark" />
      <span className="w-16 shrink-0 text-captionDark dark:text-captionDark-dark">
        {label}
      </span>
      <span className="min-w-0 font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
        {value}
      </span>
    </div>
  );
}
