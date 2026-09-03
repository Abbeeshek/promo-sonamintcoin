import React from 'react';

export const MinimalFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#0A0B0E] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#F9FAFB] font-display">SONA MINT COIN</span>
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[11px] uppercase tracking-widest text-[#6B7280]">Official Hub</span>
        </div>
      </div>
    </footer>
  );
};
