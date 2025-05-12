"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSpeechRecognitionContext } from '@/contexts/SpeechRecognitionContext';
import { toast } from 'react-hot-toast';
import { Mic, ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSend?: () => void;
  onSpeechStart?: () => void;
}

export default function ChatInput({ value, onChange, placeholder = "Nhập tin nhắn...", onSend, onSpeechStart }: ChatInputProps) {
  const [isSpeechLoaded, setIsSpeechLoaded] = useState<boolean | null>(null);
  const [listening, setListening] = useState<boolean>(false);
  const { activeField, setActiveField } = useSpeechRecognitionContext();
  const recognitionRef = useRef<any>(null);
  const [transcript, setTranscript] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      setIsSpeechLoaded(!!SpeechRecognition);
    }
  }, []);

  useEffect(() => {
    if (listening && transcript) {
      onChange(transcript);
    }
  }, [transcript, listening, onChange]);

  const handleSpeech = () => {
    if (!user) {
      if (onSpeechStart) {
        onSpeechStart();
      }
      return;
    }

    if (isSpeechLoaded === null) {
      toast.error("Chức năng nhận diện giọng nói đang tải...");
      return;
    }
    if (!isSpeechLoaded) {
      toast.error("Trình duyệt không hỗ trợ nhận diện giọng nói");
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'vi-VN';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const newTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(newTranscript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setListening(false);
        setActiveField(null);
        toast.error('Lỗi nhận dạng giọng nói');
      };

      recognition.onend = () => {
        setListening(false);
        setActiveField(null);
      };

      setActiveField("chat");
      setListening(true);
      recognition.start();
      toast.success('Bắt đầu ghi âm');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast.error('Không thể bắt đầu ghi âm');
    }
  };

  const stopSpeech = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
    setActiveField(null);
    setTranscript("");
    toast.success('Đã dừng ghi âm');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!user) {
        if (onSpeechStart) {
          onSpeechStart();
        }
        return;
      }
      if (value.trim() && onSend) {
        onSend();
        toast.success('Đã gửi tin nhắn');
      } else {
        toast.error('Vui lòng nhập nội dung tin nhắn');
      }
    }
  };

  if (isSpeechLoaded === null) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-gray-500">Đang tải chức năng nhận diện giọng nói...</p>
      </div>
    );
  }

  if (!isSpeechLoaded) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-red-500">Trình duyệt không hỗ trợ nhận diện giọng nói.</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-3">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
          placeholder={placeholder}
          rows={1}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={listening ? stopSpeech : handleSpeech}
              className={`p-2 sm:p-3 rounded-lg transition-colors ${
                listening ? "bg-red-500" : "bg-blue-500"
              } text-white hover:bg-opacity-90`}
            >
              <Mic className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {listening ? "Dừng ghi âm" : "Ghi âm"}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => {
                if (!user) {
                  if (onSpeechStart) {
                    onSpeechStart();
                  }
                  return;
                }
                value.trim() && onSend?.();
              }}
              className={`p-2 sm:p-3 rounded-lg transition-colors ${
                value.trim() ? "bg-green-500" : "bg-gray-300"
              } text-white hover:bg-opacity-90`}
              disabled={!value.trim()}
            >
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            Gửi tin nhắn
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}