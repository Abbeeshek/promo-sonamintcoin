import { SocialPlatformConfig, PlatformPublishResult, PublishPayload } from '../types';

const APP_ID = import.meta.env.VITE_INSTAGRAM_APP_ID || '';
const REDIRECT_URI = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI || 'http://localhost:3000/api/auth/instagram/callback';
const SCOPE = 'instagram_basic,instagram_content_publish,pages_show_list';

export const getInstagramConfig = (): SocialPlatformConfig => {
  const isConfigured = !!APP_ID && !APP_ID.includes('your_instagram_app_id');
  return {
    id: 'instagram',
    name: 'Instagram Business',
    state: isConfigured ? 'available' : 'not_configured',
    clientIdConfigured: isConfigured,
    requiredScopes: ['instagram_basic', 'instagram_content_publish', 'pages_show_list'],
    docUrl: 'https://developers.facebook.com/docs/instagram-api/guides/content-publishing',
    statusMessage: isConfigured
      ? 'Meta Graph API client configured. Ready to authorize Instagram Content Publishing.'
      : 'Not configured — Requires VITE_INSTAGRAM_APP_ID in server environment.',
  };
};

export const initiateInstagramAuth = (): void => {
  if (!APP_ID || APP_ID.includes('your_instagram_app_id')) {
    alert('Instagram Meta API is not configured. Add VITE_INSTAGRAM_APP_ID in server environment variables.');
    return;
  }
  const state = Math.random().toString(36).substring(7);
  const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${encodeURIComponent(
    APP_ID
  )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(
    SCOPE
  )}&state=${state}&response_type=code`;

  window.location.href = authUrl;
};

export const publishToInstagram = async (_payload: PublishPayload): Promise<PlatformPublishResult> => {
  const config = getInstagramConfig();
  if (config.state === 'not_configured') {
    return {
      platformId: 'instagram',
      success: false,
      error: 'PROVIDER_NOT_CONFIGURED: VITE_INSTAGRAM_APP_ID missing in server environment.',
      statusCode: 'CONFIG_MISSING',
    };
  }
  return {
    platformId: 'instagram',
    success: false,
    error: 'AWAITING_OAUTH_TOKEN: Instagram Business account must complete OAuth authorization flow before publishing.',
    statusCode: 'UNAUTHORIZED',
  };
};
