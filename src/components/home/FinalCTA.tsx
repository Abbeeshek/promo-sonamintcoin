import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getAuthState } from '../../services/auth/authService';

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = getAuthState();

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#050506] via-[#14161D] to-[#050506] border-t border-[#D4AF37]/30 text-center overflow-hidden">
      {/* Background Gold Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#F3D068]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>READY TO BEGIN?</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#F9FAFB] tracking-tight">
          Join the Sona Mint Coin Revolution
        </h2>

        <p className="text-xs sm:text-base text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
          Access official promotional media, upload custom campaign graphics, verify content against brand guidelines, and schedule social posts.
        </p>

        <div className="pt-4 flex justify-center">
          <button
            onClick={() => navigate(isAuthenticated ? '/app' : '/login')}
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl bg-gold-gradient text-neutral-950 text-sm font-extrabold font-display tracking-wider uppercase shadow-2xl shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
          >
            <span>{isAuthenticated ? 'Go to Dashboard' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
