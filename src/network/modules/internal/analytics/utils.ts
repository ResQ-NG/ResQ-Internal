export type HeatmapSeverity = {
  bar: string;
  dot: string;
  label: string;
  labelColor: string;
};

export function severityColor(score: number): HeatmapSeverity {
  if (score >= 0.8) {
    return {
      bar: "bg-accent-red dark:bg-accent-red-dark",
      dot: "bg-accent-red dark:bg-accent-red-dark",
      label: "Critical",
      labelColor: "text-accent-red dark:text-accent-red-dark",
    };
  }
  if (score >= 0.6) {
    return {
      bar: "bg-orange-500",
      dot: "bg-orange-500",
      label: "High",
      labelColor: "text-orange-600 dark:text-orange-400",
    };
  }
  if (score >= 0.4) {
    return {
      bar: "bg-amber-500",
      dot: "bg-amber-500",
      label: "Medium",
      labelColor: "text-amber-700 dark:text-amber-300",
    };
  }
  if (score >= 0.2) {
    return {
      bar: "bg-primary-blue dark:bg-primary-blue-dark",
      dot: "bg-primary-blue dark:bg-primary-blue-dark",
      label: "Low",
      labelColor: "text-primary-blue dark:text-primary-blue-dark",
    };
  }
  return {
    bar: "bg-captionDark/40 dark:bg-captionDark-dark/40",
    dot: "bg-captionDark/40 dark:bg-captionDark-dark/40",
    label: "Minimal",
    labelColor: "text-captionDark dark:text-captionDark-dark",
  };
}

