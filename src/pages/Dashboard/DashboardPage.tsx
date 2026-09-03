import React from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import { ContentOverviewGrid } from './components/ContentOverviewGrid';
import { PrimaryActionsArea } from './components/PrimaryActionsArea';
import { OverviewPanel } from './components/OverviewPanel';
import { getAssetCounts } from '../../data/dashboardData';

export const DashboardPage: React.FC = () => {
  const counts = getAssetCounts();

  return (
    <div className="space-y-8 animate-hero-fade relative overflow-hidden">
      {/* Background Radiant Gold Flares for Dynamic Atmosphere */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#F3D068]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Dynamic Time-of-Day Header */}
      <DashboardHeader />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column (8 cols): Primary Actions (~70%) + Compact Catalog Summary (~30%) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Prominent High Priority Actions Area */}
          <PrimaryActionsArea />

          {/* Compact Catalog Summary Bar */}
          <ContentOverviewGrid
            videosCount={counts.videos}
            postersCount={counts.posters}
            presentationsCount={counts.presentations}
          />
        </div>

        {/* Right Column (4 cols): Overview Panel */}
        <div className="lg:col-span-4 sticky top-24">
          <OverviewPanel />
        </div>
      </div>
    </div>
  );
};
