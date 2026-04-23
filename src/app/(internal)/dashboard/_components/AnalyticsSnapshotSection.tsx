import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingDown, TrendingUp, UserCheck, UserPlus, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { SAMPLE_ANALYTICS } from "./sampleCommandData";

type Metric = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  delta: string;
  up: boolean;
  accentColor: string;
};

function MetricCell({ icon: Icon, label, value, delta, up, accentColor, divider }: Metric & { divider: boolean }) {
  return (
    <div className={cn(
      "flex min-w-0 flex-1 flex-col justify-between gap-4 px-6 py-5",
      divider && "border-r border-captionDark/10 dark:border-captionDark-dark/15",
    )}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg", accentColor)}>
            <Icon className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-xs font-metropolis-semibold uppercase tracking-wider text-captionDark dark:text-captionDark-dark">
            {label}
          </span>
        </div>
        <span className={cn(
          "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-metropolis-semibold",
          up
            ? "bg-success-green/10 text-success-green dark:bg-success-green-dark/15 dark:text-success-green-dark"
            : "bg-accent-red/10 text-accent-red dark:bg-accent-red-dark/15 dark:text-accent-red-dark",
        )}>
          {up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
          {delta}
        </span>
      </div>
      <p className="text-3xl font-metropolis-bold tabular-nums text-primaryDark dark:text-primaryDark-dark">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  );
}

export function AnalyticsSnapshotSection() {
  const a = SAMPLE_ANALYTICS;

  const metrics: Metric[] = [
    {
      icon: Users,
      label: "Active Users",
      value: a.activeUsers,
      delta: a.activeUsersDelta,
      up: a.activeUsersUp,
      accentColor: "bg-primary-blue dark:bg-primary-blue-dark",
    },
    {
      icon: UserCheck,
      label: "Active Agents",
      value: a.activeAgents,
      delta: a.activeAgentsDelta,
      up: a.activeAgentsUp,
      accentColor: "bg-success-green dark:bg-success-green-dark",
    },
    {
      icon: UserPlus,
      label: "New Signups",
      value: a.newSignups,
      delta: a.newSignupsDelta,
      up: a.newSignupsUp,
      accentColor: "bg-violet-600 dark:bg-violet-500",
    },
    {
      icon: CheckCircle2,
      label: "Resolved This Week",
      value: a.resolvedThisWeek,
      delta: a.resolvedThisWeekDelta,
      up: a.resolvedThisWeekUp,
      accentColor: "bg-teal-600 dark:bg-teal-500",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-captionDark/15 bg-surface-light shadow-sm dark:border-captionDark-dark/20 dark:bg-surface-dark">
      <div className="flex flex-wrap divide-y divide-captionDark/10 dark:divide-captionDark-dark/15 md:flex-nowrap md:divide-x md:divide-y-0">
        {metrics.map((m, i) => (
          <MetricCell key={m.label} {...m} divider={false} />
        ))}

        {/* CTA column */}
        <div className="flex shrink-0 flex-col items-center justify-center gap-3 border-t border-captionDark/10 px-6 py-5 dark:border-captionDark-dark/15 md:border-l md:border-t-0">
          <p className="text-xs font-metropolis-semibold text-captionDark dark:text-captionDark-dark">
            Full analytics
          </p>
          <Link
            href="/dashboard/platform"
            className="flex items-center gap-1.5 rounded-lg bg-primary-blue px-3.5 py-2 text-xs font-metropolis-semibold text-white shadow-sm transition-opacity hover:opacity-90 dark:bg-primary-blue-dark"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
