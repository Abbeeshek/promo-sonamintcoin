import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { getAuthState } from '../../../services/auth/authService';

export const DashboardHeader: React.FC = () => {
  const { user } = getAuthState();
  const userName = user?.name || 'Promoter';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        greeting: `Good morning, ${userName} 👋`,
        motivation: 'Empower your global community with Sona Mint Coin promotions today.',
        icon: <Sun className="w-5 h-5 text-[#F3D068] animate-pulse" />,
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        greeting: `Good afternoon, ${userName} 👋`,
        motivation: 'Accelerate your promotional campaigns across all connected social channels.',
        icon: <Sun className="w-5 h-5 text-[#F3D068] animate-pulse" />,
      };
    } else {
      return {
        greeting: `Good evening, ${userName} 👋`,
        motivation: 'Review your daily publishing milestones and prepare tomorrow\'s schedule.',
        icon: <Moon className="w-5 h-5 text-[#F3D068] animate-pulse" />,
      };
    }
  };

  const { greeting, motivation, icon } = getGreeting();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#14161D] via-[#1A1D27] to-[#14161D] border border-[#D4AF37]/30 p-6 sm:p-8 shadow-2xl shadow-gold-glow/20">
      {/* Background Gold Ambient Radial Glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-[#D4AF37]/25 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-tr from-[#F3D068]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#F3D068]">
            {icon}
            <span>{greeting}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#F9FAFB]">
            Sona Mint Coin <span className="text-gold-gradient">Promotional Hub</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-2xl leading-relaxed">
            {motivation}
          </p>
        </div>
      </div>
    </div>
  );
};
