"use client";

import { Toaster, toast } from "sonner";
import { ReactNode } from "react";

type AppAlertVariant = "info" | "success" | "warning" | "error";

interface AppAlertOptions {
  title?: string;
  description?: string;
  variant?: AppAlertVariant;
  action?: ReactNode;
}

const variantToColor: Record<AppAlertVariant, string> = {
  info: "border-primary-blue/40 bg-surface-dark/70 text-primaryDark-dark",
  success: "border-success-green/50 bg-success-green/10 text-success-green",
  warning: "border-amber-400/60 bg-amber-500/10 text-amber-200",
  error: "border-accent-red/60 bg-accent-red/10 text-accent-red",
};

export function AppAlertToaster() {
  return (
    <Toaster
      position="top-center"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "border border-white/10 bg-surface-dark/80 rounded-xl backdrop-blur-xl text-primaryDark-dark shadow-[0_18px_45px_rgba(0,0,0,0.85)]",
          title: "font-metropolis-semibold text-sm",
          description: "text-xs text-captionDark-dark mt-1",
          actionButton:
            "rounded-full bg-primary-blue text-white text-xs px-3 py-1 font-metropolis-medium",
          closeButton:
            "text-captionDark-dark hover:text-primaryDark-dark data-[icon]:h-3 data-[icon]:w-3",
        },
      }}
    />
  );
}

export function showAppAlert(message: string, options?: AppAlertOptions) {
  const variant: AppAlertVariant = options?.variant ?? "info";
  const color = variantToColor[variant];

  toast.custom(
    (t) => (
      <div
        className={[
          "min-w-[260px] max-w-sm rounded-xl border px-4 py-3 text-xs",
          "shadow-[0_18px_45px_rgba(0,0,0,0.85)] backdrop-blur-2xl bg-clip-padding",
          color,
        ].join(" ")}
      >
        {options?.title && (
          <p className="mb-1 text-[11px] font-metropolis-semibold uppercase tracking-[0.16em]">
            {options.title}
          </p>
        )}
        <p className="text-[13px] font-metropolis-medium">{message}</p>
        {options?.description && (
          <p className="mt-1 text-[11px] text-captionDark-dark">{options.description}</p>
        )}
        {options?.action && <div className="mt-2">{options.action}</div>}
      </div>
    ),
    {
      duration: 4000,
      id: options?.title ? `${variant}-${options.title}` : undefined,
    }
  );
}
