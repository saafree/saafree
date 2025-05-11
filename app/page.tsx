import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saafree - Tự động hóa Bán hàng & Quảng bá với AI',
  description: 'Dễ dàng bán sản phẩm, quảng bá thương hiệu trên Zalo, Facebook, Shopee và website riêng mà không cần kỹ năng kỹ thuật.',
  openGraph: {
    title: 'Saafree - Tự động hóa Bán hàng & Quảng bá với AI',
    description: 'Dễ dàng bán sản phẩm, quảng bá thương hiệu trên Zalo, Facebook, Shopee và website riêng mà không cần kỹ năng kỹ thuật.',
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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/images/logo.png" alt="Saafree Logo" width={40} height={40} />
            <span className="ml-2 text-xl font-bold text-gray-800">Saafree</span>
          </div>
          <nav>
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-800 mr-4">
              Đăng nhập
            </Link>
            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Đăng ký
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
              Saafree - Tự động hóa Bán hàng & Quảng bá với AI
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Dễ dàng bán sản phẩm, quảng bá thương hiệu trên Zalo, Facebook, Shopee và website riêng
              mà không cần kỹ năng kỹ thuật.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/create-ad/sell"
                className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700"
              >
                Bán sản phẩm/Dịch vụ
              </Link>
              <Link
                href="/create-ad/promote"
                className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-700"
              >
                Quảng bá thương hiệu
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-sm py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          {/* Thông tin liên hệ (bên trái) */}
          <div className="text-gray-800 mb-4 sm:mb-0">
            <p>
              Liên hệ:{' '}
              <a href="tel:+0902390886" className="text-gray-600 hover:text-gray-800">
                0902390886
              </a>
            </p>
            <p>
              Email:{' '}
              <a href="mailto:saafreejsc@gmail.com" className="text-gray-600 hover:text-gray-800">
                saafreejsc@gmail.com
              </a>
            </p>
          </div>
          {/* Bản quyền (căn giữa) */}
          <div className="text-gray-800 text-center">
            <p>© 2025 Saafree. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}