import type { NextPage } from 'next';
import Link from 'next/link'; // Import Link từ next/link

const About: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Giới thiệu Saafree</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl text-center">
        Saafree là nền tảng tự động hóa AI thông minh dành cho SMEs Việt Nam
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Quay lại Trang chủ
      </Link>
    </div>
  );
};

export default About;