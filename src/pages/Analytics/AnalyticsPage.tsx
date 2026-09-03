import React, { useState } from 'react';
import { DateRangeFilter } from '../../types/analytics';
import {
  getAnalyticsOverview,
  getContentTypeDistribution,
  getLanguageDistribution,
  getPlatformDistribution,
} from '../../services/analyticsService';
import { AnalyticsOverviewCards } from '../../components/analytics/AnalyticsOverviewCards';
import { ContentBreakdownChart } from '../../components/analytics/ContentBreakdownChart';
import { PublishingActivityChart } from '../../components/analytics/PublishingActivityChart';
import { Calendar } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [dateFilter, setDateFilter] = useState<DateRangeFilter>('all');

  const overview = getAnalyticsOverview();
  const types = getContentTypeDistribution();
  const languages = getLanguageDistribution();
  const platforms = getPlatformDistribution();

  const filterTabs: { key: DateRangeFilter; label: string }[] = [
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' },
    { key: 'all', label: 'All Time' },
  ];

  return (
    <div className="space-y-8 animate-hero-fade">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F9FAFB]">
            Hub Analytics & Insights
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Real promotional content catalog distributions, verification workspace metrics, and publishing activity logs
          </p>
        </div>

        {/* Date Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-[#14161D] border border-white/10 p-1.5 rounded-xl">
          <Calendar className="w-4 h-4 text-[#D4AF37] ml-1 mr-0.5 shrink-0" />
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setDateFilter(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                dateFilter === tab.key
                  ? 'bg-[#181A22] text-[#F3D068] border border-[#D4AF37]/30 shadow-sm font-semibold'
                  : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview KPI Row */}
      <AnalyticsOverviewCards overview={overview} />

      {/* Charts Grid */}
      <ContentBreakdownChart types={types} languages={languages} />

      <PublishingActivityChart platforms={platforms} />
    </div>
  );
};
