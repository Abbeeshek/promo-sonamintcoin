import React from 'react';
import { Card } from '../ui/Card';
import { SocialAccount } from '../../types/publishing';
import { ContentAsset } from '../../types/assets';
import { UserUpload } from '../../types/upload';
import { Share2, Globe, Heart, MessageCircle, Send } from 'lucide-react';

interface PostPreviewCardProps {
  asset: ContentAsset | UserUpload | null;
  caption: string;
  hashtags: string[];
  selectedAccounts: SocialAccount[];
}

export const PostPreviewCard: React.FC<PostPreviewCardProps> = ({
  asset,
  caption,
  hashtags,
  selectedAccounts,
}) => {
  const activeAccount = selectedAccounts[0];
  const fullCaption = `${caption} ${hashtags.join(' ')}`.trim();

  return (
    <Card className="p-5 border border-white/10 relative overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
        <span className="text-xs font-bold font-display text-[#F3D068] uppercase tracking-wider flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5" /> Social Post Preview
        </span>
        <span className="text-[10px] text-[#6B7280] font-mono uppercase">
          {activeAccount ? activeAccount.platformName : 'Select Platform'}
        </span>
      </div>

      {/* Account Info Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-gold-gradient p-0.5 shadow-gold-glow">
          <div className="w-full h-full rounded-full bg-[#0A0B0E] flex items-center justify-center font-bold text-[10px] text-[#F3D068]">
            SMC
          </div>
        </div>
        <div>
          <span className="text-xs font-bold text-[#F9FAFB] block">
            {activeAccount ? activeAccount.displayName : 'Sona Mint Coin Official'}
          </span>
          <span className="text-[10px] text-[#9CA3AF]">
            {activeAccount ? activeAccount.handle : '@sonamintcoin'} &bull; Just now
          </span>
        </div>
      </div>

      {/* Asset Media Preview */}
      <div className="aspect-video rounded-xl bg-black overflow-hidden border border-white/10 mb-3 flex items-center justify-center">
        {asset ? (
          'contentType' in asset && asset.contentType === 'videos' ? (
            <video src={asset.path} className="w-full h-full object-contain" />
          ) : 'type' in asset && asset.type === 'videos' ? (
            <video src={asset.path} className="w-full h-full object-contain" />
          ) : (
            <img src={asset.path} alt="Post preview" className="w-full h-full object-cover" />
          )
        ) : (
          <div className="text-xs text-[#6B7280]">Select media asset to preview</div>
        )}
      </div>

      {/* Caption Text */}
      <div className="text-xs text-[#F9FAFB] leading-relaxed mb-4 whitespace-pre-wrap font-sans">
        {fullCaption || <span className="text-[#6B7280] italic">Caption preview will appear here...</span>}
      </div>

      {/* Demo Action Icons Footer */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[#9CA3AF] text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" /> <span className="text-[10px]">Like</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" /> <span className="text-[10px]">Comment</span>
          </div>
          <div className="flex items-center gap-1">
            <Send className="w-4 h-4" /> <span className="text-[10px]">Share</span>
          </div>
        </div>
        <Globe className="w-3.5 h-3.5 text-[#6B7280]" />
      </div>
    </Card>
  );
};
