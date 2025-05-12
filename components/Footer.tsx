"use client";

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white shadow-sm py-8 mt-auto">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-6 mb-6">
          <div className="text-gray-800 text-sm sm:text-base">
            <p className="font-semibold text-lg mb-3">Công ty cổ phần Đầu tư Tinh Long</p>
            <p className="mb-2">
              Địa chỉ: 68 Tắc Xuất, Cần Thạnh, Cần Giờ, TPHCM
            </p>
            <p className="mb-2">
              Điện thoại:{" "}
              <a href="tel:+0902390886" className="text-gray-600 hover:text-gray-800">
                0902390886
              </a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:saafreejsc@gmail.com" className="text-gray-600 hover:text-gray-800">
                saafreejsc@gmail.com
              </a>
            </p>
          </div>
          <div className="text-gray-800 text-sm sm:text-base">
            <p className="font-semibold text-lg mb-3">Liên kết nhanh</p>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-800">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-gray-800">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-gray-800">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <p className="text-center text-gray-500 text-xs">
            © 2025 Saafree. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 