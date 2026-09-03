import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CinematicHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-5rem)] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle Ambient Radial Light Layers */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-tr from-[#D4AF37]/15 via-[#AA7C11]/5 to-transparent rounded-full blur-3xl pointer-events-none animate-ambient-glow"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#F3D068]/10 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content Composition */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center animate-hero-fade">
        {/* Subtle Brand Emblem Graphic */}
        <div className="mb-8 relative group">
          <div className="absolute -inset-1 rounded-full bg-gold-gradient opacity-30 blur-md group-hover:opacity-60 transition duration-500" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#14161D] border border-[#F3D068]/30 flex items-center justify-center p-3 shadow-gold-glow">
            <img
              src="/LOGO/Sonamitcoin/WhatsApp Image 2026-08-17 at 13.17.31 (2).jpeg"
              alt="Sona Mint Coin Brand Emblem"
              className="w-full h-full object-contain rounded-full"
              onError={(e) => {
                // Fallback to text coin if image path is handled differently
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="w-full h-full rounded-full bg-gold-gradient flex items-center justify-center font-bold text-[#0A0B0E] font-display text-2xl">
              SMC
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-[#F9FAFB] uppercase mb-6 leading-tight">
          Promote. Share. <br />
          <span className="text-gold-gradient">Grow.</span>
        </h1>

        {/* Concise Supporting Copy */}
        <p className="text-lg sm:text-xl text-[#9CA3AF] max-w-2xl font-normal leading-relaxed mb-10">
          The official Sona Mint Coin promotional hub. Access brand media and amplify your reach across global networks.
        </p>

        {/* Primary Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="/app">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
              Launch Hub
            </Button>
          </Link>
        </div>

        {/* Small Supporting Brand Statement */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] w-full max-w-md flex items-center justify-center gap-2 text-xs text-[#9CA3AF] tracking-wider uppercase font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Official Brand Media & Assets Portal</span>
        </div>
      </div>
    </section>
  );
};
