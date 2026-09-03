import React from 'react';
import { Card } from '../ui/Card';
import { ContentTypeDistribution, LanguageDistribution } from '../../types/analytics';

interface ContentBreakdownChartProps {
  types: ContentTypeDistribution[];
  languages: LanguageDistribution[];
}

export const ContentBreakdownChart: React.FC<ContentBreakdownChartProps> = ({ types, languages }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Content Type Breakdown */}
      <Card className="p-6 border border-white/10 space-y-4">
        <h3 className="text-xs font-bold font-display text-[#F9FAFB] uppercase tracking-wider">
          Content Type Distribution
        </h3>

        <div className="space-y-4">
          {types.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-[#F9FAFB]">{item.type}</span>
                <span className="text-[#D4AF37] font-mono font-bold">{item.count} items ({item.percentage}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#181A22] overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gold-gradient rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Language Breakdown */}
      <Card className="p-6 border border-white/10 space-y-4">
        <h3 className="text-xs font-bold font-display text-[#F9FAFB] uppercase tracking-wider">
          Language Distribution
        </h3>

        <div className="space-y-4">
          {languages.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-[#F9FAFB]">{item.language}</span>
                <span className="text-[#F3D068] font-mono font-bold">{item.count} items ({item.percentage}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#181A22] overflow-hidden border border-white/5">
                <div
                  className="h-full bg-[#D4AF37] rounded-full transition-all duration-500 opacity-80"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
