import React from 'react';
import { FilterState, ContentType, Language, Category, SortOption } from '../../types/assets';
import { getAvailableLanguages, getAvailableCategories } from '../../data/dashboardData';
import { Search, X, Filter, RotateCcw } from 'lucide-react';

interface ContentToolbarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export const ContentToolbar: React.FC<ContentToolbarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  activeFilterCount,
}) => {
  const languages = getAvailableLanguages();
  const categories = getAvailableCategories();

  const typeTabs: { key: ContentType | 'all'; label: string }[] = [
    { key: 'all', label: 'All Content' },
    { key: 'videos', label: 'Videos' },
    { key: 'posters', label: 'Posters' },
    { key: 'presentations', label: 'Presentations' },
  ];

  return (
    <div className="space-y-4 bg-[#14161D] border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
      {/* Top Search & Type Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.query}
            onChange={(e) => onFilterChange({ query: e.target.value })}
            placeholder="Search by title, tag, or category..."
            className="w-full bg-[#181A22] border border-white/10 rounded-xl pl-10 pr-9 py-2 text-xs text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
          />
          {filters.query && (
            <button
              onClick={() => onFilterChange({ query: '' })}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#F9FAFB]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Content Type Tabs */}
        <div className="flex items-center gap-1 bg-[#181A22] border border-white/10 p-1 rounded-xl overflow-x-auto">
          {typeTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onFilterChange({ type: tab.key })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                filters.type === tab.key
                  ? 'bg-[#14161D] text-[#F3D068] border border-[#D4AF37]/40 font-semibold shadow-sm'
                  : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Filter Dropdowns & Active Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06]">
        <div className="flex flex-wrap items-center gap-3">
          {/* Language Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Language:</span>
            <select
              value={filters.language}
              onChange={(e) => onFilterChange({ language: e.target.value as Language | 'all' })}
              className="bg-[#181A22] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#D4AF37]/50"
            >
              <option value="all">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Category:</span>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value as Category | 'all' })}
              className="bg-[#181A22] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#D4AF37]/50"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Sort:</span>
            <select
              value={filters.sort}
              onChange={(e) => onFilterChange({ sort: e.target.value as SortOption })}
              className="bg-[#181A22] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#D4AF37]/50"
            >
              <option value="az">Title (A-Z)</option>
              <option value="za">Title (Z-A)</option>
              <option value="type">Content Type</option>
            </select>
          </div>
        </div>

        {/* Active Filter Counter & Clear Button */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-[10px] font-semibold text-[#F3D068] border border-[#D4AF37]/30">
              <Filter className="w-3 h-3" /> {activeFilterCount} Active
            </span>
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#9CA3AF] hover:text-[#F9FAFB] hover:underline"
            >
              <RotateCcw className="w-3 h-3" /> Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
