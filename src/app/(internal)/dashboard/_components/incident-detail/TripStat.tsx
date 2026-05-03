"use client";
export function TripStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-light px-2.5 py-2 dark:bg-surface-dark">
      <p className="text-[10px] text-captionDark dark:text-captionDark-dark">
        {label}
      </p>
      <p className="mt-0.5 text-xs font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
        {value}
      </p>
    </div>
  );
}
