import React from 'react';
import { Card } from '../ui/Card';
import { Shield, Zap, Layers, TrendingUp, Sparkles } from 'lucide-react';

export const FeatureSection: React.FC = () => {
  const features = [
    {
      title: 'ASSET BACKED',
      description: 'Physical gold minting standards ensuring long-term stability and genuine value.',
      icon: <Shield className="w-7 h-7 text-[#F3D068]" />,
    },
    {
      title: 'DECENTRALIZED WORKFLOW',
      description: 'Transparent verification engine for community content uploads and marketing.',
      icon: <Layers className="w-7 h-7 text-[#D4AF37]" />,
    },
    {
      title: 'FAST & EFFICIENT',
      description: 'Streamlined social publishing and multi-platform schedule management.',
      icon: <Zap className="w-7 h-7 text-[#F3D068]" />,
    },
    {
      title: 'SUSTAINABLE GROWTH',
      description: 'Structured promotional infrastructure driving international community expansion.',
      icon: <TrendingUp className="w-7 h-7 text-[#D4AF37]" />,
    },
  ];

  return (
    <section id="features" className="relative py-24 bg-[#050506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#F3D068]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BUILT FOR THE FUTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F9FAFB]">
            Powering the Next Era of <span className="text-gold-gradient">Digital Value</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF]">
            Comprehensive promotional infrastructure designed for global community management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feat, idx) => (
            <Card
              key={idx}
              className="p-7 border border-[#D4AF37]/30 bg-gradient-to-br from-[#181A22] via-[#1A1D27] to-[#14161D] hover:border-[#D4AF37] transition-all flex flex-col justify-between group shadow-2xl shadow-gold-glow/10"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#0A0B0E] border border-[#D4AF37]/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-gold-glow/20">
                  {feat.icon}
                </div>

                <h3 className="text-base font-extrabold font-display text-[#F9FAFB] mb-2 group-hover:text-[#F3D068] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
