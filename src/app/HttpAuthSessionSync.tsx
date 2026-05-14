"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  clearClientAuth,
  setAuthToken,
  setOnSessionAfterRefresh,
  setRefreshToken,
} from "@/network/http.instance";

export function HttpAuthTokenSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      setAuthToken(session.accessToken);
      if (session.refreshToken) setRefreshToken(session.refreshToken);
    } else if (status === "unauthenticated") {
      clearClientAuth();
    }
  }, [session?.accessToken, session?.refreshToken, status]);

  return null;
}

/** Lets the axios 401 refresh path persist new tokens into the NextAuth JWT via `update()`. */
export function HttpSessionAfterRefreshSync() {
  const { update } = useSession();

  useEffect(() => {
    setOnSessionAfterRefresh(async (accessToken, refreshToken) => {
      await update({ accessToken, refreshToken });
    });
    return () => setOnSessionAfterRefresh(null);
  }, [update]);

  return null;
}
