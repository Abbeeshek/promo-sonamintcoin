import React, { useState } from 'react';
import { OFFICIAL_ASSETS } from '../../data/assetsCatalog';
import { ContentAsset, FilterState, Category } from '../../types/assets';
import { ContentToolbar } from '../../components/content/ContentToolbar';
import { ContentCard } from '../../components/content/ContentCard';
import { ContentPreviewModal } from '../../components/content/ContentPreviewModal';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Video, Folder, ArrowLeft, Play, Sparkles, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VideoFolder {
  id: string;
  name: string;
  categoryKey: Category;
  description: string;
  icon: React.ReactNode;
  coverImage: string;
}

export const VideosPage: React.FC = () => {
  const navigate = useNavigate();

  const allVideos = OFFICIAL_ASSETS.filter((a) => a.type === 'videos');

  // Promotional Video Collections matching workspace file system structure
  const collections: VideoFolder[] = [
    {
      id: 'folder-stockpoint',
      name: 'Stockpoint Outlet & Center',
      categoryKey: 'Stockpoint',
      description: 'Regional distribution hubs, stockpoint partner setup, and outlet operation videos.',
      icon: <Layers className="w-6 h-6 text-[#F3D068]" />,
      coverImage: '/Posters/Sonamintcoin Plan/WhatsApp Image 2026-08-17 at 13.17.58.jpeg',
    },
    {
      id: 'folder-digital-marketing',
      name: 'Digital Marketing & Social Campaigns',
      categoryKey: 'Digital Marketing',
      description: 'High-converting ad creatives, viral reels, and social media brand campaign videos.',
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
      coverImage: '/Posters/Overall General Promotion/WhatsApp Image 2026-08-17 at 13.17.39.jpeg',
    },
    {
      id: 'folder-car-bonanza',
      name: 'Car Bonanza Mega Rewards',
      categoryKey: 'Car Bonanza',
      description: 'Luxury vehicle reward announcements, qualifier celebrations, and contest videos.',
      icon: <ShieldCheck className="w-6 h-6 text-[#F3D068]" />,
      coverImage: '/Posters/Double Damaka/WhatsApp Image 2026-08-17 at 13.17.49.jpeg',
    },
    {
      id: 'folder-booster-plan',
      name: 'Booster Plan High Return',
      categoryKey: 'Booster Plan',
      description: 'Accelerated returns, staking multipliers, and bonus payout walkthrough videos.',
      icon: <Video className="w-6 h-6 text-[#D4AF37]" />,
      coverImage: '/Posters/Sonamintcoin Plan/WhatsApp Image 2026-08-17 at 13.18.00.jpeg',
    },
    {
      id: 'folder-be-a-partner',
      name: 'Be A Partner Franchise Program',
      categoryKey: 'Be A Partner',
      description: 'Entrepreneurship partner invitations, franchise benefits, and business model guides.',
      icon: <ShieldCheck className="w-6 h-6 text-[#F3D068]" />,
      coverImage: '/Posters/Profit Sharing - Club Membership/English/WhatsApp Image 2026-08-17 at 13.17.47.jpeg',
    },
    {
      id: 'folder-overall',
      name: 'Overall General Promotion',
      categoryKey: 'Overall General',
      description: 'Primary brand promos, gold minting showcases, and digital ecosystem reels.',
      icon: <Sparkles className="w-6 h-6 text-[#F3D068]" />,
      coverImage: '/Posters/Sonamintcoin Plan/WhatsApp Image 2026-08-17 at 13.17.58.jpeg',
    },
    {
      id: 'folder-club',
      name: 'Club Membership & Profit Sharing',
      categoryKey: 'Club Membership',
      description: 'Exclusive executive club benefits, rewards, and profit sharing guides.',
      icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
      coverImage: '/Posters/Profit Sharing - Club Membership/English/WhatsApp Image 2026-08-17 at 13.17.34.jpeg',
    },
    {
      id: 'folder-login',
      name: 'Login & Navigation Tutorials',
      categoryKey: 'Login Guide',
      description: 'Step-by-step video walkthroughs explaining portal sign-in and features.',
      icon: <Layers className="w-6 h-6 text-[#F3D068]" />,
      coverImage: '/Posters/Sonamintcoin Plan/WhatsApp Image 2026-08-17 at 13.18.00.jpeg',
    },
    {
      id: 'folder-ppt',
      name: 'PPT Explained (Multilingual)',
      categoryKey: 'Sonamintcoin Plan',
      description: 'Multilingual presentation walkthroughs spoken in English, Hindi, and Tamil.',
      icon: <Video className="w-6 h-6 text-[#D4AF37]" />,
      coverImage: '/Posters/Profit Sharing - Club Membership/Hindi/WhatsApp Image 2026-08-17 at 13.17.36.jpeg',
    },
  ];

  // Filtering state
  const [selectedFolder, setSelectedFolder] = useState<VideoFolder | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    type: 'videos',
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
      type: 'videos',
      language: 'all',
      category: 'all',
      sort: 'az',
    });
  };

  // Apply filters
  const filteredVideos = allVideos.filter((video) => {
    // Selected folder filter
    if (selectedFolder && video.category !== selectedFolder.categoryKey) {
      return false;
    }

    // Category dropdown filter
    if (filters.category !== 'all' && video.category !== filters.category) {
      return false;
    }

    // Language filter
    if (filters.language !== 'all' && video.language !== filters.language) {
      return false;
    }

    // Search query
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      const titleMatch = video.title.toLowerCase().includes(q);
      const descMatch = video.description?.toLowerCase().includes(q);
      const tagMatch = video.tags?.some((t) => t.toLowerCase().includes(q));
      if (!titleMatch && !descMatch && !tagMatch) return false;
    }

    return true;
  });

  // Sort
  const sortedVideos = [...filteredVideos].sort((a, b) => {
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
              <Video className="w-7 h-7 text-[#F3D068]" /> Official Video Library
            </h1>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              Select a video collection or search across all official promotional reels ({allVideos.length} total)
            </p>
          </div>

          {selectedFolder && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedFolder(null)}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Video Collections
            </Button>
          )}
        </div>

        {/* 1. TOP SEARCH TOOLBAR (Placed at Top as Requested) */}
        <ContentToolbar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          activeFilterCount={activeFilterCount}
        />

        {/* 2. MAIN PAGE BODY: 4 LARGE PROMOTIONAL VIDEO COLLECTION HERO CARDS */}
        {!isSearchActive && (
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold font-display text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                <Folder className="w-4 h-4 text-[#F3D068]" /> Promotional Video Collections
              </h2>
              <span className="text-xs text-[#6B7280]">Select a collection card to list videos</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {collections.map((folder) => {
                const count = allVideos.filter((v) => v.category === folder.categoryKey).length;
                return (
                  <Card
                    key={folder.id}
                    hoverable
                    onClick={() => setSelectedFolder(folder)}
                    className="relative overflow-hidden p-7 sm:p-9 border-2 border-[#D4AF37]/40 bg-gradient-to-br from-[#181A22] via-[#1A1D27] to-[#14161D] hover:border-[#D4AF37] transition-all cursor-pointer flex flex-col justify-between min-h-[220px] group shadow-2xl shadow-gold-glow/15"
                  >
                    {/* Gold Flare Background */}
                    <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#0A0B0E] border-2 border-[#D4AF37]/50 flex items-center justify-center shadow-gold-glow/20">
                          {folder.icon}
                        </div>
                        <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#F3D068] flex items-center gap-1.5">
                          <Play className="w-3 h-3 fill-[#F3D068]" /> {count} Videos
                        </span>
                      </div>

                      <h3 className="text-2xl font-extrabold font-display text-[#F9FAFB] mb-2 group-hover:text-[#F3D068] transition-colors">
                        {folder.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                        {folder.description}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs sm:text-sm font-bold text-[#F3D068] group-hover:underline">
                      <span>Explore Collection Videos</span>
                      <ArrowRight className="w-4 h-4 text-[#F3D068] group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. ACTIVE COLLECTION / SEARCH RESULTS VIDEO GRID */}
        {isSearchActive && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#181A22] via-[#1A1D27] to-[#181A22] border border-[#D4AF37]/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#F3D068]">
                  {selectedFolder ? selectedFolder.icon : <Video className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-base font-bold font-display text-[#F9FAFB]">
                    {selectedFolder ? selectedFolder.name : 'Search Results'}
                  </h2>
                  <p className="text-xs text-[#9CA3AF]">
                    {selectedFolder ? selectedFolder.description : `Showing ${sortedVideos.length} video(s)`}
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

            {sortedVideos.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#9CA3AF] bg-[#181A22] rounded-2xl border border-white/5">
                No videos found in this collection or search criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {sortedVideos.map((video) => (
                  <ContentCard
                    key={video.id}
                    asset={video}
                    onSelect={handleOpenPreview}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Preview Modal */}
      <ContentPreviewModal
        asset={previewAsset}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onSelectForPost={handleSelectForPost}
      />
    </div>
  );
};
