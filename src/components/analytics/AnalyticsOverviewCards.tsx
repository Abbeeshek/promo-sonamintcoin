import React from 'react';
import { Card } from '../ui/Card';
import { AnalyticsOverview } from '../../types/analytics';
import { Video, ShieldCheck, Calendar, Send } from 'lucide-react';

interface AnalyticsOverviewCardsProps {
  overview: AnalyticsOverview;
}

export const AnalyticsOverviewCards: React.FC<AnalyticsOverviewCardsProps> = ({ overview }) => {
  const cards = [
    {
      title: 'Official Brand Assets',
      value: overview.totalOfficialAssets,
      label: 'Verified catalog items',
      icon: <Video className="w-5 h-5 text-[#F3D068]" />,
    },
    {
      title: 'User Uploads Workspace',
      value: overview.totalUserUploads,
      label: `${overview.approvedUploads} approved`,
      icon: <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />,
    },
    {
      title: 'Active Scheduled Posts',
      value: overview.totalScheduledPosts,
      label: 'Upcoming publications',
      icon: <Calendar className="w-5 h-5 text-[#F3D068]" />,
    },
    {
      title: 'Publishing Log Records',
      value: overview.publishedPosts,
      label: 'Executed & simulated posts',
      icon: <Send className="w-5 h-5 text-[#D4AF37]" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <Card key={i} className="p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold font-display text-[#9CA3AF] uppercase tracking-wider">{c.title}</span>
            <div className="w-9 h-9 rounded-xl bg-[#181A22] border border-white/10 flex items-center justify-center">
              {c.icon}
            </div>
          </div>
          <div>
            <span className="text-3xl font-black font-display text-[#F9FAFB] tracking-tight block mb-1">
              {c.value}
            </span>
            <span className="text-[11px] text-[#6B7280]">{c.label}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};
