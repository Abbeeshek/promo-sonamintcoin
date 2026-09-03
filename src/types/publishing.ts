export type SocialPlatform = 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'pinterest';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  platformName: string;
  displayName: string;
  handle: string;
  status: 'connected' | 'disconnected';
  connectedAt?: string;
  avatarUrl?: string;
}

export interface PostDraft {
  id: string;
  assetId: string;
  assetTitle: string;
  assetType: string;
  assetPath: string;
  caption: string;
  hashtags: string[];
  selectedPlatformIds: string[];
  createdAt: string;
}

export interface PublishResult {
  id: string;
  status: 'published' | 'failed' | 'simulated';
  publishedAt: string;
  platformResults: Record<string, boolean>;
  message: string;
}

export type HistoryStatus = 'published' | 'simulated' | 'failed' | 'cancelled';

export interface PublishHistoryItem {
  id: string;
  assetId: string;
  assetTitle: string;
  assetType: string;
  assetPath: string;
  thumbnailPath?: string;
  caption: string;
  platformIds: string[];
  status: HistoryStatus;
  publishedAt: string;
  mode: 'live' | 'simulated';
  errorMessage?: string;
}
