"use client";

import { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import useWebSocket from "react-use-websocket";
import { API_URL } from "@/config/environment-config";
import { logger } from "@/lib/logger";
import { useWebsocketStore } from "@/stores/websocket-store";

type UseCustomWebSocketOptions = {
  /** Defaults to `${API_URL}/ws` transformed into `ws(s)://.../ws` */
  baseUrl?: string;
  /** Overrides auth token from NextAuth session */
  token?: string | null | undefined;
};

function toWebSocketBaseUrl(httpBaseUrl: string): string {
  const trimmed = httpBaseUrl.trim().replace(/\/+$/, '');
  const wsScheme = trimmed.startsWith('https://')
    ? 'wss://'
    : trimmed.startsWith('http://')
      ? 'ws://'
      : '';
  const withoutScheme = trimmed.replace(/^https?:\/\//, '');
  const base = wsScheme ? `${wsScheme}${withoutScheme}` : trimmed;
  return `${base}/ws`;
}

const DEFAULT_WS_BASE_URL = API_URL
  ? toWebSocketBaseUrl(API_URL)
  : 'ws://localhost:8080/ws';

const useCustomWebSocket = (options: UseCustomWebSocketOptions = {}) => {
  const { data: session, status } = useSession();
  const tokenFromSession = (session as unknown as { accessToken?: string } | null)?.accessToken;
  const token = options.token ?? tokenFromSession ?? null;
  const isAuthed = status === "authenticated" && token != null && token !== "";

  const subscribedGroups = useWebsocketStore((s) => s.subscribedGroups);
  const pushMessage = useWebsocketStore((s) => s.pushMessage);
  const setReadyState = useWebsocketStore((s) => s.setReadyState);
  const subscribeToGroupInStore = useWebsocketStore((s) => s.subscribeToGroup);
  const setSendJsonMessage = useWebsocketStore((s) => s.setSendJsonMessage);

  const socketUrl = useMemo(() => {
    const baseUrl = options.baseUrl ?? DEFAULT_WS_BASE_URL;
    if (!token) return baseUrl;
    const sep = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${sep}token=${encodeURIComponent(token)}`;
  }, [options.baseUrl, token]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    isAuthed ? socketUrl : null,
    {
      onOpen: () => {
        logger.info("WebSocket connection established");
        for (const g of subscribedGroups) {
          sendJsonMessage({ type: "subscribe", room: g });
        }
      },
      onClose: () => logger.info("WebSocket connection closed"),
      onError: (error) => {
        logger.error("WebSocket error", error);
      },
      shouldReconnect: () => true,
    },
    isAuthed
  );

  useEffect(() => {
    if (!isAuthed) {
      setSendJsonMessage(null);
      return;
    }
    setSendJsonMessage(() => sendJsonMessage);
    return () => setSendJsonMessage(null);
  }, [isAuthed, sendJsonMessage, setSendJsonMessage]);

  useEffect(() => {
    setReadyState(readyState);
  }, [readyState, setReadyState]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    pushMessage(lastJsonMessage);
  }, [lastJsonMessage, pushMessage]);

  return {
    sendMessage: (message: string) => sendJsonMessage({ type: "message", content: message }),
    subscribeToGroup: (group: string) => subscribeToGroupInStore(group),
    lastMessage: lastJsonMessage,
    readyState,
  };
};

export default useCustomWebSocket;
