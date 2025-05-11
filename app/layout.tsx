import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import ChatInput from '@/components/ChatInput';

const notoSans = Noto_Sans({
  weight: ['400', '700'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  title: 'Saafree - Tự động hóa Bán hàng & Quảng bá với AI',
  description:
    'Dễ dàng bán sản phẩm, quảng bá thương hiệu trên Zalo, Facebook, Shopee và website riêng mà không cần kỹ năng kỹ thuật.',
  metadataBase: new URL('https://saafree.com'),
  openGraph: {
    title: 'Saafree - Tự động hóa Bán hàng & Quảng bá với AI',
    description:
      'Dễ dàng bán sản phẩm, quảng bá thương hiệu trên Zalo, Facebook, Shopee và website riêng mà không cần kỹ năng kỹ thuật.',
    url: 'https://saafree.com',
    siteName: 'Saafree',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${notoSans.variable} antialiased min-h-screen flex flex-col`}>
        {children}
        <ChatInput />
      </body>
    </html>
  );
}