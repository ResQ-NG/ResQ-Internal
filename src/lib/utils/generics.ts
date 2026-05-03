import { type ClassValue, clsx } from "clsx";
import { isAxiosError } from "axios";
import { twMerge } from "tailwind-merge";
import { ApiCustomError } from "@/lib/dto/http";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Human-readable message for API / network failures (React Query, forms, etc.). */
export function apiError(error: unknown): string {
  if (error instanceof ApiCustomError) {
    return error.message;
  }
  if (isAxiosError(error)) {
    const data = error.response?.data as Record<string, unknown> | undefined;
    const msg = data?.message ?? data?.error;
    if (typeof msg === "string") return msg;
    if (Array.isArray(msg)) return msg.filter(Boolean).join(", ");
    return error.message || "Request failed";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}

/** Short relative label for list cards (no extra deps). */
export function formatRelativeShort(iso: string): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const diffMs = Date.now() - t;
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}
