"use client";

import { useState, useEffect, useRef } from "react";
import { useSpeechRecognitionContext } from "@/contexts/SpeechRecognitionContext";
import { Mic, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

interface AdFormProps {
  type: "sell" | "promote";
  platforms: string[];
}

export default function AdForm({ type, platforms }: AdFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isSpeechLoaded, setIsSpeechLoaded] = useState<boolean | null>(null);
  const { activeField, setActiveField } = useSpeechRecognitionContext();
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      setIsSpeechLoaded(!!SpeechRecognition);
    }
  }, []);

  useEffect(() => {
    if (listening && transcript && activeField) {
      if (activeField === "title") {
        setTitle(transcript);
      } else if (activeField === "description") {
        setDescription(transcript);
      } else if (activeField === "price") {
        setPrice(transcript);
      }
    }
  }, [transcript, listening, activeField]);

  const handleSpeech = (field: string) => {
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

      setActiveField(field);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`[AdForm] Submitted: ${type} on ${platforms.join(', ')}`, { title, description, price });
    toast.success(`Đã gửi form ${type} trên ${platforms.join(', ')}`);
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
      <div className="form-container bg-white rounded-xl shadow-2xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center">
          Tạo bài {type === "sell" ? "bán hàng" : "quảng bá"} trên {platforms.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(", ")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Tiêu đề</label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Nhập tiêu đề"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => (listening && activeField === "title" ? stopSpeech() : handleSpeech("title"))}
                    className={`p-2 sm:p-3 rounded-lg transition-colors ${
                      listening && activeField === "title" ? "bg-red-500" : "bg-blue-500"
                    } text-white hover:bg-opacity-90`}
                  >
                    <Mic className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {listening && activeField === "title" ? "Dừng ghi âm" : "Ghi âm tiêu đề"}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Mô tả</label>
            <div className="flex items-center space-x-3">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Nhập mô tả"
                rows={4}
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() =>
                      listening && activeField === "description" ? stopSpeech() : handleSpeech("description")
                    }
                    className={`p-2 sm:p-3 rounded-lg transition-colors ${
                      listening && activeField === "description" ? "bg-red-500" : "bg-blue-500"
                    } text-white hover:bg-opacity-90`}
                  >
                    <Mic className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {listening && activeField === "description" ? "Dừng ghi âm" : "Ghi âm mô tả"}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          {type === "sell" && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">Giá</label>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Nhập giá"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => (listening && activeField === "price" ? stopSpeech() : handleSpeech("price"))}
                      className={`p-2 sm:p-3 rounded-lg transition-colors ${
                        listening && activeField === "price" ? "bg-red-500" : "bg-blue-500"
                      } text-white hover:bg-opacity-90`}
                    >
                      <Mic className="w-4 sm:w-5 h-4 sm:h-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {listening && activeField === "price" ? "Dừng ghi âm" : "Ghi âm giá"}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors text-sm sm:text-base"
          >
            <Send className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
            Gửi
          </button>
        </form>
      </div>
    </TooltipProvider>
  );
}