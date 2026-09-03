import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { PublishHistoryItem } from '../../types/publishing';
import { formatDateTime } from '../../utils/dateTime';
import { ShieldCheck } from 'lucide-react';

interface HistoryDetailModalProps {
  item: PublishHistoryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryDetailModal: React.FC<HistoryDetailModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Publishing History Record" maxWidth="md">
      <div className="space-y-5">
        {/* Header Status */}
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-green-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold font-display">Publishing Action Complete</h4>
              <p className="text-[11px] opacity-80">Execution mode: {item.mode.toUpperCase()}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-green-500/20 text-green-300 font-mono text-[10px] uppercase font-bold">
            {item.status}
          </span>
        </div>

        {/* Media Banner */}
        <div className="aspect-video rounded-xl bg-black overflow-hidden border border-white/10 flex items-center justify-center">
          {item.thumbnailPath || item.assetPath ? (
            <img src={item.thumbnailPath || item.assetPath} alt={item.assetTitle} className="w-full h-full object-contain" />
          ) : (
            <span className="text-xs text-[#9CA3AF]">Media Preview</span>
          )}
        </div>

        {/* Asset & Caption */}
        <div>
          <h4 className="text-base font-bold font-display text-[#F9FAFB] mb-1">{item.assetTitle}</h4>
          <div className="p-3 rounded-xl bg-[#181A22] border border-white/5 text-xs text-[#9CA3AF] leading-relaxed">
            {item.caption}
          </div>
        </div>

        {/* Timestamp & Info */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#181A22] border border-white/5 text-xs text-[#9CA3AF]">
          <div>
            <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">Published Timestamp</span>
            <span className="text-[#F9FAFB] font-mono font-medium">{formatDateTime(item.publishedAt)}</span>
          </div>

          <div>
            <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">External Response</span>
            <span className="text-[#9CA3AF] font-medium italic">Simulated Demo Dispatch</span>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-3 border-t border-white/10 flex justify-end">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close Inspection
          </Button>
        </div>
      </div>
    </Modal>
  );
};
