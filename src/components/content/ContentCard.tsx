import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { ContentAsset, ContentType } from '../../types/assets';
import { Play, Video, Image as ImageIcon, Presentation, Globe, Clock, FileText } from 'lucide-react';

interface ContentCardProps {
  asset: ContentAsset;
  onSelect: (asset: ContentAsset) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({ asset, onSelect }) => {
  const [imgError, setImgError] = useState(false);

  const getTypeIcon = (type: ContentType) => {
    switch (type) {
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

  const TypeIcon = getTypeIcon(asset.type);

  // Determine media display mode
  const imageSource = asset.thumbnailPath || (asset.type === 'posters' ? asset.path : undefined);

  return (
    <Card
      hoverable
      onClick={() => onSelect(asset)}
      className="cursor-pointer flex flex-col justify-between group p-4 border border-white/10 hover:border-[#D4AF37]/50 bg-[#14161D]"
    >
      <div>
        {/* Media Thumbnail Container */}
        <div className="relative aspect-video rounded-xl bg-[#0A0B0E] overflow-hidden mb-3 border border-white/10 flex items-center justify-center">
          {imageSource && !imgError ? (
            <img
              src={imageSource}
              alt={asset.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : asset.type === 'videos' ? (
            /* HTML5 Video Thumbnail Snapshot Fallback */
            <video
              src={`${asset.path}#t=0.5`}
              preload="metadata"
              muted
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            /* Styled Fallback Graphic */
            <div className="flex flex-col items-center justify-center p-4 text-center text-[#6B7280]">
              <TypeIcon className="w-8 h-8 mb-1 text-[#F3D068]" />
              <span className="text-[10px] font-mono uppercase tracking-wider">{asset.fileExtension}</span>
            </div>
          )}

          {/* Overlay Play Indicator for Videos */}
          {asset.type === 'videos' && (
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gold-gradient text-neutral-950 flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-neutral-950 ml-0.5" />
              </div>
            </div>
          )}

          {/* Type Badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-[#F9FAFB] uppercase tracking-wider">
            <TypeIcon className="w-3 h-3 text-[#F3D068]" />
            <span>{asset.type}</span>
          </div>

          {/* Duration Badge */}
          {asset.duration && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#F9FAFB]">
              <Clock className="w-3 h-3 text-[#D4AF37]" />
              <span>{asset.duration}</span>
            </div>
          )}
        </div>

        {/* Title & Category */}
        <h3 className="text-sm font-bold font-display text-[#F9FAFB] group-hover:text-[#F3D068] transition-colors line-clamp-1 mb-1">
          {asset.title}
        </h3>
        <p className="text-[11px] text-[#6B7280] line-clamp-1 mb-2">
          {asset.category}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#9CA3AF]">
        <div className="flex items-center gap-1.5 text-[11px]">
          <Globe className="w-3 h-3 text-[#6B7280]" />
          <span>{asset.language}</span>
        </div>

        <span className="text-[11px] font-semibold text-[#D4AF37] group-hover:translate-x-0.5 transition-transform">
          PREVIEW &rarr;
        </span>
      </div>
    </Card>
  );
};
