export function humanizeReportEventType(raw: string | null | undefined): string {
  const s = String(raw ?? "").trim();
  if (!s) return "";
  // If backend already provides a label with spaces, keep it.
  if (s.includes(" ")) return s;
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function humanizeReportStatus(raw: string | null | undefined): string {
  const s = String(raw ?? "").trim();
  if (!s) return "";
  if (s.includes(" ")) return s;
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function normalizeReportCategoryLabel(
  raw: string | null | undefined,
): string | null {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  if (s.toLowerCase() === "uncategorized") return null;
  return s;
}



export function sanitizeColor(input: string | undefined): string | undefined {
    if (!input) return undefined;
    return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(input.trim()) ? input.trim() : undefined;
  }


  export function formatStatus(s: string): string {
    return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
