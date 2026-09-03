import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { PromotionalAsset, AssetCategory } from '../../../types/dashboard';
import { getAssetsByCategory } from '../../../data/dashboardData';
import { VideoPreviewModal } from './VideoPreviewModal';
import { DashboardEmptyState } from './DashboardEmptyState';
import { Play, Video, Image as ImageIcon, Presentation, Globe, Clock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AssetDiscoverySection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | 'all'>('all');
  const [previewVideo, setPreviewVideo] = useState<PromotionalAsset | null>(null);

  const assets = getAssetsByCategory(selectedCategory);

  const categories: { key: AssetCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'All Assets' },
    { key: 'videos', label: 'Videos' },
    { key: 'posters', label: 'Posters' },
    { key: 'presentations', label: 'Presentations' },
  ];

  const getAssetTypeIcon = (category: AssetCategory) => {
    switch (category) {
      case 'videos':
        return Video;
      case 'posters':
        return ImageIcon;
      case 'presentations':
        return Presentation;
      default:
        return FileText;
    }
  };

  const handleAssetClick = (asset: PromotionalAsset) => {
    if (asset.category === 'videos') {
      setPreviewVideo(asset);
    } else if (asset.category === 'posters') {
      navigate('/app/posters');
    } else if (asset.category === 'presentations') {
      navigate('/app/presentations');
    }
  };

  return (
    <section aria-labelledby="asset-discovery-heading" className="space-y-5">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <h2 id="asset-discovery-heading" className="text-xl font-bold font-display text-[#F9FAFB]">
            Featured Asset Discovery
          </h2>
          <p className="text-xs text-[#9CA3AF]">
            Quick preview of official Sona Mint Coin promotional materials
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 bg-[#14161D] border border-white/10 p-1 rounded-xl self-start sm:self-auto">
          {categories.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === tab.key
                  ? 'bg-[#181A22] text-[#F3D068] border border-[#D4AF37]/30 shadow-sm font-semibold'
                  : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Empty State */}
      {assets.length === 0 ? (
        <DashboardEmptyState onResetFilters={() => setSelectedCategory('all')} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {assets.map((asset) => {
            const TypeIcon = getAssetTypeIcon(asset.category);

            return (
              <Card
                key={asset.id}
                hoverable
                onClick={() => handleAssetClick(asset)}
                className="cursor-pointer flex flex-col justify-between group p-4 border border-white/10 hover:border-[#D4AF37]/40"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video rounded-xl bg-[#181A22] overflow-hidden mb-3 border border-white/5 flex items-center justify-center">
                    {asset.thumbnailPath ? (
                      <img
                        src={asset.thumbnailPath}
                        alt={asset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : null}

                    {/* Overlay Play Icon for Video */}
                    {asset.category === 'videos' && (
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-gold-gradient text-neutral-950 flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-neutral-950 ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Top Type Badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-[#F9FAFB] uppercase tracking-wider">
                      <TypeIcon className="w-3 h-3 text-[#F3D068]" />
                      <span>{asset.category}</span>
                    </div>

                    {/* Duration Badge */}
                    {asset.duration && (
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#F9FAFB]">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        <span>{asset.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Asset Title */}
                  <h3 className="text-sm font-bold font-display text-[#F9FAFB] group-hover:text-[#F3D068] transition-colors line-clamp-1 mb-1">
                    {asset.title}
                  </h3>
                </div>

                {/* Footer Metadata Tag */}
                <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#9CA3AF]">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Globe className="w-3.5 h-3.5 text-[#6B7280]" />
                    <span>{asset.language}</span>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37] group-hover:underline">
                    {asset.category === 'videos' ? 'Preview' : 'View'} &rarr;
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Video Modal Launcher */}
      <VideoPreviewModal
        asset={previewVideo}
        isOpen={!!previewVideo}
        onClose={() => setPreviewVideo(null)}
        onSelectForPost={() => navigate('/app/create-post')}
      />
    </section>
  );
};
