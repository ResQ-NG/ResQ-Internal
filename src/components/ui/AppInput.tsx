"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  leftIcon?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  containerClassName?: string;
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ leftIcon, rightAdornment, className, containerClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border border-captionDark/15 bg-surface-light/70 px-3 py-2 text-captionDark shadow-sm",
          "focus-within:border-primary-blue/40 focus-within:ring-2 focus-within:ring-primary-blue/15",
          "dark:border-captionDark-dark/20 dark:bg-primaryDark/10 dark:text-captionDark-dark",
          "dark:focus-within:border-primary-blue-dark/35 dark:focus-within:ring-primary-blue-dark/10",
          containerClassName
        )}
      >
        {leftIcon ? (
          <span className="shrink-0 opacity-80" aria-hidden>
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          className={cn(
            "w-full bg-transparent text-sm text-primaryDark placeholder:text-captionDark/60 focus:outline-none",
            "dark:text-primaryDark-dark dark:placeholder:text-captionDark-dark/50",
            className
          )}
          {...props}
        />
        {rightAdornment ? <div className="shrink-0">{rightAdornment}</div> : null}
      </div>
    );
  }
);

AppInput.displayName = "AppInput";

