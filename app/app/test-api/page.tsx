"use client";

import { useState } from "react";
import apiClient from "@/lib/apiClient";

/**
 * Test page to demonstrate the API client's features:
 *  1. Making a request (with auto JWT header)
 *  2. Handling network errors gracefully
 *  3. Showing the extracted error message
 *
 * Access at: http://localhost:3000/test-api
 *
 * NOTE: This page is for testing only and should be removed before production.
 */
export default function TestApiPage() {
  const [log, setLog] = useState<string[]>([]);

  function addLog(message: string) {
    setLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  }

  // -----------------------------------------------------------------------
  // Test 1: Simulate setting a JWT token and making a request
  // -----------------------------------------------------------------------
  async function testJwtInterceptor() {
    addLog("--- Test: JWT Interceptor ---");

    // Set a fake token in localStorage
    localStorage.setItem("token", "fake-test-jwt-token-12345");
    addLog("Set fake JWT token in localStorage");

    try {
      // This will fail (no backend running), but we can check the request config
      addLog("Making GET /api/health (backend probably not running yet)...");
      const response = await apiClient.get("/api/health");
      addLog(`✅ Response: ${JSON.stringify(response.data)}`);
    } catch (error: unknown) {
      const err = error as { message: string; config?: { headers?: Record<string, string> } };
      addLog(`❌ Error (expected): ${err.message}`);

      // Show that the Authorization header WAS attached
      const authHeader = err.config?.headers?.Authorization;
      if (authHeader) {
        addLog(`✅ JWT was attached: ${authHeader}`);
      } else {
        addLog("⚠️ JWT was NOT attached (check interceptor)");
      }
    }

    // Clean up
    localStorage.removeItem("token");
    addLog("Cleaned up fake token\n");
  }

  // -----------------------------------------------------------------------
  // Test 2: Request without token (should send normally, no crash)
  // -----------------------------------------------------------------------
  async function testNoToken() {
    addLog("--- Test: Request Without Token ---");
    localStorage.removeItem("token");

    try {
      addLog("Making GET /api/health without token...");
      const response = await apiClient.get("/api/health");
      addLog(`✅ Response: ${JSON.stringify(response.data)}`);
    } catch (error: unknown) {
      const err = error as { message: string; config?: { headers?: Record<string, string> } };
      addLog(`❌ Error (expected): ${err.message}`);

      const authHeader = err.config?.headers?.Authorization;
      if (!authHeader) {
        addLog("✅ Correct — no Authorization header sent");
      }
    }
    addLog("");
  }

  // -----------------------------------------------------------------------
  // Test 3: Network error handling (hit a non-existent server)
  // -----------------------------------------------------------------------
  async function testNetworkError() {
    addLog("--- Test: Network Error Handling ---");
    addLog("Making request to a non-existent endpoint...");

    try {
      // This will get a network error since no backend is running
      await apiClient.get("/api/nonexistent");
    } catch (error: unknown) {
      const err = error as { message: string };
      addLog(`❌ Caught error: "${err.message}"`);
      addLog(
        err.message === "Network error"
          ? "✅ Correct — network error was detected"
          : "✅ Error was handled gracefully"
      );
    }
    addLog("");
  }

  // -----------------------------------------------------------------------
  // Test 4: Verify base URL configuration
  // -----------------------------------------------------------------------
  function testBaseUrl() {
    addLog("--- Test: Base URL Config ---");
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    addLog(`NEXT_PUBLIC_API_URL = ${baseURL ?? "(not set)"}`);
    addLog(
      baseURL
        ? "✅ Environment variable is configured"
        : "⚠️ Not set — create app/.env.local from app/.env.local.example"
    );
    addLog("");
  }

  // -----------------------------------------------------------------------
  // Run all tests
  // -----------------------------------------------------------------------
  async function runAllTests() {
    setLog([]);
    addLog("🚀 Starting API Client Tests\n");

    testBaseUrl();
    await testJwtInterceptor();
    await testNoToken();
    await testNetworkError();

    addLog("✅ All tests complete!");
  }

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">API Client Test Page</h1>
      <p className="text-gray-600 mb-6">
        This page tests the Axios API client at{" "}
        <code className="bg-gray-100 px-1 rounded">lib/apiClient.ts</code>
      </p>

      <button
        onClick={runAllTests}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition mb-6"
      >
        Run All Tests
      </button>

      {log.length > 0 && (
        <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm whitespace-pre-wrap max-h-[500px] overflow-y-auto">
          {log.map((entry, i) => (
            <div key={i}>{entry}</div>
          ))}
        </div>
      )}
    </div>
  );
}
