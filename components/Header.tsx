"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import AuthModal from './AuthModal';

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container py-4 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="flex items-center mb-4 sm:mb-0 hover:opacity-80 transition-opacity">
          <Image src="/images/logo.png" alt="Saafree Logo" width={40} height={40} />
          <span className="ml-2 text-lg sm:text-xl font-bold text-gray-800">Saafree</span>
        </Link>
        <nav className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <Link href="/about" className="text-gray-600 hover:text-gray-800 text-sm sm:text-base">
            Giới thiệu
          </Link>
          {user ? (
            <button
              onClick={handleSignOut}
              className="text-gray-600 hover:text-gray-800 text-sm sm:text-base"
            >
              Đăng xuất
            </button>
          ) : (
            <>
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-gray-600 hover:text-gray-800 text-sm sm:text-base"
              >
                Đăng nhập
              </button>
              <Link
                href="/auth/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base"
              >
                Đăng ký
              </Link>
            </>
          )}
        </nav>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </header>
  );
} 