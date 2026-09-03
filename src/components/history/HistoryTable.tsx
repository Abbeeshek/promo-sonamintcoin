import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { PublishHistoryItem } from '../../types/publishing';
import { formatDateTime } from '../../utils/dateTime';
import { ShieldCheck, CheckCircle2, Eye } from 'lucide-react';

interface HistoryTableProps {
  historyItems: PublishHistoryItem[];
  onSelectEntry: (item: PublishHistoryItem) => void;
}

export const HistoryTable: React.FC<HistoryTableProps> = ({
  historyItems,
  onSelectEntry,
}) => {
  if (historyItems.length === 0) {
    return (
      <Card className="p-12 text-center border-dashed border-white/10 flex flex-col items-center">
        <ShieldCheck className="w-10 h-10 text-[#D4AF37] mb-3" />
        <h4 className="text-base font-bold font-display text-[#F9FAFB] mb-1">
          No Publishing Records Found
        </h4>
        <p className="text-xs text-[#9CA3AF] max-w-xs leading-relaxed">
          There are no social publishing logs matching your current filter criteria.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10 bg-[#14161D]">
        <table className="w-full text-left text-xs text-[#9CA3AF]">
          <thead className="bg-[#181A22] text-[#6B7280] uppercase text-[10px] font-semibold tracking-wider border-b border-white/10">
            <tr>
              <th className="px-4 py-3.5">Asset</th>
              <th className="px-4 py-3.5">Caption Preview</th>
              <th className="px-4 py-3.5">Destinations</th>
              <th className="px-4 py-3.5">Published At</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {historyItems.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-semibold text-[#F9FAFB]">
                  {item.assetTitle}
                </td>
                <td className="px-4 py-3 max-w-xs truncate text-[#9CA3AF]">
                  {item.caption}
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-[#F3D068]">
                  {item.platformIds.length} Platform(s)
                </td>
                <td className="px-4 py-3 text-[11px] font-mono text-[#9CA3AF]">
                  {formatDateTime(item.publishedAt)}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-semibold uppercase">
                    <CheckCircle2 className="w-3 h-3" /> {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => onSelectEntry(item)} icon={<Eye className="w-3.5 h-3.5" />}>
                    Inspect
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden space-y-3">
        {historyItems.map((item) => (
          <Card key={item.id} hoverable className="p-4 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#F9FAFB]">{item.assetTitle}</span>
              <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-mono font-semibold uppercase">
                {item.status}
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] line-clamp-2">{item.caption}</p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#6B7280]">
              <span>{formatDateTime(item.publishedAt)}</span>
              <Button variant="ghost" size="sm" onClick={() => onSelectEntry(item)}>
                Inspect
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
