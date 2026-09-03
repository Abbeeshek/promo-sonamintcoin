import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { PromotionalAsset } from '../../../types/dashboard';
import { Video, Globe, Clock, Film } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface VideoPreviewModalProps {
  asset: PromotionalAsset | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForPost?: (asset: PromotionalAsset) => void;
}

export const VideoPreviewModal: React.FC<VideoPreviewModalProps> = ({
  asset,
  isOpen,
  onClose,
  onSelectForPost,
}) => {
  if (!asset) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={asset.title} maxWidth="lg">
      <div className="space-y-5">
        {/* Video Player / Poster Display */}
        <div className="relative aspect-video rounded-xl bg-black overflow-hidden border border-white/10 flex items-center justify-center">
          {asset.path ? (
            <video
              src={asset.path}
              controls
              poster={asset.thumbnailPath}
              className="w-full h-full object-contain"
            >
              Your browser does not support HTML5 video preview.
            </video>
          ) : (
            <div className="flex flex-col items-center text-[#9CA3AF]">
              <Film className="w-12 h-12 mb-2 text-[#D4AF37]" />
              <span className="text-xs">Preview unavailable</span>
            </div>
          )}
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#181A22] border border-white/5 text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-[#F3D068]" />
            <div>
              <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">Type</span>
              <span className="text-[#F9FAFB] capitalize">{asset.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#F3D068]" />
            <div>
              <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">Language</span>
              <span className="text-[#F9FAFB]">{asset.language}</span>
            </div>
          </div>

          {asset.duration && (
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Clock className="w-4 h-4 text-[#F3D068]" />
              <div>
                <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">Duration</span>
                <span className="text-[#F9FAFB]">{asset.duration}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
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
            >
              Use in Create Post
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
