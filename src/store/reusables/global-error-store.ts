"use client";

import { create } from "zustand";

export type GlobalErrorCode = "401" | "403" | "500" | "network";

interface GlobalErrorState {
  isOpen: boolean;
  code: GlobalErrorCode | string | null;
  message: string | null;
  openError: (code: GlobalErrorCode | string, message: string) => void;
  closeError: () => void;
}

export const useGlobalErrorStore = create<GlobalErrorState>((set) => ({
  isOpen: false,
  code: null,
  message: null,
  openError: (code, message) =>
    set({ isOpen: true, code, message }),
  closeError: () =>
    set({ isOpen: false, code: null, message: null }),
}));
