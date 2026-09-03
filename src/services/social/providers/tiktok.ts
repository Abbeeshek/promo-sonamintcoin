import { SocialPlatformConfig, PlatformPublishResult, PublishPayload } from '../types';

const CLIENT_KEY = import.meta.env.VITE_TIKTOK_CLIENT_KEY || '';
const REDIRECT_URI = import.meta.env.VITE_TIKTOK_REDIRECT_URI || 'http://localhost:3000/api/auth/tiktok/callback';
const SCOPE = 'user.info.basic,video.publish,video.upload';

export const getTikTokConfig = (): SocialPlatformConfig => {
  const isConfigured = !!CLIENT_KEY && !CLIENT_KEY.includes('your_tiktok_client_key');
  return {
    id: 'tiktok',
    name: 'TikTok',
    state: isConfigured ? 'available' : 'not_configured',
    clientIdConfigured: isConfigured,
    requiredScopes: ['user.info.basic', 'video.publish', 'video.upload'],
    docUrl: 'https://developers.tiktok.com/doc/content-posting-api-get-started',
    statusMessage: isConfigured
      ? 'TikTok Content Posting API client configured. Ready to authorize video.publish scope.'
      : 'Not configured — Requires VITE_TIKTOK_CLIENT_KEY in server environment.',
  };
};

export const initiateTikTokAuth = (): void => {
  if (!CLIENT_KEY || CLIENT_KEY.includes('your_tiktok_client_key')) {
    alert('TikTok API is not configured. Add VITE_TIKTOK_CLIENT_KEY in server environment variables.');
    return;
  }
  const state = Math.random().toString(36).substring(7);
  const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${encodeURIComponent(
    CLIENT_KEY
  )}&scope=${encodeURIComponent(SCOPE)}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&state=${state}`;

  window.location.href = authUrl;
};

export const publishToTikTok = async (_payload: PublishPayload): Promise<PlatformPublishResult> => {
  const config = getTikTokConfig();
  if (config.state === 'not_configured') {
    return {
      platformId: 'tiktok',
      success: false,
      error: 'PROVIDER_NOT_CONFIGURED: VITE_TIKTOK_CLIENT_KEY missing in server environment.',
      statusCode: 'CONFIG_MISSING',
    };
  }
  return {
    platformId: 'tiktok',
    success: false,
    error: 'AWAITING_OAUTH_TOKEN: TikTok account must complete OAuth authorization flow before publishing.',
    statusCode: 'UNAUTHORIZED',
  };
};
