import type { AgencyCaseRow } from "@/app/(agencies)/_data/agency-dummy-data";
import { AppHeading, AppParagraph } from "@/components/ui";
import Link from "next/link";
import { AgencyCaseStatusBadge } from "./AgencyCaseStatusBadge";

export function AgencyCasesTable({ cases }: { cases: AgencyCaseRow[] }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <AppHeading as={2} size="sm" className="mb-4">
        Case list
      </AppHeading>
      <div className="min-h-0 flex-1 overflow-x-auto rounded-xl border border-captionDark/15 dark:border-captionDark-dark/20">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-captionDark/15 bg-surface-light/95 dark:border-captionDark-dark/20 dark:bg-primaryDark/40">
              <th className="px-4 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                Reference
              </th>
              <th className="px-4 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                Title
              </th>
              <th className="px-4 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                Region
              </th>
              <th className="px-4 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                Status
              </th>
              <th className="px-4 py-3 text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                Lead
              </th>
              <th className="px-4 py-3 text-right text-[10px] font-metropolis-bold uppercase tracking-wide text-captionDark dark:text-captionDark-dark">
                Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {cases.map((row) => (
              <tr
                key={row.id}
                className="border-b border-captionDark/10 transition-colors hover:bg-primary-blue/[0.04] dark:border-captionDark-dark/10 dark:hover:bg-primary-blue-dark/10"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/agencies/cases/${row.id}`}
                    className="font-mono text-xs font-metropolis-semibold text-primary-blue hover:underline dark:text-primary-blue-dark"
                  >
                    {row.reference}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/agencies/cases/${row.id}`}
                    className="font-metropolis-medium text-primaryDark hover:text-primary-blue dark:text-primaryDark-dark dark:hover:text-primary-blue-dark"
                  >
                    {row.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-captionDark dark:text-captionDark-dark">{row.region}</td>
                <td className="px-4 py-3">
                  <AgencyCaseStatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3 text-captionDark dark:text-captionDark-dark">{row.lead}</td>
                <td className="px-4 py-3 text-right text-xs text-captionDark dark:text-captionDark-dark">
                  {row.updatedLabel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AppParagraph variant="caption" className="mt-2 text-xs">
        Demo data only — first two rows include a richer detail layout.
      </AppParagraph>
    </div>
  );
}
