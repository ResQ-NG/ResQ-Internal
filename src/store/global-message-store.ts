"use client";

import { create } from "zustand";

export type GeneralMessageState = "success" | "failed";

export interface GeneralMessagePayload {
  message: string;
  state: GeneralMessageState;
}

interface GlobalMessageStore {
  generalMessage: GeneralMessagePayload | null;
  setGeneralMessage: (payload: GeneralMessagePayload) => void;
  clearGeneralMessage: () => void;
}

export const useGlobalMessageStore = create<GlobalMessageStore>((set) => ({
  generalMessage: null,
  setGeneralMessage: (payload) => set({ generalMessage: payload }),
  clearGeneralMessage: () => set({ generalMessage: null }),
}));
