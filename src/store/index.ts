"use client";

import {
  useGlobalMessageStore,
  type GeneralMessagePayload,
  type GeneralMessageState,
} from "./global-message-store";

export type { GeneralMessagePayload, GeneralMessageState };
export { useGlobalMessageStore };

/** Alias used by `src/network` hooks. Prefer `useGlobalMessageStore` in new code. */
export const useStore = useGlobalMessageStore;
