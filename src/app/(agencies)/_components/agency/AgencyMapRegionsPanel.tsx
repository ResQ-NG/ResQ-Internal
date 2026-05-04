import type { AgencyRegionMetric } from "@/app/(agencies)/_data/agency-dummy-data";
import { AppHeading, AppParagraph } from "@/components/ui";

function MetricBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-captionDark/10 dark:bg-captionDark-dark/20">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary-blue to-emerald-500 dark:from-primary-blue-dark dark:to-emerald-400"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function AgencyMapRegionsPanel({ metrics }: { metrics: AgencyRegionMetric[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
        <AppHeading as={2} size="sm" className="mb-1">
          Open incidents by region
        </AppHeading>
        <AppParagraph variant="caption" className="mb-4 text-xs">
          Demo counts for incidents currently attributed to this agency.
        </AppParagraph>
        <ul className="space-y-3">
          {metrics.map((m) => (
            <li key={m.region} className="flex items-center justify-between gap-3 text-sm">
              <span className="font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                {m.region}
              </span>
              <span className="font-mono text-xs font-metropolis-bold text-primary-blue dark:text-primary-blue-dark">
                {m.openCount}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-captionDark/20 bg-surface-light p-5 shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
        <AppHeading as={2} size="sm" className="mb-1">
          First-response rate by region
        </AppHeading>
        <AppParagraph variant="caption" className="mb-4 text-xs">
          Share of incidents receiving a first touch within SLA (dummy percentages).
        </AppParagraph>
        <ul className="space-y-4">
          {metrics.map((m) => (
            <li key={`${m.region}-resp`}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-metropolis-medium text-primaryDark dark:text-primaryDark-dark">
                  {m.region}
                </span>
                <span className="font-mono font-metropolis-bold text-emerald-700 dark:text-emerald-300">
                  {m.responsePct}%
                </span>
              </div>
              <MetricBar value={m.responsePct} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
