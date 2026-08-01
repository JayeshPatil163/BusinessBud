/**
 * Universal API Base URL configuration.
 * Configured via VITE_API_BASE_URL in environment files (.env).
 * Defaults to "/api" for local dev proxying.
 */
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";

export const API_BASE_URL = rawBaseUrl.endsWith("/")
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl;

/**
 * Returns a fully-formed API URL for the given endpoint route.
 * E.g., getApiUrl("/auth/login") -> "/api/auth/login" (or "http://localhost:3001/api/auth/login")
 */
export const getApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};
