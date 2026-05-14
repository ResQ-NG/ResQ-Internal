"use client";

import { create } from "zustand";

export type WebsocketMessage = Record<string, unknown> & { type?: string };

type SendJsonMessage = ((payload: unknown) => void) | null;

type WebsocketState = {
  subscribedGroups: string[];
  readyState: number;
  lastMessage: WebsocketMessage | null;
  messages: WebsocketMessage[];
  sendJsonMessage: SendJsonMessage;

  subscribeToGroup: (group: string) => void;
  pushMessage: (message: unknown) => void;
  setReadyState: (readyState: number) => void;
  setSendJsonMessage: (sendJsonMessage: SendJsonMessage) => void;
};

function toWebsocketMessage(value: unknown): WebsocketMessage {
  if (value && typeof value === "object") return value as WebsocketMessage;
  return { type: "unknown", value };
}

export const useWebsocketStore = create<WebsocketState>((set, get) => ({
  subscribedGroups: [],
  readyState: 3, // WebSocket.CLOSED
  lastMessage: null,
  messages: [],
  sendJsonMessage: null,

  subscribeToGroup: (group: string) => {
    const trimmed = group.trim();
    if (!trimmed) return;
    const { subscribedGroups, sendJsonMessage } = get();
    if (!subscribedGroups.includes(trimmed)) {
      set({ subscribedGroups: [...subscribedGroups, trimmed] });
    }
    // Best-effort: if connected, send subscribe immediately.
    sendJsonMessage?.({ type: "subscribe", room: trimmed });
  },

  pushMessage: (message: unknown) => {
    const m = toWebsocketMessage(message);
    set((s) => ({
      lastMessage: m,
      messages: [...s.messages, m].slice(-200),
    }));
  },

  setReadyState: (readyState: number) => set({ readyState }),

  setSendJsonMessage: (sendJsonMessage: SendJsonMessage) => set({ sendJsonMessage }),
}));

