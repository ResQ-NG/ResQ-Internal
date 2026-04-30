"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { AppAlertToaster } from "@/components/ui/AppAlert";
import { GlobalErrorModalRoot } from "@/components/ui/GlobalErrorModalRoot";
import { AppModalRoot } from "@/components/ui/AppModal";
import { AppSidebarRoot } from "@/components/ui/AppSidebar";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <AppModalRoot />
      <GlobalErrorModalRoot />
      <AppSidebarRoot />
      <AppAlertToaster />
    </SessionProvider>
  );
}

