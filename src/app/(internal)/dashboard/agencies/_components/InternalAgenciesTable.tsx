import type { InternalAgencyRow } from "../_data/internal-agencies-dummy";
import { InternalAgencyStatusBadge } from "./InternalAgencyStatusBadge";
import { cn } from "@/lib/utils/generics";

function AgencyLogoPlaceholder({ row }: { row: InternalAgencyRow }) {
  return (
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-captionDark/15 bg-gradient-to-br from-primary-blue/18 to-primary-blue/5 text-[11px] font-metropolis-bold text-primary-blue shadow-sm",
        "dark:border-captionDark-dark/25 dark:from-primary-blue-dark/25 dark:to-primary-blue-dark/5 dark:text-primary-blue-dark"
      )}
      title={`${row.name} — logo placeholder`}
      aria-label={`${row.name} logo placeholder`}
    >
      {row.logoInitials}
    </div>
  );
}

export function InternalAgenciesTable({ rows }: { rows: InternalAgencyRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-captionDark/15 dark:border-captionDark-dark/20">
      <table className="w-full min-w-[800px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-captionDark/15 bg-surface-light/95 dark:border-captionDark-dark/20 dark:bg-primaryDark/40">
            <th className="w-16 px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              <span className="sr-only">Logo</span>
            </th>
            <th className="px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              Code
            </th>
            <th className="px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              Agency
            </th>
            <th className="px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              Jurisdiction
            </th>
            <th className="px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              Branches
            </th>
            <th className="px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              Open tickets
            </th>
            <th className="px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              Lead contact
            </th>
            <th className="px-3 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              Status
            </th>
            <th className="px-3 py-3 text-right text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
              Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.id}
              className="border-b border-captionDark/10 transition-colors hover:bg-captionDark/[0.05] dark:border-captionDark-dark/10 dark:hover:bg-captionDark-dark/[0.07]"
            >
              <td className="px-3 py-2.5 align-middle">
                <AgencyLogoPlaceholder row={r} />
              </td>
              <td className="px-3 py-3 align-middle">
                <span className="font-mono text-xs text-primary-blue dark:text-primary-blue-dark">
                  {r.code}
                </span>
              </td>
              <td className="px-3 py-3 font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
                {r.name}
              </td>
              <td className="max-w-[200px] px-3 py-3 text-captionDark dark:text-captionDark-dark">
                {r.jurisdiction}
              </td>
              <td className="px-3 py-3 font-mono text-xs text-primaryDark dark:text-primaryDark-dark">
                {r.branches}
              </td>
              <td className="px-3 py-3 font-mono text-xs text-primaryDark dark:text-primaryDark-dark">
                {r.openTickets}
              </td>
              <td className="px-3 py-3 text-xs text-captionDark dark:text-captionDark-dark">{r.leadContact}</td>
              <td className="px-3 py-3">
                <InternalAgencyStatusBadge status={r.status} />
              </td>
              <td className="px-3 py-3 text-right text-xs text-captionDark dark:text-captionDark-dark">
                {r.updatedLabel}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
