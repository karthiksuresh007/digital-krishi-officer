import React from "react";

interface QueryTextareaProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  maxLength?: number;
}

export default function QueryTextarea({
  value,
  onChange,
  disabled = false,
  maxLength = 500,
}: QueryTextareaProps) {
  return (
    <div className="w-full relative">
      <textarea
        className="w-full min-h-[120px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
        placeholder="Example: My wheat leaves are turning yellow. What should I do?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        disabled={disabled}
      />
      <div className="text-right text-sm text-gray-500 mt-1">
        {value.length} / {maxLength}
      </div>
    </div>
  );
}
