export type ContentType = 'videos' | 'posters' | 'presentations';
export type Language = 'English' | 'Hindi' | 'Tamil' | 'General';
export type Category = 
  | 'Sonamintcoin Plan'
  | 'Club Membership'
  | 'Double Damaka'
  | 'Overall General'
  | 'PRPC'
  | 'NWG'
  | 'Login Guide'
  | 'Exchanges';

export type SortOption = 'az' | 'za' | 'type';

export interface ContentAsset {
  id: string;
  title: string;
  type: ContentType;
  source: 'official' | 'user';
  path: string;
  thumbnailPath?: string;
  language: Language;
  category: Category;
  duration?: string;
  fileSize?: string;
  fileExtension: string;
  description?: string;
  tags?: string[];
  isFeatured?: boolean;
}

export interface FilterState {
  query: string;
  type: ContentType | 'all';
  language: Language | 'all';
  category: Category | 'all';
  sort: SortOption;
}
