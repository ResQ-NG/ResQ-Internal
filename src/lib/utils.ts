import { type ClassValue, clsx } from "clsx";
import { isAxiosError } from "axios";
import { twMerge } from "tailwind-merge";
import { ApiCustomError } from "@/lib/types";

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
