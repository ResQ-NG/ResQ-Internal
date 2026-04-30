// Auth: NextAuth session `accessToken` is synced in AppProviders; requests use `Authorization: Bearer <token>`.
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { API_URL } from "@/config/environment-config";
import { ApiCustomError } from "@/lib/types";
import { useGlobalErrorStore } from "@/store/reusables/global-error-store";

let authToken: string | undefined = undefined;

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

// Response interceptor with enhanced error handling
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data as Record<string, unknown>;

    // Handle global errors that should show modal
    if (status === 401) {
      clearAuthToken();
      // Trigger global error modal for 401
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
      // Trigger global error modal for 500
      if (typeof window !== "undefined") {
        const { openError } = useGlobalErrorStore.getState();
        openError("500", "Something went wrong on our end. Please try again later.");
      }
    } else if (!error.response) {
      // Network error
      if (typeof window !== "undefined") {
        const { openError } = useGlobalErrorStore.getState();
        openError("network", "Please check your internet connection and try again.");
      }
    }

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
