import type { ReportLocationDTO } from "@/network/modules/internal/incidents/reports/types";

const DATE_FMT = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const SHORT_DATE_FMT = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "—";
  return DATE_FMT.format(t);
}

export function formatShortDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "—";
  return SHORT_DATE_FMT.format(t);
}

export function formatBytes(bytes: number | null | undefined): string {
  if (!bytes || bytes <= 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  const decimals = n >= 100 || i === 0 ? 0 : 1;
  return `${n.toFixed(decimals)} ${units[i]}`;
}

export function formatDuration(seconds: number | null | undefined): string {
  if (!seconds || seconds <= 0) return "—";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m < 60) return s ? `${m}m ${s}s` : `${m}m`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return rm ? `${h}h ${rm}m` : `${h}h`;
}

export function formatPercent(score: number | null | undefined, fractionDigits = 0): string {
  if (score === null || score === undefined || Number.isNaN(score)) return "—";
  const pct = score <= 1 ? score * 100 : score;
  return `${pct.toFixed(fractionDigits)}%`;
}

export function formatLatLng(lat: number | null | undefined, lng: number | null | undefined): string {
  if (lat === null || lat === undefined || lng === null || lng === undefined) return "—";
  if (Number.isNaN(lat) || Number.isNaN(lng)) return "—";
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

export function formatLocation(loc: ReportLocationDTO | null | undefined): string {
  if (!loc) return "—";
  const parts = [loc.city, loc.state, loc.country].map((p) => (p || "").trim()).filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "—";
}

/** Score severity → tailwind text/bg pair (used by trust / confidence chips). */
export function scoreToTone(score: number | null | undefined): {
  text: string;
  bg: string;
  border: string;
} {
  const pct = !score ? 0 : score <= 1 ? score * 100 : score;
  if (pct >= 80) {
    return {
      text: "text-success-green dark:text-success-green-dark",
      bg: "bg-success-green/10 dark:bg-success-green-dark/15",
      border: "border-success-green/25 dark:border-success-green-dark/30",
    };
  }
  if (pct >= 50) {
    return {
      text: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-500/10",
      border: "border-amber-500/25",
    };
  }
  return {
    text: "text-accent-red dark:text-accent-red-dark",
    bg: "bg-accent-red/10 dark:bg-accent-red-dark/15",
    border: "border-accent-red/25 dark:border-accent-red-dark/30",
  };
}
