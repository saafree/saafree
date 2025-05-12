"use client";

import { useState } from "react";
import PlatformSelectorModal from "@/components/PlatformSelectorModal";

interface PageProps {
  params: Promise<{
    type: "sales" | "promotion";
  }>;
}

export default async function CreateAdPage({ params }: PageProps) {
  const { type } = await params;

  // Nếu type không tồn tại, trả về thông báo lỗi rõ ràng
  if (!type) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Lỗi: Không xác định loại bài đăng (sales/promotion)
        </h1>
        <p>Vui lòng truy cập lại từ trang chủ.</p>
      </div>
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">
        Tạo bài {type === "sales" ? "bán hàng" : "quảng bá"}
      </h1>
      <button
        data-testid="open-modal"
        onClick={() => setIsModalOpen(true)}
        className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Chọn nền tảng
      </button>
      <PlatformSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={type}
      />
    </div>
  );
}