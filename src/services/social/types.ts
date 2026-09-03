export type SocialPlatformId = 'youtube' | 'linkedin' | 'tiktok' | 'instagram' | 'facebook';

export type ConnectionState =
  | 'not_configured'
  | 'available'
  | 'connecting'
  | 'connected'
  | 'token_expired'
  | 'reauth_required'
  | 'error'
  | 'disconnected';

export interface SocialPlatformConfig {
  id: SocialPlatformId;
  name: string;
  state: ConnectionState;
  clientIdConfigured: boolean;
  requiredScopes: string[];
  docUrl: string;
  statusMessage: string;
  accountHandle?: string;
  accountAvatar?: string;
  lastConnectedAt?: string;
}

export interface PublishPayload {
  assetId: string;
  assetTitle: string;
  assetType: 'videos' | 'posters' | 'presentations';
  assetPath: string;
  caption: string;
  hashtags: string[];
  platformIds: SocialPlatformId[];
}

export interface PlatformPublishResult {
  platformId: SocialPlatformId;
  success: boolean;
  publishedUrl?: string;
  error?: string;
  statusCode?: string;
}
