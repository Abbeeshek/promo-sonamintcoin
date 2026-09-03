export type DateRangeFilter = '7d' | '30d' | 'all';

export interface AnalyticsOverview {
  totalOfficialAssets: number;
  totalUserUploads: number;
  approvedUploads: number;
  pendingUploads: number;
  rejectedUploads: number;
  totalScheduledPosts: number;
  publishedPosts: number;
  connectedPlatforms: number;
}

export interface ContentTypeDistribution {
  type: string;
  count: number;
  percentage: number;
}

export interface LanguageDistribution {
  language: string;
  count: number;
  percentage: number;
}

export interface PlatformPublishingDistribution {
  platform: string;
  count: number;
}
