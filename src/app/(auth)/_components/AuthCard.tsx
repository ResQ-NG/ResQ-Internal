import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AuthCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  );
}
