import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const MinimalNav: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0A0B0E]/80 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
            <div className="w-8 h-8 rounded-full bg-[#0A0B0E] flex items-center justify-center border border-[#F3D068]/40">
              <span className="text-xs font-black tracking-tighter text-gold-gradient font-display">SMC</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-wider text-[#F9FAFB] font-display uppercase group-hover:text-[#F3D068] transition-colors">
              Sona Mint Coin
            </span>
            <span className="text-[10px] tracking-widest text-[#9CA3AF] uppercase font-medium">
              Promotional Hub
            </span>
          </div>
        </Link>

        {/* Action Items */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-[#9CA3AF] hover:text-[#F9FAFB] px-3 py-2 transition-colors"
          >
            Login
          </Link>
          <Link to="/app">
            <Button variant="primary" size="md">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
