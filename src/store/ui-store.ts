"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ReactNode } from "react";

type ModalSize = "sm" | "md" | "lg";

interface ModalConfig {
  title?: string;
  size?: ModalSize;
  content?: ReactNode;
}

interface SidebarConfig {
  title?: string;
  content?: ReactNode;
}

interface UIState {
  // modal
  modalOpen: boolean;
  modalConfig: ModalConfig;
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;

  // sidebar
  sidebarOpen: boolean;
  sidebarConfig: SidebarConfig;
  openSidebar: (config: SidebarConfig) => void;
  closeSidebar: () => void;

  // internal dashboard sidebar
  internalSidebarExpanded: boolean;
  setInternalSidebarExpanded: (expanded: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      modalOpen: false,
      modalConfig: {},
      openModal: (config) => set({ modalOpen: true, modalConfig: config }),
      closeModal: () => set({ modalOpen: false, modalConfig: {} }),

      sidebarOpen: false,
      sidebarConfig: {},
      openSidebar: (config) => set({ sidebarOpen: true, sidebarConfig: config }),
      closeSidebar: () => set({ sidebarOpen: false, sidebarConfig: {} }),

      internalSidebarExpanded: false,
      setInternalSidebarExpanded: (expanded) => set({ internalSidebarExpanded: expanded }),
    }),
    {
      name: "resq-ui-store",
      storage: createJSONStorage(() => localStorage),
      // Only persist simple booleans, not ReactNode content
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        internalSidebarExpanded: state.internalSidebarExpanded,
      }),
    }
  )
);

