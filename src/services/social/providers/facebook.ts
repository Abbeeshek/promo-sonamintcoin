import { SocialPlatformConfig, PlatformPublishResult, PublishPayload } from '../types';

const APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID || '';
const REDIRECT_URI = import.meta.env.VITE_FACEBOOK_REDIRECT_URI || 'http://localhost:3000/api/auth/facebook/callback';
const SCOPE = 'pages_show_list,pages_read_engagement,pages_manage_posts';

export const getFacebookConfig = (): SocialPlatformConfig => {
  const isConfigured = !!APP_ID && !APP_ID.includes('your_facebook_app_id');
  return {
    id: 'facebook',
    name: 'Facebook Pages',
    state: isConfigured ? 'available' : 'not_configured',
    clientIdConfigured: isConfigured,
    requiredScopes: ['pages_show_list', 'pages_read_engagement', 'pages_manage_posts'],
    docUrl: 'https://developers.facebook.com/docs/pages/publishing',
    statusMessage: isConfigured
      ? 'Meta Graph API client configured. Ready to authorize Facebook Pages Publishing.'
      : 'Not configured — Requires VITE_FACEBOOK_APP_ID in server environment.',
  };
};

export const initiateFacebookAuth = (): void => {
  if (!APP_ID || APP_ID.includes('your_facebook_app_id')) {
    alert('Facebook Meta API is not configured. Add VITE_FACEBOOK_APP_ID in server environment variables.');
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

export const publishToFacebook = async (_payload: PublishPayload): Promise<PlatformPublishResult> => {
  const config = getFacebookConfig();
  if (config.state === 'not_configured') {
    return {
      platformId: 'facebook',
      success: false,
      error: 'PROVIDER_NOT_CONFIGURED: VITE_FACEBOOK_APP_ID missing in server environment.',
      statusCode: 'CONFIG_MISSING',
    };
  }
  return {
    platformId: 'facebook',
    success: false,
    error: 'AWAITING_OAUTH_TOKEN: Facebook Page account must complete OAuth authorization flow before publishing.',
    statusCode: 'UNAUTHORIZED',
  };
};
