import React, { useState } from 'react';
import { OFFICIAL_ASSETS } from '../../data/assetsCatalog';
import { ContentAsset, FilterState, Language } from '../../types/assets';
import { ContentToolbar } from '../../components/content/ContentToolbar';
import { ContentCard } from '../../components/content/ContentCard';
import { ContentPreviewModal } from '../../components/content/ContentPreviewModal';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Presentation, Folder, ArrowLeft, Globe, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DeckFolder {
  id: string;
  name: string;
  languageKey: Language;
  description: string;
  icon: React.ReactNode;
  coverImage: string;
}

export const PresentationsPage: React.FC = () => {
  const navigate = useNavigate();

  const allPresentations = OFFICIAL_ASSETS.filter((a) => a.type === 'presentations');

  // 3 Multilingual Presentation Deck Collections matching workspace file system structure
  const collections: DeckFolder[] = [
    {
      id: 'folder-en',
      name: 'English Presentation Decks',
      languageKey: 'English',
      description: 'Official Sona Mint Coin business plan decks and PDF presentations in English.',
      icon: <Globe className="w-6 h-6 text-[#F3D068]" />,
      coverImage: '/Posters/Profit Sharing - Club Membership/English/WhatsApp Image 2026-08-17 at 13.17.35.jpeg',
    },
    {
      id: 'folder-hi',
      name: 'Hindi Presentation Decks',
      languageKey: 'Hindi',
      description: 'Official business plan presentation slides and PDF decks in Hindi.',
      icon: <FileText className="w-6 h-6 text-[#D4AF37]" />,
      coverImage: '/Posters/Profit Sharing - Club Membership/Hindi/WhatsApp Image 2026-08-17 at 13.17.36.jpeg',
    },
    {
      id: 'folder-ta',
      name: 'Tamil Presentation Decks',
      languageKey: 'Tamil',
      description: 'Official business plan presentation slides and PDF decks in Tamil.',
      icon: <Presentation className="w-6 h-6 text-[#F3D068]" />,
      coverImage: '/Posters/Profit Sharing - Club Membership/Tamil/WhatsApp Image 2026-08-17 at 13.17.37.jpeg',
    },
  ];

  // Filtering state
  const [selectedFolder, setSelectedFolder] = useState<DeckFolder | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    type: 'presentations',
    language: 'all',
    category: 'all',
    sort: 'az',
  });

  // Modal State
  const [previewAsset, setPreviewAsset] = useState<ContentAsset | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setSelectedFolder(null);
    setFilters({
      query: '',
      type: 'presentations',
      language: 'all',
      category: 'all',
      sort: 'az',
    });
  };

  // Apply filters
  const filteredPresentations = allPresentations.filter((ppt) => {
    // Selected folder language filter
    if (selectedFolder && ppt.language !== selectedFolder.languageKey) {
      return false;
    }

    // Language dropdown filter
    if (filters.language !== 'all' && ppt.language !== filters.language) {
      return false;
    }

    // Category dropdown filter
    if (filters.category !== 'all' && ppt.category !== filters.category) {
      return false;
    }

    // Search query
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      const titleMatch = ppt.title.toLowerCase().includes(q);
      const descMatch = ppt.description?.toLowerCase().includes(q);
      const tagMatch = ppt.tags?.some((t) => t.toLowerCase().includes(q));
      if (!titleMatch && !descMatch && !tagMatch) return false;
    }

    return true;
  });

  // Sort
  const sortedPresentations = [...filteredPresentations].sort((a, b) => {
    if (filters.sort === 'za') return b.title.localeCompare(a.title);
    return a.title.localeCompare(b.title);
  });

  const handleOpenPreview = (asset: ContentAsset) => {
    setPreviewAsset(asset);
    setIsPreviewOpen(true);
  };

  const handleSelectForPost = (asset: ContentAsset) => {
    navigate(`/app/create-post?assetId=${asset.id}`);
  };

  const activeFilterCount =
    (filters.query ? 1 : 0) +
    (filters.language !== 'all' || selectedFolder !== null ? 1 : 0) +
    (filters.category !== 'all' ? 1 : 0);

  const isSearchActive = !!filters.query.trim() || filters.language !== 'all' || selectedFolder !== null;

  return (
    <div className="space-y-8 animate-hero-fade min-h-[85vh] flex flex-col justify-between">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F9FAFB] flex items-center gap-2.5">
              <Presentation className="w-7 h-7 text-[#F3D068]" /> Official Presentation Deck Library
            </h1>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              Select a presentation deck collection or search across all official presentation files ({allPresentations.length} total)
            </p>
          </div>

          {selectedFolder && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedFolder(null)}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Presentation Collections
            </Button>
          )}
        </div>

        {/* 1. TOP SEARCH TOOLBAR */}
        <ContentToolbar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          activeFilterCount={activeFilterCount}
        />

        {/* 2. MAIN PAGE BODY: 3 MULTILINGUAL PRESENTATION DECK COLLECTION HERO CARDS */}
        {!isSearchActive && (
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold font-display text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                <Folder className="w-4 h-4 text-[#F3D068]" /> Presentation Deck Collections
              </h2>
              <span className="text-xs text-[#6B7280]">Select a language deck to view presentation files</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {collections.map((folder) => {
                const count = allPresentations.filter((p) => p.language === folder.languageKey).length;
                return (
                  <Card
                    key={folder.id}
                    hoverable
                    onClick={() => setSelectedFolder(folder)}
                    className="relative overflow-hidden p-7 sm:p-8 border-2 border-[#D4AF37]/40 bg-gradient-to-br from-[#181A22] via-[#1A1D27] to-[#14161D] hover:border-[#D4AF37] transition-all cursor-pointer flex flex-col justify-between min-h-[220px] group shadow-2xl shadow-gold-glow/15"
                  >
                    {/* Gold Flare Background */}
                    <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-[#0A0B0E] border-2 border-[#D4AF37]/50 flex items-center justify-center shadow-gold-glow/20">
                          {folder.icon}
                        </div>
                        <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#F3D068]">
                          {count} Deck(s)
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold font-display text-[#F9FAFB] mb-2 group-hover:text-[#F3D068] transition-colors">
                        {folder.name}
                      </h3>
                      <p className="text-xs text-[#9CA3AF] leading-relaxed">
                        {folder.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-[#F3D068] group-hover:underline">
                      <span>Explore Presentation Files</span>
                      <ArrowRight className="w-4 h-4 text-[#F3D068] group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. ACTIVE COLLECTION / SEARCH RESULTS PRESENTATION GRID */}
        {isSearchActive && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#181A22] via-[#1A1D27] to-[#181A22] border border-[#D4AF37]/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#F3D068]">
                  {selectedFolder ? selectedFolder.icon : <Presentation className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-base font-bold font-display text-[#F9FAFB]">
                    {selectedFolder ? selectedFolder.name : 'Search Results'}
                  </h2>
                  <p className="text-xs text-[#9CA3AF]">
                    {selectedFolder ? selectedFolder.description : `Showing ${sortedPresentations.length} presentation deck(s)`}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Collections
              </Button>
            </div>

            {sortedPresentations.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#9CA3AF] bg-[#181A22] rounded-2xl border border-white/5">
                No presentation decks found in this collection or search criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {sortedPresentations.map((ppt) => (
                  <ContentCard
                    key={ppt.id}
                    asset={ppt}
                    onSelect={handleOpenPreview}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Presentation Preview Modal */}
      <ContentPreviewModal
        asset={previewAsset}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onSelectForPost={handleSelectForPost}
      />
    </div>
  );
};
