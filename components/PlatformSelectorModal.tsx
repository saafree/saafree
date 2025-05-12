"use client";

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/navigation';

interface PlatformSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "sales" | "promotion";
}

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: '📘' },
  { id: 'zalo', name: 'Zalo', icon: '💬' },
  { id: 'shopee', name: 'Shopee', icon: '🛍️' },
  { id: 'website', name: 'Website', icon: '🌐' },
];

export default function PlatformSelectorModal({ isOpen, onClose, type }: PlatformSelectorModalProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const router = useRouter();

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(id => id !== platformId);
      }
      return [...prev, platformId];
    });
  };

  const handleSubmit = () => {
    if (selectedPlatforms.length === 0) {
      return;
    }
    const platformsParam = encodeURIComponent(selectedPlatforms.join(','));
    router.push(`/create-ad/${type}/${platformsParam}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content bg-white"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      ariaHideApp={false}
    >
      <div className="p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Chọn nền tảng</h2>
        <div className="grid grid-cols-2 gap-4">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handlePlatformSelect(platform.id)}
              className={`flex items-center justify-center p-4 border rounded-lg transition-colors ${
                selectedPlatforms.includes(platform.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl mr-2">{platform.icon}</span>
              <span>{platform.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedPlatforms.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </Modal>
  );
}
