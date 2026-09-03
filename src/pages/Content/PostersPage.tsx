import React, { useState } from 'react';
import { OFFICIAL_ASSETS } from '../../data/assetsCatalog';
import { ContentAsset, FilterState, Category } from '../../types/assets';
import { ContentToolbar } from '../../components/content/ContentToolbar';
import { ContentCard } from '../../components/content/ContentCard';
import { ContentPreviewModal } from '../../components/content/ContentPreviewModal';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Image as ImageIcon, Folder, ArrowLeft, Layers, ShieldCheck, Zap, Building, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PosterFolder {
  id: string;
  name: string;
  categoryKey: Category;
  description: string;
  icon: React.ReactNode;
  coverImage: string;
}

export const PostersPage: React.FC = () => {
  const navigate = useNavigate();

  const allPosters = OFFICIAL_ASSETS.filter((a) => a.type === 'posters');

  // 6 Promotional Poster Collections matching workspace file system structure
  const collections: PosterFolder[] = [
    {
      id: 'folder-plan',
      name: 'Sonamintcoin Plan Posters',
      categoryKey: 'Sonamintcoin Plan',
      description: 'Official core business plan visual graphics and explanatory posters.',
      icon: <Layers className="w-6 h-6 text-[#F3D068]" />,
      coverImage: '/Posters/Sonamintcoin Plan/WhatsApp Image 2026-08-17 at 13.17.58.jpeg',
    },
    {
      id: 'folder-profit',
      name: 'Profit Sharing & Club Membership',
      categoryKey: 'Club Membership',
      description: 'Executive club membership benefit graphics and profit sharing posters.',
      icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
      coverImage: '/Posters/Profit Sharing - Club Membership/English/WhatsApp Image 2026-08-17 at 13.17.34.jpeg',
    },
    {
      id: 'folder-[#14161D]',
      name: 'Double Dhamaka Campaign',
      categoryKey: 'Double Damaka',
      description: 'Double rewards promotion banners, bonus graphics, and campaign posters.',
      icon: <Zap className="w-6 h-6 text-[#F3D068]" />,
      coverImage: '/Posters/Double Damaka/WhatsApp Image 2026-08-17 at 13.17.27 (1).jpeg',
    },
    {
      id: 'folder-prpc',
      name: 'PRPC Headquarters & Infrastructure',
      categoryKey: 'PRPC',
      description: 'Operational office showcase graphics and infrastructure posters.',
      icon: <Building className="w-6 h-6 text-[#D4AF37]" />,
      coverImage: '/Posters/PRPC/WhatsApp Image 2026-08-17 at 13.17.27.jpeg',
    },
    {
      id: 'folder-nwg',
      name: 'NWG Network Graphics',
      categoryKey: 'NWG',
      description: 'Network growth and community promotional posters.',
      icon: <Globe className="w-6 h-6 text-[#F3D068]" />,
      coverImage: '/Posters/nwg/WhatsApp Image 2026-08-17 at 13.17.27 (2).jpeg',
    },
    {
      id: 'folder-exchanges',
      name: 'Bitlaance & Own Exchange',
      categoryKey: 'Exchanges',
      description: 'Exchange listing, trading platform, and launch announcement posters.',
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
      coverImage: '/Posters/Bitlaance - Own Exchange/WhatsApp Image 2026-08-17 at 13.17.28 (1).jpeg',
    },
  ];

  // Filtering state
  const [selectedFolder, setSelectedFolder] = useState<PosterFolder | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    type: 'posters',
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
      type: 'posters',
      language: 'all',
      category: 'all',
      sort: 'az',
    });
  };

  // Apply filters
  const filteredPosters = allPosters.filter((poster) => {
    // Selected folder filter
    if (selectedFolder && poster.category !== selectedFolder.categoryKey) {
      return false;
    }

    // Category dropdown filter
    if (filters.category !== 'all' && poster.category !== filters.category) {
      return false;
    }

    // Language filter
    if (filters.language !== 'all' && poster.language !== filters.language) {
      return false;
    }

    // Search query
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      const titleMatch = poster.title.toLowerCase().includes(q);
      const descMatch = poster.description?.toLowerCase().includes(q);
      const tagMatch = poster.tags?.some((t) => t.toLowerCase().includes(q));
      if (!titleMatch && !descMatch && !tagMatch) return false;
    }

    return true;
  });

  // Sort
  const sortedPosters = [...filteredPosters].sort((a, b) => {
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
    (filters.language !== 'all' ? 1 : 0) +
    (filters.category !== 'all' || selectedFolder !== null ? 1 : 0);

  const isSearchActive = !!filters.query.trim() || filters.language !== 'all' || selectedFolder !== null;

  return (
    <div className="space-y-8 animate-hero-fade min-h-[85vh] flex flex-col justify-between">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F9FAFB] flex items-center gap-2.5">
              <ImageIcon className="w-7 h-7 text-[#F3D068]" /> Official Poster Graphic Library
            </h1>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              Select a poster category or search across all official promotional posters ({allPosters.length} total)
            </p>
          </div>

          {selectedFolder && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedFolder(null)}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Poster Collections
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

        {/* 2. MAIN PAGE BODY: 6 LARGE PROMOTIONAL POSTER COLLECTION HERO CARDS */}
        {!isSearchActive && (
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold font-display text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                <Folder className="w-4 h-4 text-[#F3D068]" /> Promotional Poster Collections
              </h2>
              <span className="text-xs text-[#6B7280]">Select a collection card to list posters</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((folder) => {
                const count = allPosters.filter((p) => p.category === folder.categoryKey).length;
                return (
                  <Card
                    key={folder.id}
                    hoverable
                    onClick={() => setSelectedFolder(folder)}
                    className="relative overflow-hidden p-6 sm:p-7 border-2 border-[#D4AF37]/40 bg-gradient-to-br from-[#181A22] via-[#1A1D27] to-[#14161D] hover:border-[#D4AF37] transition-all cursor-pointer flex flex-col justify-between min-h-[220px] group shadow-2xl shadow-gold-glow/15"
                  >
                    {/* Gold Flare Background */}
                    <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#0A0B0E] border-2 border-[#D4AF37]/50 flex items-center justify-center shadow-gold-glow/20">
                          {folder.icon}
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#F3D068]">
                          {count} Posters
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
                      <span>Explore Collection Posters</span>
                      <ArrowRight className="w-4 h-4 text-[#F3D068] group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. ACTIVE COLLECTION / SEARCH RESULTS POSTER GRID */}
        {isSearchActive && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#181A22] via-[#1A1D27] to-[#181A22] border border-[#D4AF37]/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#F3D068]">
                  {selectedFolder ? selectedFolder.icon : <ImageIcon className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-base font-bold font-display text-[#F9FAFB]">
                    {selectedFolder ? selectedFolder.name : 'Search Results'}
                  </h2>
                  <p className="text-xs text-[#9CA3AF]">
                    {selectedFolder ? selectedFolder.description : `Showing ${sortedPosters.length} poster(s)`}
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

            {sortedPosters.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#9CA3AF] bg-[#181A22] rounded-2xl border border-white/5">
                No posters found in this collection or search criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {sortedPosters.map((poster) => (
                  <ContentCard
                    key={poster.id}
                    asset={poster}
                    onSelect={handleOpenPreview}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Poster Preview Modal */}
      <ContentPreviewModal
        asset={previewAsset}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onSelectForPost={handleSelectForPost}
      />
    </div>
  );
};
