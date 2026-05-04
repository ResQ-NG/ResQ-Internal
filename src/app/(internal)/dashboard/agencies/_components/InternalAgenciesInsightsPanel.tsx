import { BarChart3, Building2, Layers } from "lucide-react";
import type {
  InternalAgencyRegionTicketRow,
  InternalAgencyRow,
  InternalAgencyStatus,
  InternalAgencyStatusCount,
} from "../_data/internal-agencies-dummy";
import { AppParagraph } from "@/components/ui";
import { InternalAgencyStatusBadge } from "./InternalAgencyStatusBadge";

function RegionColumn({ rows }: { rows: InternalAgencyRegionTicketRow[] }) {
  const top = rows.slice(0, 6);
  const maxT = Math.max(1, ...top.map((r) => r.openTickets));

  return (
    <div className="flex min-h-0 min-w-0 flex-col p-5 md:p-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-captionDark/10 text-primaryDark dark:bg-captionDark-dark/20 dark:text-primaryDark-dark">
          <Building2 className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
            Open tickets by region
          </p>
          <AppParagraph variant="caption" className="text-[11px] leading-snug">
            Grouped from the first jurisdiction token (demo).
          </AppParagraph>
        </div>
      </div>
      <ul className="min-h-0 flex-1 space-y-2.5 overflow-y-auto pr-1 [scrollbar-width:thin]">
        {top.map((r) => (
          <li key={r.label}>
            <div className="mb-1 flex items-center justify-between gap-2 text-[11px]">
              <span className="min-w-0 truncate font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                {r.label}
              </span>
              <span className="shrink-0 font-mono text-[10px] text-captionDark dark:text-captionDark-dark">
                {r.agencyCount} ag ·{" "}
                <span className="text-emerald-600 dark:text-emerald-300">{r.openTickets} tkts</span>
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-captionDark/10 dark:bg-captionDark-dark/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primaryDark/35 to-emerald-500/80 dark:from-primaryDark-dark/40 dark:to-emerald-400/75"
                style={{ width: `${(r.openTickets / maxT) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const STATUS_ORDER: InternalAgencyStatus[] = ["active", "pilot", "suspended"];

function StatusColumn({ counts }: { counts: InternalAgencyStatusCount[] }) {
  const maxC = Math.max(1, ...counts.map((c) => c.count));

  return (
    <div className="flex min-h-0 min-w-0 flex-col border-t border-captionDark/10 p-5 md:border-l md:border-t-0 md:p-6 dark:border-captionDark-dark/15">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-captionDark/10 text-primaryDark dark:bg-captionDark-dark/20 dark:text-primaryDark-dark">
          <Layers className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
            Status mix
          </p>
          <AppParagraph variant="caption" className="text-[11px] leading-snug">
            Agencies in each rollout state.
          </AppParagraph>
        </div>
      </div>
      <ul className="space-y-2.5">
        {STATUS_ORDER.map((status) => {
          const row = counts.find((c) => c.status === status);
          const count = row?.count ?? 0;
          return (
            <li key={status}>
              <div className="mb-1 flex items-center justify-between gap-2">
                <InternalAgencyStatusBadge status={status} />
                <span className="font-mono text-[11px] font-semibold text-primaryDark dark:text-primaryDark-dark">
                  {count}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-captionDark/10 dark:bg-captionDark-dark/20">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primaryDark/35 to-emerald-500/80 dark:from-primaryDark-dark/40 dark:to-emerald-400/75"
                  style={{ width: `${(count / maxC) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TopLoadColumn({ rows }: { rows: InternalAgencyRow[] }) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col border-t border-captionDark/10 p-5 md:border-l md:border-t-0 md:p-6 dark:border-captionDark-dark/15">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-captionDark/10 text-primaryDark dark:bg-captionDark-dark/20 dark:text-primaryDark-dark">
          <BarChart3 className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
            Highest ticket load
          </p>
          <AppParagraph variant="caption" className="text-[11px] leading-snug">
            Top agencies by open tickets (demo).
          </AppParagraph>
        </div>
      </div>
      <ul className="max-h-52 space-y-1.5 overflow-y-auto pr-1 [scrollbar-width:thin]">
        {rows.map((a) => (
          <li
            key={a.id}
            className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-xs"
          >
            <span className="min-w-0 truncate font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
              <span className="font-mono text-[10px] text-captionDark dark:text-captionDark-dark">
                {a.code}
              </span>{" "}
              {a.name}
            </span>
            <span className="shrink-0 font-mono text-[10px] text-captionDark dark:text-captionDark-dark">
              {a.openTickets}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InternalAgenciesInsightsPanel({
  regionTickets,
  statusCounts,
  topTicketAgencies,
}: {
  regionTickets: InternalAgencyRegionTicketRow[];
  statusCounts: InternalAgencyStatusCount[];
  topTicketAgencies: InternalAgencyRow[];
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-captionDark/15 bg-surface-light shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
      <div className="grid md:grid-cols-3">
        <RegionColumn rows={regionTickets} />
        <StatusColumn counts={statusCounts} />
        <TopLoadColumn rows={topTicketAgencies} />
      </div>
    </section>
  );
}
