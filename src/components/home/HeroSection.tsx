import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { getAuthState } from '../../services/auth/authService';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = getAuthState();

  const officialCoinPath = '/LOGO/Sonamitcoin/WhatsApp Image 2026-08-17 at 13.17.31 (2).jpeg';

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Radiant Background Gold Flares */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#F3D068]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#F3D068] shadow-gold-glow/20">
              <Sparkles className="w-4 h-4 text-[#F3D068] animate-pulse" />
              <span>OFFICIAL PROMOTIONAL HUB</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-[#F9FAFB] leading-[1.1]">
              SONA MINT <br />
              <span className="text-gold-gradient drop-shadow-gold">COIN</span>
            </h1>

            <p className="text-lg sm:text-xl font-display font-medium text-[#F3D068] tracking-wider uppercase">
              The Precious Digital Asset
            </p>

            {/* Concise Sub-statement */}
            <p className="text-sm sm:text-base text-[#9CA3AF] max-w-xl leading-relaxed">
              Designed to redefine digital promotion, verified content workflows, and global community distribution. Backed by real world value and physical gold minting infrastructure.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => navigate(isAuthenticated ? '/app' : '/login')}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gold-gradient text-neutral-950 text-sm font-extrabold font-display tracking-wider uppercase shadow-2xl shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Explore Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-[#181A22] border border-[#D4AF37]/40 text-sm font-bold text-[#F3D068] hover:bg-[#D4AF37]/10 transition-colors uppercase tracking-wider"
              >
                Learn More
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center gap-6 border-t border-white/[0.08] text-xs font-mono text-[#9CA3AF]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F3D068]" />
                <span>Verified Asset Workflows</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>24K Gold Backed Ecosystem</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating 3D Gold Emblem (5 cols) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Glowing Podium Aura */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37]/40 via-[#F3D068]/20 to-transparent blur-3xl scale-110 pointer-events-none animate-pulse" />

              {/* Floating Coin Container */}
              <div className="relative w-72 sm:w-88 aspect-square rounded-full border-4 border-[#D4AF37]/60 bg-gradient-to-b from-[#181A22] via-[#0A0B0E] to-[#181A22] p-3 shadow-2xl shadow-gold-glow flex items-center justify-center animate-float">
                <img
                  src={officialCoinPath}
                  alt="Official Sona Mint Coin 3D Emblem"
                  className="w-full h-full object-cover rounded-full shadow-2xl"
                />
              </div>

              {/* Golden Base Pedestal Graphic */}
              <div className="w-64 sm:w-80 h-6 mx-auto mt-4 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent blur-md pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
