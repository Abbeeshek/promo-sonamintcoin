import React from 'react';
import { Hash } from 'lucide-react';

interface CaptionComposerProps {
  caption: string;
  onChangeCaption: (val: string) => void;
  hashtags: string[];
  onToggleHashtag: (tag: string) => void;
}

export const CaptionComposer: React.FC<CaptionComposerProps> = ({
  caption,
  onChangeCaption,
  hashtags,
  onToggleHashtag,
}) => {
  const suggestedHashtags = [
    '#SonaMintCoin',
    '#DigitalGold',
    '#24KGold',
    '#GoldBacked',
    '#FutureOfInvestment',
    '#PromotionalHub',
    '#GlobalCommunity',
  ];

  const charCount = caption.length;
  const maxChar = 2200;

  return (
    <div className="space-y-4 bg-[#14161D] border border-white/10 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold font-display text-[#F9FAFB] uppercase tracking-wider flex items-center gap-2">
          <span>Post Caption</span>
          <span className="text-[10px] text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20 font-normal">
            Composer
          </span>
        </label>
        <span className="text-[11px] font-mono text-[#6B7280]">
          {charCount} / {maxChar}
        </span>
      </div>

      <textarea
        rows={6}
        value={caption}
        onChange={(e) => onChangeCaption(e.target.value)}
        placeholder="Write a compelling promotional caption for Sona Mint Coin..."
        className="w-full bg-[#181A22] border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#D4AF37]/60 leading-relaxed resize-none"
      />

      {/* Suggested Hashtag Chips */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#9CA3AF] mb-2">
          <Hash className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Recommended Tags (Click to add):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {suggestedHashtags.map((tag) => {
            const isAdded = hashtags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onToggleHashtag(tag)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  isAdded
                    ? 'bg-gold-gradient text-neutral-950 font-bold shadow-sm'
                    : 'bg-[#181A22] text-[#9CA3AF] hover:text-[#F9FAFB] border border-white/10'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
