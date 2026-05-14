"use client";

import type { QueryClient } from "@tanstack/react-query";
import type { WebsocketMessage } from "@/stores/websocket-store";

/**
 * Fan-out to domain-specific realtime handlers.
 *
 * Intentionally minimal: it’s safe to call on every message, and you can extend
 * it by adding switch cases or delegating into per-module handlers.
 */
export function runRealtimeHandlers(_queryClient: QueryClient, _message: WebsocketMessage) {
  // Placeholder: add invalidations / cache updates per message type.
  // Example:
  // if (_message.type === "incident.updated") _queryClient.invalidateQueries({ queryKey: ["incidents"] });
}
