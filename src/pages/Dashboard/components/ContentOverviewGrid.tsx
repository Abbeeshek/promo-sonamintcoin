import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Video, Image as ImageIcon, Presentation, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContentOverviewGridProps {
  videosCount?: number;
  postersCount?: number;
  presentationsCount?: number;
}

export const ContentOverviewGrid: React.FC<ContentOverviewGridProps> = ({
  videosCount = 16,
  postersCount = 40,
  presentationsCount = 4,
}) => {
  const items = [
    {
      title: 'Promotional Videos',
      count: `${videosCount}+`,
      link: '/app/videos',
      icon: <Video className="w-4 h-4 text-[#F3D068]" />,
      badge: 'Video Reels',
    },
    {
      title: 'Promotional Posters',
      count: `${postersCount}+`,
      link: '/app/posters',
      icon: <ImageIcon className="w-4 h-4 text-[#F3D068]" />,
      badge: 'Graphics',
    },
    {
      title: 'Presentations & Decks',
      count: `${presentationsCount}+`,
      link: '/app/presentations',
      icon: <Presentation className="w-4 h-4 text-[#F3D068]" />,
      badge: 'PDF / PPTX',
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold font-display text-[#D4AF37] uppercase tracking-wider">
          Media Asset Catalog Summary
        </h3>
        <span className="text-[10px] text-[#6B7280] font-mono">60+ Assets</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((item, idx) => (
          <Link key={idx} to={item.link} className="group">
            <Card hoverable className="p-4 border border-[#D4AF37]/30 bg-gradient-to-b from-[#181A22] to-[#14161D] hover:border-[#D4AF37] transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono text-[#D4AF37] font-semibold px-2 py-0.5 rounded bg-[#D4AF37]/10">
                  {item.badge}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xl font-black font-display text-[#F9FAFB] block">
                    {item.count}
                  </span>
                  <span className="text-[11px] font-medium text-[#9CA3AF] group-hover:text-[#F3D068] transition-colors">
                    {item.title}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#F3D068] group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
