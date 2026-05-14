"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AppAlertToaster } from "@/components/ui/AppAlert";
import { GlobalErrorModalRoot } from "@/components/ui/GlobalErrorModalRoot";
import { AppModalRoot } from "@/components/ui/AppModal";
import { AppSidebarRoot } from "@/components/ui/AppSidebar";
import { HttpAuthTokenSync, HttpSessionAfterRefreshSync } from "./HttpAuthSessionSync";
import { WebsocketEventHandler } from "@/network/websocket/WebsocketEventHandler";

/** Signs out when the wall-clock session window ends (shorter when “Remember me” is off). */
function SessionExpirySync() {
  const { data: session, status } = useSession();

  const checkAndSignOut = useCallback(() => {
    if (status !== "authenticated" || !session?.sessionAbsoluteExpires) return;
    const end = new Date(session.sessionAbsoluteExpires).getTime();
    if (Number.isNaN(end) || Date.now() < end) return;
    void signOut({ callbackUrl: "/authourize" });
  }, [session?.sessionAbsoluteExpires, status]);

  useEffect(() => {
    checkAndSignOut();
  }, [checkAndSignOut]);

  useEffect(() => {
    if (status !== "authenticated" || !session?.sessionAbsoluteExpires) return;
    const end = new Date(session.sessionAbsoluteExpires).getTime();
    if (Number.isNaN(end)) return;
    const ms = end - Date.now();
    if (ms <= 0) {
      void signOut({ callbackUrl: "/authourize" });
      return;
    }
    const capped = Math.min(ms, 2147483647);
    const id = window.setTimeout(() => {
      void signOut({ callbackUrl: "/authourize" });
    }, capped);
    return () => window.clearTimeout(id);
  }, [session?.sessionAbsoluteExpires, status]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") checkAndSignOut();
    };
    window.addEventListener("focus", checkAndSignOut);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("focus", checkAndSignOut);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [checkAndSignOut]);

  return null;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <SessionProvider>
      <HttpAuthTokenSync />
      <HttpSessionAfterRefreshSync />
      <SessionExpirySync />
      <QueryClientProvider client={queryClient}>
        <WebsocketEventHandler />
        <NuqsAdapter>
          {children}
          <AppModalRoot />
          <GlobalErrorModalRoot />
          <AppSidebarRoot />
          <AppAlertToaster />
        </NuqsAdapter>
        {process.env.NODE_ENV === "development" ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
      </QueryClientProvider>
    </SessionProvider>
  );
}

