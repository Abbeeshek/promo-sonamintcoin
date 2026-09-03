import React, { useState } from 'react';
import { PublishHistoryItem, HistoryStatus } from '../../types/publishing';
import { getPublishingHistory } from '../../services/publishingService';
import { HistoryTable } from '../../components/history/HistoryTable';
import { HistoryDetailModal } from '../../components/history/HistoryDetailModal';
import { Search, ShieldCheck, X } from 'lucide-react';

export const PublishingHistoryPage: React.FC = () => {
  const [historyItems] = useState<PublishHistoryItem[]>(getPublishingHistory());
  const [statusFilter, setStatusFilter] = useState<HistoryStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedEntry, setSelectedEntry] = useState<PublishHistoryItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleSelectEntry = (item: PublishHistoryItem) => {
    setSelectedEntry(item);
    setIsDetailModalOpen(true);
  };

  const filteredItems = historyItems.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const titleMatch = item.assetTitle.toLowerCase().includes(q);
      const captionMatch = item.caption.toLowerCase().includes(q);
      if (!titleMatch && !captionMatch) return false;
    }
    return true;
  });

  const filterTabs: { key: HistoryStatus | 'all'; label: string }[] = [
    { key: 'all', label: 'All Records' },
    { key: 'simulated', label: 'Simulated' },
    { key: 'published', label: 'Published' },
    { key: 'failed', label: 'Failed' },
  ];

  return (
    <div className="space-y-6 animate-hero-fade">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F9FAFB]">
            Publishing History Log
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Comprehensive record of all executed and simulated social promotional publishing actions ({historyItems.length} total)
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181A22] border border-white/10 text-xs text-[#F3D068]">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>Local Persistence Active</span>
        </div>
      </div>

      {/* Toolbar (Search & Filter Tabs) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#14161D] border border-white/10 p-4 rounded-2xl">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by caption or title..."
            className="w-full bg-[#181A22] border border-white/10 rounded-xl pl-10 pr-8 py-2 text-xs text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#D4AF37]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#F9FAFB]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 bg-[#181A22] border border-white/10 p-1 rounded-xl">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === tab.key
                  ? 'bg-[#14161D] text-[#F3D068] border border-[#D4AF37]/30 shadow-sm font-semibold'
                  : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* History Log Table */}
      <HistoryTable
        historyItems={filteredItems}
        onSelectEntry={handleSelectEntry}
      />

      {/* Detail Inspection Modal */}
      <HistoryDetailModal
        item={selectedEntry}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
};
