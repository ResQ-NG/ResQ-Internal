import type { AgencyBroadcast } from "@/app/(agencies)/_data/agency-dummy-data";
import { AppButton, AppHeading, AppParagraph } from "@/components/ui";
import { cn } from "@/lib/utils/generics";

function BroadcastCard({ b }: { b: AgencyBroadcast }) {
  return (
    <li
      className={cn(
        "rounded-xl border px-3 py-2.5",
        b.status === "live" && "border-emerald-500/35 bg-emerald-500/8 dark:border-emerald-400/30 dark:bg-emerald-500/10",
        b.status === "scheduled" && "border-primary-blue/25 bg-primary-blue/[0.04] dark:border-primary-blue-dark/25",
        b.status === "ended" && "border-captionDark/12 bg-surface-light/90 dark:border-captionDark-dark/15 dark:bg-primaryDark/20"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">{b.title}</p>
          <AppParagraph variant="caption" className="mt-1 text-[11px]">
            {b.audience}
          </AppParagraph>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-[9px] font-metropolis-bold uppercase tracking-wide",
            b.status === "live" && "bg-emerald-500/20 text-emerald-900 dark:text-emerald-100",
            b.status === "scheduled" && "bg-primary-blue/15 text-primary-blue dark:text-primary-blue-dark",
            b.status === "ended" && "bg-captionDark/10 text-captionDark dark:text-captionDark-dark"
          )}
        >
          {b.status}
        </span>
      </div>
      <p className="mt-2 text-[10px] font-metropolis-semibold text-captionDark dark:text-captionDark-dark">
        {b.startedLabel}
      </p>
    </li>
  );
}

export function AgencyBroadcastsView({
  active,
  history,
}: {
  active: AgencyBroadcast[];
  history: AgencyBroadcast[];
}) {
  return (
    <section className="flex flex-col gap-6 lg:flex-row">
      <div className="min-h-0 flex-1 rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <AppHeading as={2} size="sm">
            Active broadcasts
          </AppHeading>
          <AppButton size="sm" variant="primary" type="button" disabled title="Demo only">
            New broadcast
          </AppButton>
        </div>
        <ul className="space-y-2">
          {active.map((b) => (
            <BroadcastCard key={b.id} b={b} />
          ))}
        </ul>
      </div>
      <div className="w-full max-w-md shrink-0 rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
        <AppHeading as={2} size="sm" className="mb-4">
          Broadcast history
        </AppHeading>
        <ul className="space-y-2">
          {history.map((b) => (
            <BroadcastCard key={b.id} b={b} />
          ))}
        </ul>
      </div>
    </section>
  );
}
