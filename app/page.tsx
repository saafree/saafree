import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Chào mừng đến với Saafree</h1>
      <p className="mt-4 text-lg text-gray-700">
        Nền tảng tự động hóa AI thông minh dành cho SMEs Việt Nam
      </p>
      <a
        href="/about"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Tìm hiểu thêm
      </a>
    </div>
  );
};

export default Home;