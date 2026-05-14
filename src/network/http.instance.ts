// Auth: NextAuth session tokens are synced in AppProviders; requests use `Authorization: Bearer <token>`.
// On 401, a single-flight refresh uses `POST /v1/auth/refresh-token` then retries the request once.
import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_URL } from "@/config/environment-config";
import { ApiCustomError } from "@/lib/dto/http";
import { AuthRoutes } from "@/network/modules/shared/auth/routes";
import { useGlobalErrorStore } from "@/store/reusables/global-error-store";

let authToken: string | undefined = undefined;
let clientRefreshToken: string | undefined = undefined;

type SessionAfterRefresh = (accessToken: string, refreshToken: string) => Promise<void>;
let onSessionAfterRefresh: SessionAfterRefresh | null = null;

let refreshInFlight: Promise<boolean> | null = null;

// Create axios instance with default configuration
const http: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

function authorizationHeader(token: string) {
  return `Bearer ${token}`;
}

export const setAuthToken = (token: string) => {
  authToken = token;
  http.defaults.headers.common["Authorization"] = authorizationHeader(token);
};

export const clearAuthToken = () => {
  authToken = undefined;
  delete http.defaults.headers.common["Authorization"];
};

export const setRefreshToken = (token: string) => {
  clientRefreshToken = token;
};

export const clearRefreshToken = () => {
  clientRefreshToken = undefined;
};

export const clearClientAuth = () => {
  clearAuthToken();
  clearRefreshToken();
};

/** Called from AppProviders so 401 refresh can persist tokens into the NextAuth JWT via `update()`. */
export const setOnSessionAfterRefresh = (handler: SessionAfterRefresh | null) => {
  onSessionAfterRefresh = handler;
};

type RefreshTokenResponse = {
  token?: string;
  refresh_token?: string;
};

async function fetchRefreshedTokens(): Promise<{ accessToken: string; refreshToken: string } | null> {
  const rt = clientRefreshToken;
  if (!rt || !API_URL) return null;
  try {
    const res = await fetch(`${API_URL}${AuthRoutes.RefreshToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: rt }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: RefreshTokenResponse };
    const data = json.data;
    if (!data?.token) return null;
    return {
      accessToken: data.token,
      refreshToken: typeof data.refresh_token === "string" && data.refresh_token ? data.refresh_token : rt,
    };
  } catch {
    return null;
  }
}

function tryRefreshAccessToken(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      const tokens = await fetchRefreshedTokens();
      if (!tokens) return false;
      setAuthToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      try {
        await onSessionAfterRefresh?.(tokens.accessToken, tokens.refreshToken);
      } catch {
        // Axios is updated; session cookie sync is best-effort.
      }
      return true;
    })().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

// Helper to wait for a valid token
const waitForToken = async (): Promise<string> => {
  let waited = 0;
  const maxWait = 5000; // 5 seconds max
  const interval = 50;
  while (typeof authToken !== "string" || !authToken || authToken === "undefined") {
    await new Promise((resolve) => setTimeout(resolve, interval));
    waited += interval;
    if (waited >= maxWait) break;
  }
  return authToken || "";
};

// Request interceptor
http.interceptors.request.use(
  async (config) => {
    // Set token as undefined first if not set
    if (typeof authToken === "undefined") {
      authToken = undefined;
    }

    // Wait for a valid token if it's undefined or invalid
    if (!authToken || authToken === "undefined") {
      // Wait for token to be set
      await waitForToken();
    }

    // Set Authorization header if token is valid (JWT / OAuth-style Bearer)
    if (authToken && authToken !== "undefined") {
      config.headers.Authorization = authorizationHeader(authToken);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function handleGlobalErrorStatus(status: number | undefined, data: Record<string, unknown> | undefined) {
  if (status === 401) {
    clearClientAuth();
    if (typeof window !== "undefined") {
      const { openError } = useGlobalErrorStore.getState();
      openError("401", "Your session has expired. Please sign in again.");
    }
  } else if (status === 403) {
    if (typeof window !== "undefined") {
      const { openError } = useGlobalErrorStore.getState();
      const serverMsg = typeof data?.message === "string" && data.message.trim() ? data.message.trim() : null;
      openError(
        "403",
        serverMsg ??
          "You don’t have permission for this action. If you need access, ask an administrator to update your role.",
      );
    }
  } else if (status === 500) {
    if (typeof window !== "undefined") {
      const { openError } = useGlobalErrorStore.getState();
      openError("500", "Something went wrong on our end. Please try again later.");
    }
  } else if (status === undefined) {
    if (typeof window !== "undefined") {
      const { openError } = useGlobalErrorStore.getState();
      openError("network", "Please check your internet connection and try again.");
    }
  }
}

// Response interceptor with enhanced error handling
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data as Record<string, unknown> | undefined;
    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshed = await tryRefreshAccessToken();
      if (refreshed && authToken) {
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = authorizationHeader(authToken);
        return http(originalRequest);
      }
    }

    handleGlobalErrorStatus(status, data);

    const rejected = new ApiCustomError(
      (typeof data?.message === "string" && data.message) ||
        error.message ||
        "An error occurred",
      status ?? 0,
      data
    );

    return Promise.reject(rejected);
  }
);

export default http;
