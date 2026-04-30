"use client";

import { AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export type AppErrorVariant = "error" | "warning" | "info";

const VARIANT_STYLES: Record<
  AppErrorVariant,
  { border: string; bg: string; text: string; icon: React.ComponentType<{ className?: string }> }
> = {
  error: {
    border: "border-accent-red/25 dark:border-accent-red-dark/25",
    bg: "bg-accent-red/5 dark:bg-accent-red-dark/10",
    text: "text-accent-red dark:text-accent-red-dark",
    icon: ShieldAlert,
  },
  warning: {
    border: "border-amber-500/25",
    bg: "bg-amber-500/10 dark:bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-300",
    icon: AlertTriangle,
  },
  info: {
    border: "border-primary-blue/20 dark:border-primary-blue-dark/25",
    bg: "bg-primary-blue/[0.06] dark:bg-primary-blue-dark/10",
    text: "text-primary-blue dark:text-primary-blue-dark",
    icon: Info,
  },
};

export function AppError({
  title,
  message,
  variant = "error",
  compact = false,
  shake = variant === "error",
  className,
  role = "alert",
}: {
  title?: string;
  message: string;
  variant?: AppErrorVariant;
  compact?: boolean;
  /** Shake on mount (defaults on for `error`) */
  shake?: boolean;
  className?: string;
  role?: "alert" | "status";
}) {
  const styles = VARIANT_STYLES[variant];
  const Icon = styles.icon;

  return (
    <div
      role={role}
      className={cn(
        "w-full rounded-xl border px-4 py-3",
        shake && "animate-resq-shake",
        styles.border,
        styles.bg,
        className
      )}
    >
      <div className={cn("flex items-start gap-2.5", compact && "items-center")}>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
            compact ? "bg-white/10" : "bg-white/10"
          )}
          aria-hidden
        >
          <Icon className={cn("h-4 w-4", styles.text)} />
        </span>
        <div className="min-w-0">
          {title ? (
            <p className={cn("text-xs font-metropolis-semibold", styles.text)}>
              {title}
            </p>
          ) : null}
          <p
            className={cn(
              "text-xs leading-snug",
              title ? "mt-0.5" : "",
              compact ? styles.text : "text-captionDark dark:text-captionDark-dark"
            )}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

