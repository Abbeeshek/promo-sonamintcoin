import React from 'react';
import { Card } from '../ui/Card';
import { PlatformPublishingDistribution } from '../../types/analytics';
import { Share2, Info, Eye } from 'lucide-react';

interface PublishingActivityChartProps {
  platforms: PlatformPublishingDistribution[];
}

export const PublishingActivityChart: React.FC<PublishingActivityChartProps> = ({ platforms }) => {
  const maxCount = Math.max(...platforms.map((p) => p.count), 1);

  return (
    <Card className="p-6 border border-white/10 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
        <div>
          <h3 className="text-xs font-bold font-display text-[#F9FAFB] uppercase tracking-wider flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#F3D068]" /> Target Platform Distribution
          </h3>
          <p className="text-xs text-[#9CA3AF]">
            Promotional content dispatch distribution across social destinations
          </p>
        </div>

        <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3D068] flex items-center gap-1">
          <Eye className="w-3 h-3 text-[#F3D068]" /> SAMPLE DEMO METRICS
        </span>
      </div>

      {/* Bar Chart Visual */}
      <div className="space-y-3">
        {platforms.map((item, idx) => {
          const widthPct = Math.round((item.count / maxCount) * 100);
          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#F9FAFB] font-medium">{item.platform}</span>
                <span className="text-[#F3D068] font-mono font-bold">{item.count} Action(s)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#181A22] overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gold-gradient rounded-full transition-all duration-500"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Analytics Boundary Notice */}
      <div className="p-4 rounded-xl bg-[#181A22] border border-white/5 flex items-start gap-3 text-xs text-[#9CA3AF]">
        <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-[#F9FAFB] block mb-0.5">[DEMO DATA NOTICE] Social Metrics Boundary</span>
          <span>
            The numbers above represent sample application activity for UI review. Real-time external reach, impressions, and follower growth will stream automatically when live production social APIs are authorized.
          </span>
        </div>
      </div>
    </Card>
  );
};
