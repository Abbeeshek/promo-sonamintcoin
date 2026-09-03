import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { getAuthState } from '../../services/auth/authService';

export const HomeNavbar: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = getAuthState();

  const logoPath = '/LOGO/Sonamitcoin/WhatsApp Image 2026-08-17 at 13.17.31 (2).jpeg';

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Showcase', href: '#showcase' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050506]/80 backdrop-blur-xl border-b border-[#D4AF37]/25 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Official Sona Mint Coin Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]/50 p-0.5 shadow-gold-glow group-hover:scale-105 transition-transform">
            <img
              src={logoPath}
              alt="Official Sona Mint Coin Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <span className="text-base font-extrabold font-display text-[#F9FAFB] tracking-wider block group-hover:text-[#F3D068] transition-colors">
              SONA MINT COIN
            </span>
            <span className="text-[9px] font-mono text-[#D4AF37] tracking-widest uppercase block -mt-1">
              PROMOTIONAL HUB
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold text-[#9CA3AF] hover:text-[#F3D068] transition-colors uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Sign In Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate(isAuthenticated ? '/app' : '/login')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-neutral-950 text-xs font-extrabold font-display tracking-wider uppercase shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
          >
            <span>{isAuthenticated ? 'Go to Dashboard' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#F3D068] border border-[#D4AF37]/30 bg-[#0A0B0E]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0B0E]/95 border-b border-[#D4AF37]/30 px-6 py-6 space-y-4 animate-hero-fade">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-[#9CA3AF] hover:text-[#F3D068] uppercase tracking-wider py-1"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate(isAuthenticated ? '/app' : '/login');
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-neutral-950 text-xs font-bold uppercase tracking-wider shadow-gold-glow"
            >
              <span>{isAuthenticated ? 'Go to Dashboard' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
