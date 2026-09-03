import React from 'react';
import { Card } from '../ui/Card';
import { Sparkles, Video, Image as ImageIcon, Presentation } from 'lucide-react';

export const VisualShowcase: React.FC = () => {
  const showcaseItems = [
    {
      title: 'Sonamintcoin Plan Main Poster',
      category: 'Core Business Plan',
      type: 'Poster',
      icon: <ImageIcon className="w-4 h-4 text-[#F3D068]" />,
      image: '/Posters/Sonamintcoin Plan/WhatsApp Image 2026-08-17 at 13.17.58.jpeg',
    },
    {
      title: 'Club Membership Promotional Video',
      category: 'Executive Benefits',
      type: 'Video Reel',
      icon: <Video className="w-4 h-4 text-[#F3D068]" />,
      image: '/Posters/Profit Sharing - Club Membership/English/WhatsApp Image 2026-08-17 at 13.17.47.jpeg',
    },
    {
      title: 'Sona Mint Coin Presentation Deck',
      category: 'Multilingual Deck',
      type: 'PDF Deck',
      icon: <Presentation className="w-4 h-4 text-[#F3D068]" />,
      image: '/Posters/Sonamintcoin Plan/WhatsApp Image 2026-08-17 at 13.18.00.jpeg',
    },
  ];

  return (
    <section id="showcase" className="relative py-20 bg-[#0A0B0E]/90 border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#F3D068] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL WORKSPACE MEDIA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F9FAFB]">
              Verified Promotional Media Catalog
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseItems.map((item, idx) => (
            <Card
              key={idx}
              className="p-4 border border-[#D4AF37]/30 bg-gradient-to-b from-[#181A22] to-[#14161D] hover:border-[#D4AF37] transition-all overflow-hidden group shadow-gold-glow/10"
            >
              <div className="relative aspect-video rounded-xl bg-black overflow-hidden mb-4 border border-white/10 group-hover:scale-[1.02] transition-transform">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#F3D068] flex items-center gap-1 font-bold">
                  {item.icon}
                  <span>{item.type}</span>
                </div>
              </div>

              <h3 className="text-sm font-bold font-display text-[#F9FAFB] group-hover:text-[#F3D068] transition-colors line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-[#9CA3AF]">{item.category}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
