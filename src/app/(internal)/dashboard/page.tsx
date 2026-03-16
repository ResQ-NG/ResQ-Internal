import { AppHeading, AppParagraph, AppLink } from "@/components/ui";
import { DashboardHeader } from "../_components/DashboardHeader";

export default function DashboardOverviewPage() {
  const dateRange = "Last 6 months: Jan 1, 2025 - Jun 30, 2025";

  return (
    <>
      <DashboardHeader
        title="Project Overview"
        dateRange="Last 6 months: Jan 1, 2025 - Jun 30, 2025"
      />

      <div className="p-6 space-y-8">
        {/* Top row: Active Incidents + Summary */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Active Incidents / Response card */}
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm lg:col-span-3">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <AppHeading as={2} size="sm" className="mb-1 text-primaryDark dark:text-primaryDark-dark">
                  Active Incidents
                </AppHeading>
                <AppLink href="#" variant="primary" className="text-sm">
                  View all incidents →
                </AppLink>
              </div>
              <AppParagraph variant="caption" size="sm">
                {dateRange}
              </AppParagraph>
            </div>
            <p className="text-3xl font-metropolis-bold text-primaryDark dark:text-primaryDark-dark">
              127
            </p>
            <p className="mt-1 text-sm text-success-green dark:text-success-green-dark">
              ▼ 12% vs prior 6 months
            </p>
            {/* Mini trend placeholder – primary blue */}
            <div className="mt-6 h-24 w-full">
              <svg viewBox="0 0 240 60" className="h-full w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="incidentGradient" x1="0" x2="0" y1="1" y2="0">
                    <stop offset="0%" stopColor="#0000FF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0000FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 45 Q 40 48 80 44 T 160 38 T 240 32 L 240 60 L 0 60 Z"
                  fill="url(#incidentGradient)"
                />
                <path
                  d="M 0 45 Q 40 48 80 44 T 160 38 T 240 32"
                  fill="none"
                  stroke="#0000FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="mt-1 flex justify-between text-xs text-captionDark dark:text-captionDark-dark">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>

          {/* Summary card – project metrics */}
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm lg:col-span-2">
            <div className="mb-4 flex justify-between">
              <AppHeading as={2} size="sm" className="text-primaryDark dark:text-primaryDark-dark">
                Summary
              </AppHeading>
              <AppParagraph variant="caption" size="sm">
                {dateRange}
              </AppParagraph>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "42", label: "Active Projects", active: true },
                { value: "18", label: "Resolved This Week", active: false },
                { value: "2.4h", label: "Avg. Response Time", active: false },
                { value: "24", label: "Team Members", active: false },
              ].map(({ value, label, active }) => (
                <div key={label} className="border-b border-captionDark/15 dark:border-captionDark-dark/15 pb-3">
                  <p className="text-xl font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
                    {value}
                  </p>
                  <p
                    className={`mt-0.5 text-sm ${active ? "border-b-2 border-primary-blue dark:border-primary-blue-dark w-fit text-primary-blue dark:text-primary-blue-dark" : "text-captionDark dark:text-captionDark-dark"}`}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Response pipeline / funnel */}
        <section className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
          <div className="mb-6 flex justify-between">
            <AppHeading as={2} size="sm" className="text-primaryDark dark:text-primaryDark-dark">
              Response Pipeline
            </AppHeading>
            <AppParagraph variant="caption" size="sm">
              {dateRange}
            </AppParagraph>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {[
              { main: "312", sub: "Reported (pending triage) 89", pct: "28.5%" },
              { main: "223", sub: "Not yet assigned 34", pct: "15.2%" },
              { main: "189", sub: "In progress 156", pct: "82.5%" },
              { main: "33", sub: "Awaiting closure 12", pct: "36.4%" },
              { main: "21", sub: "Resolved", pct: null },
            ].map(({ main, sub, pct }) => (
              <div key={main}>
                <p className="text-xl font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark">
                  {main}
                </p>
                <p className="mt-1 text-xs text-captionDark dark:text-captionDark-dark">
                  {sub}
                </p>
                {pct && (
                  <p className="mt-0.5 text-xs text-captionDark dark:text-captionDark-dark">
                    {pct}
                  </p>
                )}
              </div>
            ))}
          </div>
          {/* Pipeline stacked bar – ResQ primary blue → accent */}
          <div className="mt-6 flex h-12 w-full overflow-hidden rounded-lg">
            <div className="bg-primary-blue/90" style={{ width: "32%" }} />
            <div className="bg-primary-blue/70" style={{ width: "24%" }} />
            <div className="bg-primary-blue/50" style={{ width: "22%" }} />
            <div className="bg-accent-red/60" style={{ width: "14%" }} />
            <div className="bg-success-green dark:bg-success-green-dark" style={{ width: "8%" }} />
          </div>
        </section>

        {/* Two charts row – project related */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <div className="mb-4 flex justify-between">
              <AppHeading as={2} size="sm" className="text-primaryDark dark:text-primaryDark-dark">
                Incidents by Project
              </AppHeading>
              <AppParagraph variant="caption" size="sm">
                {dateRange}
              </AppParagraph>
            </div>
            <div className="h-64 rounded-lg bg-surface-light/80 dark:bg-primaryDark/10 flex items-center justify-center border border-captionDark/10 dark:border-captionDark-dark/10">
              <p className="text-sm text-captionDark dark:text-captionDark-dark">
                Chart: incidents per project (placeholder)
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-captionDark/20 dark:border-captionDark-dark/20 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <div className="mb-4 flex justify-between">
              <AppHeading as={2} size="sm" className="text-primaryDark dark:text-primaryDark-dark">
                Team Activity
              </AppHeading>
              <AppParagraph variant="caption" size="sm">
                {dateRange}
              </AppParagraph>
            </div>
            <div className="h-64 rounded-lg bg-surface-light/80 dark:bg-primaryDark/10 flex items-center justify-center border border-captionDark/10 dark:border-captionDark-dark/10">
              <p className="text-sm text-captionDark dark:text-captionDark-dark">
                Chart: responses & resolutions (placeholder)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
