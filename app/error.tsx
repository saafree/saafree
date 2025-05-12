"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("[Global Error]:", error);
    window.addEventListener("unhandledrejection", (event) => {
      console.error("[Unhandled Rejection]:", event.reason);
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Đã xảy ra lỗi</h1>
      <p className="text-gray-600 mb-6">{error.message || "Lỗi không xác định"}</p>
      <button
        onClick={reset}
        className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Thử lại
      </button>
    </div>
  );
}