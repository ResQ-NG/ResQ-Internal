/**
 * Public API origin (no trailing slash). Set in `.env.local` as `NEXT_PUBLIC_API_URL`.
 */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
