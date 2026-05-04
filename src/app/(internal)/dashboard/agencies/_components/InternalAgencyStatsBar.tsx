import { cn } from "@/lib/utils/generics";

export type InternalAgencyStatItem = {
  key: string;
  label: string;
  value: string;
  hint: string;
};

/**
 * Matches the command-center stats strip (`CommandCenterStatsPanel` layout="bar")
 * so internal agencies feels consistent with the main dashboard.
 */
export function InternalAgencyStatsBar({
  items,
  className,
}: {
  items: readonly InternalAgencyStatItem[];
  className?: string;
}) {
  const statBlocks = items.map((meta) => (
    <div
      key={meta.key}
      className="rounded-lg border border-captionDark/10 bg-surface-light/80 px-2.5 py-2 dark:border-captionDark-dark/15 dark:bg-surface-dark/40 md:px-3"
    >
      <p className="text-[10px] font-medium uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
        {meta.label}
      </p>
      <p className="mt-0.5 truncate font-metropolis-semibold text-lg leading-tight text-primaryDark dark:text-primaryDark-dark">
        {meta.value}
      </p>
      <p className="mt-0.5 truncate text-[10px] text-captionDark dark:text-captionDark-dark">{meta.hint}</p>
    </div>
  ));

  return (
    <div className={cn("flex justify-center px-0 pb-1 pt-0", className)}>
      <div className="grid w-full max-w-none grid-cols-2 gap-2 rounded-xl border border-captionDark/15 bg-surface-light/95 p-2.5 shadow-md backdrop-blur-md dark:border-captionDark-dark/20 dark:bg-primaryDark/85 md:grid-cols-4 md:gap-3 md:p-3">
        {statBlocks}
      </div>
    </div>
  );
}
