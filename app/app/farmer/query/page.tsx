"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import QueryTextarea from "@/components/farmer/QueryTextarea";
import SubmitButton from "@/components/farmer/SubmitButton";

export default function FarmerQueryPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      await apiClient.post("/api/queries", {
        type: "text",
        content: query.trim(),
      });
      
      // On success, redirect to the response page
      router.push("/farmer/response");
    } catch (err: unknown) {
      const typedErr = err as { message: string };
      setError(typedErr.message || "Failed to submit query. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Ask a Question</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-6">
        <QueryTextarea
          value={query}
          onChange={setQuery}
          disabled={loading}
          maxLength={500}
        />

        <SubmitButton
          isLoading={loading}
          isDisabled={query.trim().length === 0}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
