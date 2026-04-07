import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "success" | "surface" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Use for Next.js links styled as buttons */
  asChild?: boolean;
  /** Shows a spinner and disables the control (ignored when `asChild` is true). */
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<NonNullable<AppButtonProps["variant"]>, string> = {
  primary:
    "bg-primary-blue text-white hover:bg-primary-blue-dark dark:bg-primary-blue-dark dark:hover:opacity-90",
  accent:
    "bg-accent-red text-white hover:opacity-90 dark:bg-accent-red-dark dark:hover:opacity-90",
  success:
    "bg-success-green text-white hover:opacity-90 dark:bg-success-green-dark dark:hover:opacity-90",
  surface:
    "bg-surface-light text-primaryDark hover:bg-gray-200 dark:bg-surface-dark dark:text-primaryDark-dark dark:hover:bg-gray-800",
  outline:
    "border-2 border-primary-blue text-primary-blue bg-transparent hover:bg-primary-blue hover:text-white dark:border-primary-blue-dark dark:text-primary-blue-dark",
  ghost:
    "text-primaryDark hover:bg-surface-light dark:text-primaryDark-dark dark:hover:bg-surface-dark",
};

const sizeClasses: Record<NonNullable<AppButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
  md: "px-4 py-2 text-base rounded-lg gap-2",
  lg: "px-6 py-3 text-lg rounded-lg gap-2",
};

const spinnerSize: Record<NonNullable<AppButtonProps["size"]>, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-[1.125rem]",
};

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      asChild = false,
      loading = false,
      className,
      children,
      disabled,
      ...rest
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-metropolis-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    if (asChild) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn(
            base,
            variantClasses[variant],
            sizeClasses[size],
            className
          )}
          {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
        >
          {children}
        </span>
      );
    }

    const isDisabled = Boolean(disabled || loading);

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          base,
          variantClasses[variant],
          sizeClasses[size],
          loading && "cursor-wait",
          className
        )}
        {...rest}
      >
        {loading ? (
          <>
            <Loader2
              className={cn(spinnerSize[size], "shrink-0 animate-spin")}
              aria-hidden
            />
            <span className="min-w-0">{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

AppButton.displayName = "AppButton";
