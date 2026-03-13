import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

// ---------------------------------------------------------------------------
// 1. Create Axios Instance
// ---------------------------------------------------------------------------
// Base URL is read from the NEXT_PUBLIC_API_URL environment variable.
// In development this will typically be http://localhost:4000.
// In production it will point to the deployed backend (e.g. Render).
// ---------------------------------------------------------------------------

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------------------------------------
// 2. JWT Request Interceptor
// ---------------------------------------------------------------------------
// Before every outgoing request, check if a JWT token exists in
// localStorage.  If it does, attach it as a Bearer token in the
// Authorization header.  If localStorage is unavailable (e.g. during
// server-side rendering) the interceptor is a safe no-op.
// ---------------------------------------------------------------------------

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Guard against SSR — localStorage only exists in the browser.
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------------------------------------------------------
// 3. Retry Logic (exponential back-off)
// ---------------------------------------------------------------------------
// Temporary server failures (502 / 503 / 504) are retried up to 2 times
// with exponential back-off:
//   attempt 1 → 500 ms delay
//   attempt 2 → 1000 ms delay
// After all retries are exhausted the error propagates normally.
// ---------------------------------------------------------------------------

const MAX_RETRIES = 2;
const RETRYABLE_STATUS_CODES = [502, 503, 504];

/**
 * Returns a promise that resolves after `ms` milliseconds.
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculates the exponential back-off delay for a given retry attempt.
 * attempt 1 → 500 ms, attempt 2 → 1000 ms, etc.
 */
function getBackoffDelay(attempt: number): number {
  return 500 * attempt;
}

// ---------------------------------------------------------------------------
// 4. Response Error Handler
// ---------------------------------------------------------------------------
// The backend returns errors in a standardised shape:
//
//   { success: false, error: { code: "...", message: "..." } }
//
// The interceptor extracts the human-readable message so callers only need
// to catch a simple string.  Fallback messages are provided for network
// errors, 500 responses, and completely unexpected failures.
// ---------------------------------------------------------------------------

apiClient.interceptors.response.use(
  // Successful responses pass through unchanged.
  (response) => response,

  async (error: AxiosError) => {
    const config = error.config as AxiosRequestConfig & {
      __retryCount?: number;
    };

    // --- Retry logic for temporary failures ---
    const status = error.response?.status;
    if (config && status && RETRYABLE_STATUS_CODES.includes(status)) {
      const retryCount = config.__retryCount ?? 0;

      if (retryCount < MAX_RETRIES) {
        config.__retryCount = retryCount + 1;
        const backoff = getBackoffDelay(config.__retryCount);

        // Wait before retrying
        await delay(backoff);

        // Retry the request with the same config
        return apiClient(config);
      }
    }

    // --- Extract meaningful error message ---
    if (error.response) {
      // The server responded with a status code outside the 2xx range.
      const data = error.response.data as {
        error?: { message?: string };
      } | undefined;

      // Try the standardised backend error shape first.
      const backendMessage = data?.error?.message;
      if (backendMessage) {
        error.message = backendMessage;
      } else if (status && status >= 500) {
        error.message = "Server error";
      } else {
        error.message = "Unexpected error";
      }
    } else {
      // No response at all — most likely a network issue.
      error.message = "Network error";
    }

    return Promise.reject(error);
  }
);

// ---------------------------------------------------------------------------
// 5. Export
// ---------------------------------------------------------------------------

export default apiClient;
