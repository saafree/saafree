"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ChatInput from "@/components/ChatInput";
import PlatformSelectorModal from "@/components/PlatformSelectorModal";
import AuthModal from "@/components/AuthModal";
import { toast } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [message, setMessage] = useState("");
  const [adType, setAdType] = useState<"sales" | "promotion">("sales");

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Đăng xuất thành công");
    } catch (error) {
      toast.error("Đăng xuất thất bại");
    }
  };

  const handleCreateAd = (type: "sales" | "promotion") => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setAdType(type);
    setShowPlatformModal(true);
  };

  const handlePlatformSelect = (platform: string) => {
    router.push(`/create-ad/${showPlatformModal ? "sales" : "promotion"}/${platform}`);
  };

  const handleSendMessage = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Xử lý gửi tin nhắn
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tạo bài đăng quảng cáo tự động
            </h1>
            <p className="text-xl text-gray-600">
              Chỉ cần nhập nội dung, chúng tôi sẽ tạo bài đăng phù hợp với từng nền tảng
            </p>
          </div>

          <div className="flex justify-center space-x-4 mb-12">
            <button
              onClick={() => handleCreateAd("sales")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tạo bài bán hàng
            </button>
            <button
              onClick={() => handleCreateAd("promotion")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Tạo bài quảng cáo
            </button>
          </div>

          <div className="max-w-3xl mx-auto">
            <ChatInput
              value={message}
              onChange={setMessage}
              onSend={handleSendMessage}
              onSpeechStart={() => setShowAuthModal(true)}
            />
          </div>
        </div>
      </main>

      <PlatformSelectorModal
        isOpen={showPlatformModal}
        onClose={() => setShowPlatformModal(false)}
        type={adType}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}