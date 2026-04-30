"use client";

import { useMemo } from "react";
import { CheckCircle2, UserCheck, UserPlus, Users } from "lucide-react";
import { useBasicUserAnalytics } from "@/network/modules/internal/analytics/queries";

export type AnalyticsSnapshotMetric = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  /** When false, hides the delta / trend chip */
  showTrend?: boolean;
  delta: string;
  up: boolean;
  accentColor: string;
};

export function useAnalyticsSnapshotSection() {
  const { data, isLoading, isError } = useBasicUserAnalytics();

  const metrics = useMemo<AnalyticsSnapshotMetric[]>(() => {
    const newWeek = data?.new_users_this_week;
    const pct = newWeek?.percentage ?? 0;
    const newUsersUp = pct >= 0;
    const newUsersDelta =
      newWeek != null
        ? `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}% vs last week`
        : "—";

    return [
      {
        icon: Users,
        label: "Total users",
        value: isError ? "—" : (data?.total_users ?? 0),
        showTrend: false,
        delta: "",
        up: true,
        accentColor: "bg-primary-blue dark:bg-primary-blue-dark",
      },
      {
        icon: UserCheck,
        label: "Active agents",
        value: isError ? "—" : (data?.active_agents ?? 0),
        showTrend: false,
        delta: "",
        up: true,
        accentColor: "bg-success-green dark:bg-success-green-dark",
      },
      {
        icon: UserPlus,
        label: "New this week",
        value: isError ? "—" : (data?.new_users_this_week?.number ?? 0),
        delta: newUsersDelta,
        up: newUsersUp,
        accentColor: "bg-violet-600 dark:bg-violet-500",
      },
      {
        icon: CheckCircle2,
        label: "Resolved reports",
        value: isError ? "—" : (data?.resolved_reports ?? 0),
        showTrend: false,
        delta: "",
        up: true,
        accentColor: "bg-teal-600 dark:bg-teal-500",
      },
    ];
  }, [data, isError]);

  const loading = isLoading && !data && !isError;

  return { metrics, loading, isError };
}

