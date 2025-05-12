"use client";

import { useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition from "react-speech-recognition";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log("[ClientLayout] SpeechRecognition loaded:", SpeechRecognition);
      console.log("[ClientLayout] browserSupportsSpeechRecognition:", SpeechRecognition?.browserSupportsSpeechRecognition);
    }
  }, []);

  return <>{children}</>;
}