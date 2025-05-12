import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Giới thiệu</h2>
        <p className="text-gray-600">
          Saafree là nền tảng giúp tự động hóa bán hàng và quảng bá với AI, hỗ trợ đăng bài trên Zalo, Facebook, Shopee, và website riêng.
        </p>
      </div>
    </div>
  );
}