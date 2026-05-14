import type { WebsocketMessage } from "@/stores/websocket-store";

function asString(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v : null;
}

function asNumber(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

/**
 * Creates a stable key for "did we already handle this message?"
 * Prefers commonly-used message identifiers; falls back to a bounded stringify.
 */
export function messageKey(msg: WebsocketMessage): string {
  const type = asString(msg.type) ?? "unknown";
  const id =
    asString((msg as any).id) ??
    asString((msg as any).message_id) ??
    asString((msg as any).event_id) ??
    asString((msg as any).uuid);
  const ts = asNumber((msg as any).ts) ?? asNumber((msg as any).timestamp);

  if (id) return `${type}:${id}`;
  if (ts != null) return `${type}:${ts}`;

  // Fallback: stable-ish short hash from JSON.
  try {
    const raw = JSON.stringify(msg);
    // djb2
    let hash = 5381;
    for (let i = 0; i < raw.length; i++) hash = (hash * 33) ^ raw.charCodeAt(i);
    return `${type}:h${(hash >>> 0).toString(16)}`;
  } catch {
    return `${type}:unstringifiable`;
  }
}

