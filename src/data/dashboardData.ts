import { OFFICIAL_ASSETS } from './assetsCatalog';
import { ContentAsset, ContentType, Language, Category, FilterState } from '../types/assets';
import { PromotionalAsset } from '../types/dashboard';

export const getAssetCounts = (): {
  videos: number;
  posters: number;
  presentations: number;
  total: number;
} => {
  const videosCount = OFFICIAL_ASSETS.filter((a) => a.type === 'videos').length;
  const postersCount = OFFICIAL_ASSETS.filter((a) => a.type === 'posters').length;
  const presentationsCount = OFFICIAL_ASSETS.filter((a) => a.type === 'presentations').length;

  return {
    videos: videosCount,
    posters: postersCount,
    presentations: presentationsCount,
    total: OFFICIAL_ASSETS.length,
  };
};

export const getCategoryOverview = () => {
  const counts = getAssetCounts();
  return [
    {
      category: 'videos',
      label: 'Promotional Videos',
      count: counts.videos,
      description: 'Official promotional videos, campaign reels & explainer clips.',
      browsePath: '/app/videos',
    },
    {
      category: 'posters',
      label: 'Promotional Posters',
      count: counts.posters,
      description: 'High-res posters, announcement banners & graphic templates.',
      browsePath: '/app/posters',
    },
    {
      category: 'presentations',
      label: 'Presentations',
      count: counts.presentations,
      description: 'Multilingual presentation decks & PDF business plans.',
      browsePath: '/app/presentations',
    },
  ];
};

export const getAssetsByCategory = (category: ContentType | 'all'): PromotionalAsset[] => {
  if (category === 'all') return OFFICIAL_ASSETS as unknown as PromotionalAsset[];
  return OFFICIAL_ASSETS.filter((a) => a.type === category) as unknown as PromotionalAsset[];
};

export const filterAssets = (filters: FilterState): ContentAsset[] => {
  return OFFICIAL_ASSETS.filter((asset) => {
    // Type Filter
    if (filters.type !== 'all' && asset.type !== filters.type) {
      return false;
    }
    // Language Filter
    if (filters.language !== 'all' && asset.language !== filters.language) {
      return false;
    }
    // Category Filter
    if (filters.category !== 'all' && asset.category !== filters.category) {
      return false;
    }
    // Query Search (Title, Description, Category, Tags)
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      const titleMatch = asset.title.toLowerCase().includes(q);
      const categoryMatch = asset.category.toLowerCase().includes(q);
      const languageMatch = asset.language.toLowerCase().includes(q);
      const tagMatch = asset.tags?.some((t) => t.toLowerCase().includes(q));
      if (!titleMatch && !categoryMatch && !languageMatch && !tagMatch) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (filters.sort === 'az') {
      return a.title.localeCompare(b.title);
    }
    if (filters.sort === 'za') {
      return b.title.localeCompare(a.title);
    }
    if (filters.sort === 'type') {
      return a.type.localeCompare(b.type);
    }
    return 0;
  });
};

export const getAvailableLanguages = (): Language[] => {
  return ['English', 'Hindi', 'Tamil', 'General'];
};

export const getAvailableCategories = (): Category[] => {
  return [
    'Sonamintcoin Plan',
    'Club Membership',
    'Double Damaka',
    'Overall General',
    'PRPC',
    'NWG',
    'Login Guide',
    'Exchanges',
  ];
};
