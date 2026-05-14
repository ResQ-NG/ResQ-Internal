"use client";

import type { WebsocketMessage } from "@/stores/websocket-store";

/**
 * Side-effects that shouldn't require cache access (toasts, modals, logs).
 * Keep this lightweight and deterministic.
 */
export function runCoreSideEffects(_message: WebsocketMessage) {
  // Placeholder: add global UI side-effects per message type.
}

