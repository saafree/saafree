'use client';

import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, Send } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
}

const ChatInput: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý transcript từ giọng nói
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Bắt đầu/ dừng ghi âm
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      SpeechRecognition.startListening({ language: 'vi-VN', continuous: true });
    }
  };

  // Gửi prompt đến API
  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { text: input, isUser: true };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    resetTranscript();
    setIsLoading(true);

    try {
      const user_id = 'uuid-của-người-dùng'; // Thay bằng logic lấy user_id từ Supabase Auth
      const response = await fetch('/api/ai/grok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, prompt: input }),
      });

      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [...prev, { text: 'Lỗi: ' + data.error, isUser: false }]);
      } else {
        setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { text: 'Lỗi kết nối AI', isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý phím Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[300px] max-w-[90%] rounded-lg bg-white shadow-xl md:w-[350px]">
      {/* Cửa sổ chat */}
      {messages.length > 0 && (
        <div className="max-h-[200px] overflow-y-auto rounded-t-lg bg-gray-50 p-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 rounded-lg p-2 ${msg.isUser ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      )}

      {/* Ô nhập liệu */}
      <div className="flex items-center rounded-b-lg border-t bg-white p-2">
        <button
          onClick={toggleListening}
          className={`mr-2 rounded-full p-2 ${listening ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          aria-label={listening ? 'Dừng ghi âm' : 'Bắt đầu ghi âm'}
        >
          <Mic size={20} />
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Hỏi AI bất cứ điều gì..."
          className="h-10 w-full resize-none rounded-lg border-none p-2 focus:outline-none"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          className="ml-2 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:opacity-50"
          disabled={isLoading || !input.trim()}
          aria-label="Gửi tin nhắn"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;