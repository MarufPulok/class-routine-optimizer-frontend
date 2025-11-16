import authService from "@/lib/services/auth.service";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./authOptions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: string) => void;
  reject: (error?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token || undefined);
    }
  });
  failedQueue = [];
};

async function getAccessToken() {
  if (typeof window === "undefined") {
    const session = await getServerSession(authOptions);
    return session?.tokens?.access;
  }

  const session = await getSession();
  return session?.tokens?.access;
}

async function getRefreshToken() {
  if (typeof window === "undefined") {
    const session = await getServerSession(authOptions);
    return session?.tokens?.refresh;
  }

  const session = await getSession();
  return session?.tokens?.refresh;
}

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const httpClientWithoutToken = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

httpClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Don't retry refresh endpoint if it fails
    if (originalRequest?.url?.includes("/token/refresh/")) {
      return Promise.reject(error);
    }

    // Only handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            return httpClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const newTokens = await authService.refreshToken(refreshToken);

        // Note: The JWT callback in authOptions.ts will automatically handle
        // token refresh and updates on the next getSession() call.
        // We just use the new access token for this retry.
        processQueue(null, newTokens.access);

        if (originalRequest.headers) {
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${newTokens.access}`;
        }

        isRefreshing = false;
        return httpClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Clear session and redirect to login (client-side only)
        if (typeof window !== "undefined") {
          const { signOut } = await import("next-auth/react");
          await signOut({ callbackUrl: "/login" });
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
