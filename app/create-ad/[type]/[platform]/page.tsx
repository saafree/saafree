"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdForm from "@/components/AdForm";
import nextDynamic from "next/dynamic";
import { useAuth } from '@/contexts/AuthContext';

const ChatInput = nextDynamic(() => import("@/components/ChatInput"), { ssr: false });

export const dynamic = "force-dynamic";

export default function AdFormPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const type = params.type as "sell" | "promote";
  const platformParam = params.platform as string;
  const platforms = decodeURIComponent(platformParam).split(",");

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleSend = () => {
    // Handle sending message
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-4 sm:p-6">
        <AdForm type={type} platforms={platforms} />
      </main>
      <footer className="p-4 sm:p-6">
        <div className="chat-input-container">
          <ChatInput
            value={message}
            onChange={setMessage}
            onSend={handleSend}
            placeholder="Nhập tin nhắn..."
          />
        </div>
      </footer>
    </div>
  );
}