import React from 'react';
import { Modal } from '../ui/Modal';
import { ContentAsset } from '../../types/assets';
import { Presentation, Download, Tag, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface ContentPreviewModalProps {
  asset: ContentAsset | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForPost?: (asset: ContentAsset) => void;
}

export const ContentPreviewModal: React.FC<ContentPreviewModalProps> = ({
  asset,
  isOpen,
  onClose,
  onSelectForPost,
}) => {
  if (!asset) return null;

  const handleWhatsAppShare = () => {
    const text = `Check out this official Sona Mint Coin promotional asset: "${asset.title}"\n${asset.description || ''}\nDiscover 24K gold backed stability!`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={asset.title} maxWidth="lg">
      <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-1">
        {/* Media Preview Container */}
        <div className="relative aspect-video rounded-2xl bg-black overflow-hidden border border-[#D4AF37]/30 flex items-center justify-center shadow-gold-glow/10">
          {asset.type === 'videos' ? (
            <video
              src={asset.path}
              controls
              poster={asset.thumbnailPath}
              className="w-full h-full object-contain"
            >
              Your browser does not support HTML5 video preview.
            </video>
          ) : asset.type === 'posters' ? (
            <img
              src={asset.path}
              alt={asset.title}
              className="w-full h-full object-contain"
            />
          ) : (
            /* Presentations Deck Preview */
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#181A22] to-[#14161D]">
              {asset.thumbnailPath && (
                <img
                  src={asset.thumbnailPath}
                  alt={asset.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm"
                />
              )}
              <div className="relative z-10 flex flex-col items-center text-center">
                <Presentation className="w-16 h-16 text-[#F3D068] mb-3 shadow-gold-glow" />
                <h4 className="text-lg font-bold font-display text-[#F9FAFB] mb-1">{asset.title}</h4>
                <span className="text-xs font-mono uppercase text-[#D4AF37] px-3 py-1 rounded-full bg-black/60 border border-white/10 mb-4">
                  {asset.fileExtension.toUpperCase()} Presentation Deck
                </span>
                <a
                  href={asset.path}
                  download={asset.title}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-gradient text-neutral-950 text-xs font-bold shadow-gold-glow hover:brightness-110"
                >
                  <Download className="w-4 h-4" /> Download Presentation
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Primary Action Buttons: Download & WhatsApp Share */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={asset.path}
            download={asset.title}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#181A22] border border-[#D4AF37]/40 text-xs font-bold text-[#F3D068] hover:bg-[#D4AF37]/10 transition-colors"
          >
            <Download className="w-4 h-4" /> Download Asset
          </a>

          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600/20 border border-green-500/40 text-xs font-bold text-green-400 hover:bg-green-600/30 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-green-400" /> Share on WhatsApp
          </button>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#181A22] border border-white/5 text-xs text-[#9CA3AF]">
          <div>
            <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">Type</span>
            <span className="text-[#F9FAFB] font-medium capitalize">{asset.type}</span>
          </div>

          <div>
            <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">Category</span>
            <span className="text-[#F9FAFB] font-medium">{asset.category}</span>
          </div>

          <div>
            <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">Language</span>
            <span className="text-[#F9FAFB] font-medium">{asset.language}</span>
          </div>

          <div>
            <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">Format</span>
            <span className="text-[#F9FAFB] font-mono font-medium uppercase">{asset.fileExtension}</span>
          </div>
        </div>

        {/* Description & Tags */}
        {asset.description && (
          <div className="text-xs text-[#9CA3AF] space-y-2">
            <h5 className="font-semibold text-[#F9FAFB]">Description</h5>
            <p className="leading-relaxed bg-[#181A22]/60 p-3.5 rounded-xl border border-white/5 text-[#F9FAFB]">
              {asset.description}
            </p>
          </div>
        )}

        {asset.tags && asset.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <Tag className="w-3.5 h-3.5 text-[#6B7280]" />
            {asset.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-[#D4AF37] border border-[#D4AF37]/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close Preview
          </Button>

          {onSelectForPost && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onSelectForPost(asset);
                onClose();
              }}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Select for Post
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
