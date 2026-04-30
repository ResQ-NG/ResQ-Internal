"use client";

import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { SessionProvider, useSession } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AppAlertToaster } from "@/components/ui/AppAlert";
import { GlobalErrorModalRoot } from "@/components/ui/GlobalErrorModalRoot";
import { AppModalRoot } from "@/components/ui/AppModal";
import { AppSidebarRoot } from "@/components/ui/AppSidebar";
import { clearAuthToken, setAuthToken } from "@/network/http.instance";

function HttpAuthTokenSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      setAuthToken(session.accessToken);
    } else if (status === "unauthenticated") {
      clearAuthToken();
    }
  }, [session?.accessToken, status]);

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
      <QueryClientProvider client={queryClient}>
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

