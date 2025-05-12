import React from "react";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SpeechRecognitionProvider } from "@/contexts/SpeechRecognitionContext";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSans = Noto_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Saafree - Tạo bài quảng cáo dễ dàng",
    template: "%s | Saafree",
  },
  description: "Tạo bài bán hàng và quảng bá trên các nền tảng Zalo, Facebook, Shopee, website với Saafree.",
  openGraph: {
    title: "Saafree - Tạo bài quảng cáo dễ dàng",
    description: "Tạo bài bán hàng và quảng bá trên các nền tảng Zalo, Facebook, Shopee, website với Saafree.",
    images: ["/images/og-image.png"],
    url: "https://saafree.com",
  },
  metadataBase: new URL("https://saafree.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={notoSans.className}>
        <AuthProvider>
          <SpeechRecognitionProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          </SpeechRecognitionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}