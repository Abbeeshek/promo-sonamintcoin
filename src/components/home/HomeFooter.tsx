import React from 'react';
import { Link } from 'react-router-dom';

export const HomeFooter: React.FC = () => {
  const logoPath = '/LOGO/Sonamitcoin/WhatsApp Image 2026-08-17 at 13.17.31 (2).jpeg';

  return (
    <footer className="bg-[#050506] border-t border-white/[0.08] py-12 text-xs text-[#9CA3AF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Official Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37]/40 p-0.5">
            <img
              src={logoPath}
              alt="Official Sona Mint Coin Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <span className="text-sm font-extrabold font-display text-[#F9FAFB] block">
              SONA MINT COIN
            </span>
            <span className="text-[9px] font-mono text-[#D4AF37] tracking-wider block -mt-1">
              THE PRECIOUS DIGITAL ASSET
            </span>
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-wrap items-center gap-6 font-medium text-xs">
          <a href="#" className="hover:text-[#F3D068] transition-colors">Home</a>
          <a href="#about" className="hover:text-[#F3D068] transition-colors">About</a>
          <a href="#features" className="hover:text-[#F3D068] transition-colors">Features</a>
          <Link to="/login" className="hover:text-[#F3D068] transition-colors">Sign In</Link>
        </div>

        {/* Right: Copyright */}
        <div className="font-mono text-[11px] text-[#6B7280]">
          © {new Date().getFullYear()} Sona Mint Coin. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
