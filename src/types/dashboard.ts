export type AssetCategory = 'videos' | 'posters' | 'presentations';
export type AssetLanguage = 'English' | 'Hindi' | 'Tamil' | 'General';

export interface PromotionalAsset {
  id: string;
  title: string;
  category: AssetCategory;
  folder: string;
  path: string;
  thumbnailPath?: string;
  language: AssetLanguage;
  duration?: string; // e.g. "01:20" for videos
  fileSize?: string;
  isFeatured?: boolean;
  fileExtension: string;
}

export interface CategoryCount {
  category: AssetCategory;
  label: string;
  count: number;
  description: string;
  browsePath: string;
}

export interface DashboardOverviewStat {
  label: string;
  value: string | number;
  subtext: string;
  category?: string;
}
