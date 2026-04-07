"use client";

import { ReactNode } from "react";
import { AppAlertToaster } from "@/components/ui/AppAlert";
import { GlobalErrorModalRoot } from "@/components/ui/GlobalErrorModalRoot";
import { AppModalRoot } from "@/components/ui/AppModal";
import { AppSidebarRoot } from "@/components/ui/AppSidebar";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <AppModalRoot />
      <GlobalErrorModalRoot />
      <AppSidebarRoot />
      <AppAlertToaster />
    </>
  );
}

