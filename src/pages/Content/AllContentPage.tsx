import React, { useState } from 'react';
import { OFFICIAL_ASSETS } from '../../data/assetsCatalog';
import { ContentAsset, ContentType, FilterState, Category } from '../../types/assets';
import { ContentToolbar } from '../../components/content/ContentToolbar';
import { ContentCard } from '../../components/content/ContentCard';
import { ContentPreviewModal } from '../../components/content/ContentPreviewModal';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  FolderKanban,
  Video,
  Image as ImageIcon,
  Presentation,
  Folder,
  ArrowLeft,
  Layers,
  ShieldCheck,
  Zap,
  Building,
  Globe,
  Sparkles,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SubCategoryFolder {
  id: string;
  name: string;
  categoryKey: Category;
  parentType: ContentType | 'pictures';
  description: string;
  icon: React.ReactNode;
  coverImage?: string;
}

export const AllContentPage: React.FC = () => {
  const navigate = useNavigate();

  // Active navigation selection state
  const [selectedType, setSelectedType] = useState<ContentType | 'pictures' | 'all'>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<Category | 'all'>('all');

  const [filters, setFilters] = useState<FilterState>({
    query: '',
    type: 'all',
    language: 'all',
    category: 'all',
    sort: 'az',
  });

  // Modal State
  const [previewAsset, setPreviewAsset] = useState<ContentAsset | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Sub-category folders mapped directly to project file system
  const subCategoryFolders: SubCategoryFolder[] = [
    // --- POSTER / PICTURE FOLDERS ---
    {
      id: 'sub-post-plan',
      name: 'Sonamintcoin Plan Posters',
      categoryKey: 'Sonamintcoin Plan',
      parentType: 'posters',
      description: 'Official core business plan visual graphics.',
      icon: <Layers className="w-5 h-5 text-[#F3D068]" />,
      coverImage: '/Posters/Sonamintcoin Plan/WhatsApp Image 2026-08-17 at 13.17.58.jpeg',
    },
    {
      id: 'sub-post-profit',
      name: 'Profit Sharing & Club Membership',
      categoryKey: 'Club Membership',
      parentType: 'posters',
      description: 'Executive club membership benefit posters.',
      icon: <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />,
      coverImage: '/Posters/Profit Sharing - Club Membership/English/WhatsApp Image 2026-08-17 at 13.17.34.jpeg',
    },
    {
      id: 'sub-post-[#14161D]',
      name: 'Double Dhamaka Campaign',
      categoryKey: 'Double Damaka',
      parentType: 'posters',
      description: 'Double rewards promotion banners & graphics.',
      icon: <Zap className="w-5 h-5 text-[#F3D068]" />,
      coverImage: '/Posters/Double Damaka/WhatsApp Image 2026-08-17 at 13.17.27 (1).jpeg',
    },
    {
      id: 'sub-post-prpc',
      name: 'PRPC Headquarters & Infrastructure',
      categoryKey: 'PRPC',
      parentType: 'posters',
      description: 'Operational office showcase graphics.',
      icon: <Building className="w-5 h-5 text-[#D4AF37]" />,
      coverImage: '/Posters/PRPC/WhatsApp Image 2026-08-17 at 13.17.27.jpeg',
    },
    {
      id: 'sub-post-nwg',
      name: 'NWG Network Graphics',
      categoryKey: 'NWG',
      parentType: 'posters',
      description: 'Network growth promotional posters.',
      icon: <Globe className="w-5 h-5 text-[#F3D068]" />,
      coverImage: '/Posters/nwg/WhatsApp Image 2026-08-17 at 13.17.27 (2).jpeg',
    },
    {
      id: 'sub-post-exchanges',
      name: 'Bitlaance & Own Exchange',
      categoryKey: 'Exchanges',
      parentType: 'posters',
      description: 'Exchange listing & trading platform graphics.',
      icon: <Sparkles className="w-5 h-5 text-[#D4AF37]" />,
      coverImage: '/Posters/Bitlaance - Own Exchange/WhatsApp Image 2026-08-17 at 13.17.28 (1).jpeg',
    },

    // --- VIDEO FOLDERS ---
    {
      id: 'sub-vid-general',
      name: 'Overall General Videos',
      categoryKey: 'Overall General',
      parentType: 'videos',
      description: 'Primary brand promo reels and gold minting clips.',
      icon: <Video className="w-5 h-5 text-[#F3D068]" />,
      coverImage: '/Posters/Sonamintcoin Plan/WhatsApp Image 2026-08-17 at 13.17.58.jpeg',
    },
    {
      id: 'sub-vid-club',
      name: 'Club Membership Videos',
      categoryKey: 'Club Membership',
      parentType: 'videos',
      description: 'Executive club membership video explainers.',
      icon: <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />,
      coverImage: '/Posters/Profit Sharing - Club Membership/English/WhatsApp Image 2026-08-17 at 13.17.34.jpeg',
    },
    {
      id: 'sub-vid-login',
      name: 'Login Guide Tutorials',
      categoryKey: 'Login Guide',
      parentType: 'videos',
      description: 'Portal sign-in and navigation walkthroughs.',
      icon: <Layers className="w-5 h-5 text-[#F3D068]" />,
      coverImage: '/Posters/Sonamintcoin Plan/WhatsApp Image 2026-08-17 at 13.18.00.jpeg',
    },

    // --- PICTURES FOLDERS ---
    {
      id: 'sub-pic-general',
      name: 'Promotional Pictures & Banners',
      categoryKey: 'Overall General',
      parentType: 'pictures',
      description: 'High-res promotional pictures and social media graphics.',
      icon: <ImageIcon className="w-5 h-5 text-[#F3D068]" />,
      coverImage: '/Posters/Overall General Promotion/WhatsApp Image 2026-08-17 at 13.17.44.jpeg',
    },

    // --- PRESENTATION FOLDERS ---
    {
      id: 'sub-ppt-english',
      name: 'English Presentation Decks',
      categoryKey: 'Sonamintcoin Plan',
      parentType: 'presentations',
      description: 'Official Sona Mint Coin business plan decks in English.',
      icon: <Presentation className="w-5 h-5 text-[#F3D068]" />,
      coverImage: '/Posters/Profit Sharing - Club Membership/English/WhatsApp Image 2026-08-17 at 13.17.35.jpeg',
    },
  ];

  // 4 Primary Content Type Hero Cards (Large, Spacious, Dominant Layout)
  const primaryTypeCards = [
    {
      key: 'videos',
      title: 'Videos',
      icon: <Video className="w-10 h-10 text-[#F3D068]" />,
      count: OFFICIAL_ASSETS.filter((a) => a.type === 'videos').length,
      label: 'Promotional Video Reels & Tutorials',
      description: 'Explore brand explainer clips, multilingual presentations, and login walkthroughs.',
      directLink: '/app/videos',
    },
    {
      key: 'posters',
      title: 'Posters',
      icon: <FolderKanban className="w-10 h-10 text-[#D4AF37]" />,
      count: OFFICIAL_ASSETS.filter((a) => a.type === 'posters').length,
      label: 'Promotional Graphic Posters',
      description: 'High-resolution business plan graphics, club membership posters, and offer banners.',
      directLink: '/app/posters',
    },
    {
      key: 'pictures',
      title: 'Pictures',
      icon: <ImageIcon className="w-10 h-10 text-[#F3D068]" />,
      count: OFFICIAL_ASSETS.filter((a) => a.type === 'posters' && a.category === 'Overall General').length + 10,
      label: 'Graphics & Image Banners',
      description: 'Clean promotional artwork, social media post visuals, and brand imagery.',
    },
    {
      key: 'presentations',
      title: 'PPTx / Presentations',
      icon: <Presentation className="w-10 h-10 text-[#D4AF37]" />,
      count: OFFICIAL_ASSETS.filter((a) => a.type === 'presentations').length,
      label: 'PDF & PPT Presentation Decks',
      description: 'Multilingual business plan presentation decks for meetings and events.',
      directLink: '/app/presentations',
    },
  ];

  const handleSelectTypeCard = (card: typeof primaryTypeCards[0]) => {
    if (card.directLink && !filters.query) {
      navigate(card.directLink);
      return;
    }
    const t = card.key as ContentType | 'pictures';
    setSelectedType(t);
    setSelectedSubCategory('all');
    setFilters((prev) => ({
      ...prev,
      type: t === 'pictures' ? 'posters' : (t as ContentType),
      category: 'all',
    }));
  };

  const handleSelectSubFolder = (folder: SubCategoryFolder) => {
    setSelectedSubCategory(folder.categoryKey);
    setFilters((prev) => ({
      ...prev,
      category: folder.categoryKey,
    }));
  };

  const handleResetNavigation = () => {
    setSelectedType('all');
    setSelectedSubCategory('all');
    setFilters({
      query: '',
      type: 'all',
      language: 'all',
      category: 'all',
      sort: 'az',
    });
  };

  // Filter assets when user searches or drills into subcategory
  const filteredAssets = OFFICIAL_ASSETS.filter((asset) => {
    if (selectedType !== 'all') {
      if (selectedType === 'pictures') {
        if (asset.type !== 'posters') return false;
      } else if (asset.type !== selectedType) {
        return false;
      }
    }

    if (selectedSubCategory !== 'all' && asset.category !== selectedSubCategory) {
      return false;
    }

    if (filters.language !== 'all' && asset.language !== filters.language) {
      return false;
    }

    if (filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      const titleMatch = asset.title.toLowerCase().includes(q);
      const descMatch = asset.description?.toLowerCase().includes(q);
      const tagMatch = asset.tags?.some((t) => t.toLowerCase().includes(q));
      if (!titleMatch && !descMatch && !tagMatch) return false;
    }

    return true;
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (filters.sort === 'za') return b.title.localeCompare(a.title);
    return a.title.localeCompare(b.title);
  });

  const activeSubFolders = subCategoryFolders.filter((f) => {
    if (selectedType === 'all') return true;
    return f.parentType === selectedType;
  });

  const activeFilterCount =
    (filters.query ? 1 : 0) +
    (filters.language !== 'all' ? 1 : 0) +
    (selectedType !== 'all' ? 1 : 0) +
    (selectedSubCategory !== 'all' ? 1 : 0);

  const isSearchActive = !!filters.query.trim() || filters.language !== 'all' || selectedSubCategory !== 'all';

  return (
    <div className="space-y-8 animate-hero-fade min-h-[85vh] flex flex-col justify-between">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F9FAFB] flex items-center gap-2.5">
              <FolderKanban className="w-7 h-7 text-[#F3D068]" /> All Content Directory
            </h1>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              Select a content section below or search across all official promotional media ({OFFICIAL_ASSETS.length} total)
            </p>
          </div>

          {selectedType !== 'all' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetNavigation}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              All Content Directory
            </Button>
          )}
        </div>

        {/* 1. TOP SEARCH TOOLBAR (Placed at the Top as Requested) */}
        <ContentToolbar
          filters={filters}
          onFilterChange={(newF) => setFilters((prev) => ({ ...prev, ...newF }))}
          onResetFilters={handleResetNavigation}
          activeFilterCount={activeFilterCount}
        />

        {/* 2. MAIN PAGE BODY: 4 LARGE PRIMARY CONTENT TYPE HERO CARDS */}
        {!isSearchActive && selectedType === 'all' && (
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold font-display text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F3D068]" /> Primary Content Type Sections
              </h2>
              <span className="text-xs text-[#6B7280]">Select any section to browse media files</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {primaryTypeCards.map((card) => (
                <Card
                  key={card.key}
                  hoverable
                  onClick={() => handleSelectTypeCard(card)}
                  className="relative overflow-hidden p-7 sm:p-9 border-2 border-[#D4AF37]/40 bg-gradient-to-br from-[#181A22] via-[#1A1D27] to-[#14161D] hover:border-[#D4AF37] transition-all cursor-pointer flex flex-col justify-between min-h-[220px] group shadow-2xl shadow-gold-glow/15"
                >
                  {/* Gold Ambient Flare Background */}
                  <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-[#0A0B0E] border-2 border-[#D4AF37]/50 flex items-center justify-center shadow-gold-glow/20">
                        {card.icon}
                      </div>
                      <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#F3D068]">
                        {card.count} Media Items
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold font-display text-[#F9FAFB] mb-2 group-hover:text-[#F3D068] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs sm:text-sm font-bold text-[#F3D068] group-hover:underline">
                    <span>Open {card.title} Section</span>
                    <ArrowRight className="w-4 h-4 text-[#F3D068] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Sub-Folders View (When a section is active) */}
        {selectedType !== 'all' && selectedSubCategory === 'all' && !filters.query && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold font-display text-[#F3D068] uppercase tracking-wider flex items-center gap-2">
                <Folder className="w-4 h-4 text-[#D4AF37]" /> Sub-Folder Categories ({activeSubFolders.length})
              </h3>
              <button onClick={handleResetNavigation} className="text-xs text-[#D4AF37] hover:underline">
                View All Categories
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeSubFolders.map((folder) => (
                <Card
                  key={folder.id}
                  hoverable
                  onClick={() => handleSelectSubFolder(folder)}
                  className="p-5 border border-[#D4AF37]/40 bg-gradient-to-b from-[#181A22] to-[#14161D] hover:border-[#D4AF37] transition-all cursor-pointer flex items-center justify-between group shadow-gold-glow/10"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-[#0A0B0E] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                      {folder.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold font-display text-[#F9FAFB] group-hover:text-[#F3D068] transition-colors truncate">
                        {folder.name}
                      </h4>
                      <p className="text-xs text-[#9CA3AF] truncate">{folder.description}</p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#F3D068] group-hover:translate-x-1 transition-all shrink-0" />
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Active Search / Filter Results Grid */}
        {isSearchActive && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold font-display text-[#D4AF37] uppercase tracking-wider font-mono">
                Matching Search Results ({sortedAssets.length})
              </h3>
              <button onClick={handleResetNavigation} className="text-xs text-[#9CA3AF] hover:text-[#F9FAFB]">
                Clear Search
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {sortedAssets.map((asset) => (
                <ContentCard
                  key={asset.id}
                  asset={asset}
                  onSelect={(a) => {
                    setPreviewAsset(a);
                    setIsPreviewOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Asset Preview Modal */}
      <ContentPreviewModal
        asset={previewAsset}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onSelectForPost={(a) => navigate(`/app/create-post?assetId=${a.id}`)}
      />
    </div>
  );
};
