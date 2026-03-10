import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface SubmitButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export default function SubmitButton({
  isLoading,
  isDisabled,
  onClick,
}: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className="w-full bg-green-600 text-white p-3 rounded-lg font-medium transition-colors hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center h-[52px]"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          <span>Submitting your query...</span>
        </div>
      ) : (
        "Submit Query"
      )}
    </button>
  );
}
