import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { X } from 'lucide-react';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sliding Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-[#14161D] shadow-2xl z-10 flex flex-col animate-hero-fade">
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-[#9CA3AF] hover:text-[#F9FAFB] p-2 rounded-xl bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <Sidebar className="w-full h-full border-r-0" onItemClick={onClose} />
      </div>
    </div>
  );
};
