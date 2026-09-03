import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ScheduledPost } from '../../types/scheduling';
import { formatDate, formatTime } from '../../utils/dateTime';
import { Edit3, XCircle, Trash2 } from 'lucide-react';

interface ScheduledPostModalProps {
  post: ScheduledPost | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (post: ScheduledPost) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ScheduledPostModal: React.FC<ScheduledPostModalProps> = ({
  post,
  isOpen,
  onClose,
  onEdit,
  onCancel,
  onDelete,
}) => {
  if (!post) return null;

  const isCancelled = post.status === 'cancelled';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Scheduled Post Details" maxWidth="md">
      <div className="space-y-5">
        {/* Media Preview Container */}
        <div className="aspect-video rounded-xl bg-black overflow-hidden border border-white/10 flex items-center justify-center">
          {post.thumbnailPath || post.assetPath ? (
            <img src={post.thumbnailPath || post.assetPath} alt={post.assetTitle} className="w-full h-full object-contain" />
          ) : (
            <div className="text-xs text-[#9CA3AF]">Media Preview</div>
          )}
        </div>

        {/* Title & Status */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-display text-[#F9FAFB]">{post.assetTitle}</h3>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
              isCancelled
                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}
          >
            {post.status.toUpperCase()}
          </span>
        </div>

        {/* Caption */}
        <div className="p-3 rounded-xl bg-[#181A22] border border-white/5 text-xs text-[#F9FAFB] leading-relaxed font-sans">
          {post.caption}
        </div>

        {/* Schedule Timing & Timezone Details */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#181A22] border border-white/5 text-xs text-[#9CA3AF]">
          <div>
            <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">Scheduled Date</span>
            <span className="text-[#F9FAFB] font-medium">{formatDate(post.scheduledAt)}</span>
          </div>

          <div>
            <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">Time & Timezone</span>
            <span className="text-[#F3D068] font-mono font-medium">{formatTime(post.scheduledAt)} ({post.timezone})</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <button
            onClick={() => { onDelete(post.id); onClose(); }}
            className="text-xs text-[#6B7280] hover:text-red-400 flex items-center gap-1 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Record
          </button>

          <div className="flex items-center gap-2">
            {!isCancelled && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { onCancel(post.id); onClose(); }}
                  icon={<XCircle className="w-3.5 h-3.5 text-amber-400" />}
                >
                  Cancel Schedule
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => { onClose(); onEdit(post); }}
                  icon={<Edit3 className="w-3.5 h-3.5" />}
                >
                  Edit Schedule
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
