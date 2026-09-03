import React from 'react';
import { Card } from '../ui/Card';
import { ShieldCheck, Coins, Globe, Award } from 'lucide-react';

export const BrandStatement: React.FC = () => {
  const highlights = [
    {
      title: 'BACKED BY REAL ASSETS',
      description: 'Grounded in physical gold minting and physical asset stability.',
      icon: <Coins className="w-6 h-6 text-[#F3D068]" />,
    },
    {
      title: '100% SECURE & TRANSPARENT',
      description: 'Rule-based verification workflows protecting brand standards.',
      icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
    },
    {
      title: 'GLOBAL ACCESS',
      description: 'Multilingual promotional materials for international community reach.',
      icon: <Globe className="w-6 h-6 text-[#F3D068]" />,
    },
    {
      title: 'PRECIOUS BY DESIGN',
      description: 'Crafted with premium black and metallic gold visual excellence.',
      icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
    },
  ];

  return (
    <section id="about" className="relative py-20 bg-[#0A0B0E]/80 border-y border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <Card
              key={idx}
              className="p-6 border border-[#D4AF37]/30 bg-gradient-to-b from-[#181A22] to-[#14161D] hover:border-[#D4AF37] transition-all text-center flex flex-col items-center justify-between group shadow-gold-glow/10"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0A0B0E] border border-[#D4AF37]/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-gold-glow/20">
                {item.icon}
              </div>

              <div>
                <h3 className="text-xs font-bold font-display text-[#F3D068] uppercase tracking-wider mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
