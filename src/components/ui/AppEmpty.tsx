"use client";

import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppHeading } from "./AppHeading";
import { AppParagraph } from "./AppParagraph";

export function AppEmpty({
  title,
  description,
  icon: Icon = Inbox,
  action,
  compact = false,
  className,
}: {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 text-center",
        compact ? "py-6" : "py-10",
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-captionDark/10 text-captionDark dark:bg-captionDark-dark/15 dark:text-captionDark-dark">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <AppHeading as={3} size="sm" className="text-primaryDark dark:text-primaryDark-dark">
        {title}
      </AppHeading>
      {description ? (
        <AppParagraph variant="caption" size="sm" className="max-w-md">
          {description}
        </AppParagraph>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

