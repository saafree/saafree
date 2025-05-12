"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SpeechRecognitionContextType {
  activeField: string | null;
  setActiveField: (field: string | null) => void;
}

const SpeechRecognitionContext = createContext<SpeechRecognitionContextType>({
  activeField: null,
  setActiveField: () => {},
});

export function SpeechRecognitionProvider({ children }: { children: React.ReactNode }) {
  const [activeField, setActiveField] = useState<string | null>(null);

  return (
    <SpeechRecognitionContext.Provider value={{ activeField, setActiveField }}>
      {children}
    </SpeechRecognitionContext.Provider>
  );
}

export function useSpeechRecognitionContext() {
  const context = useContext(SpeechRecognitionContext);
  if (!context) {
    throw new Error('useSpeechRecognitionContext must be used within a SpeechRecognitionProvider');
  }
  return context;
}