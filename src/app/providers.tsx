"use client";

import { ReactNode } from "react";
import { AppModalRoot } from "@/components/ui/AppModal";
import { AppSidebarRoot } from "@/components/ui/AppSidebar";
import { AppAlertToaster } from "@/components/ui/AppAlert";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <AppModalRoot />
      <AppSidebarRoot />
      <AppAlertToaster />
    </>
  );
}

