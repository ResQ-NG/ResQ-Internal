"use client";

import NextLink from "next/link";
import { cn } from "@/lib/utils";

export interface AppLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "default" | "primary" | "accent" | "muted";
  underline?: boolean;
  /** Use Next.js Link for internal routes; set false for external URLs */
  internal?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<NonNullable<AppLinkProps["variant"]>, string> = {
  default:
    "text-primaryDark dark:text-primaryDark-dark hover:opacity-80",
  primary:
    "text-primary-blue dark:text-primary-blue-dark hover:opacity-90 font-medium",
  accent:
    "text-accent-red dark:text-accent-red-dark hover:opacity-90 font-medium",
  muted:
    "text-captionDark dark:text-captionDark-dark hover:text-primaryDark dark:hover:text-primaryDark-dark",
};

export function AppLink({
  href,
  variant = "default",
  underline = false,
  internal = true,
  className,
  children,
  ...rest
}: AppLinkProps) {
  const base = cn(
    "transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 rounded",
    variantClasses[variant],
    underline && "underline underline-offset-2"
  );

  if (internal && !href.startsWith("http") && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
    return (
      <NextLink href={href} className={cn(base, className)} {...rest}>
        {children}
      </NextLink>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(base, className)}
      {...rest}
    >
      {children}
    </a>
  );
}
