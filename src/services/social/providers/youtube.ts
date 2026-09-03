import { SocialPlatformConfig, PlatformPublishResult, PublishPayload } from '../types';

const CLIENT_ID = import.meta.env.VITE_YOUTUBE_CLIENT_ID || '';
const REDIRECT_URI = import.meta.env.VITE_YOUTUBE_REDIRECT_URI || 'http://localhost:3000/api/auth/youtube/callback';
const SCOPE = 'https://www.googleapis.com/auth/youtube.upload';

export const getYouTubeConfig = (): SocialPlatformConfig => {
  const isConfigured = !!CLIENT_ID && !CLIENT_ID.includes('your_youtube_client_id');
  return {
    id: 'youtube',
    name: 'YouTube',
    state: isConfigured ? 'available' : 'not_configured',
    clientIdConfigured: isConfigured,
    requiredScopes: [SCOPE],
    docUrl: 'https://developers.google.com/youtube/v3/guides/uploading_a_video',
    statusMessage: isConfigured
      ? 'OAuth client configured. Ready to initiate YouTube Data API authorization.'
      : 'Not configured — Requires VITE_YOUTUBE_CLIENT_ID in server environment.',
  };
};

export const initiateYouTubeAuth = (): void => {
  if (!CLIENT_ID || CLIENT_ID.includes('your_youtube_client_id')) {
    alert('YouTube OAuth is not configured. Add VITE_YOUTUBE_CLIENT_ID in server environment variables.');
    return;
  }
  const state = Math.random().toString(36).substring(7);
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${encodeURIComponent(
    CLIENT_ID
  )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(
    SCOPE
  )}&state=${state}&access_type=offline&prompt=consent`;

  window.location.href = authUrl;
};

export const publishToYouTube = async (_payload: PublishPayload): Promise<PlatformPublishResult> => {
  const config = getYouTubeConfig();
  if (config.state === 'not_configured') {
    return {
      platformId: 'youtube',
      success: false,
      error: 'PROVIDER_NOT_CONFIGURED: VITE_YOUTUBE_CLIENT_ID missing in server environment.',
      statusCode: 'CONFIG_MISSING',
    };
  }
  return {
    platformId: 'youtube',
    success: false,
    error: 'AWAITING_OAUTH_TOKEN: YouTube account must complete OAuth authorization flow before publishing.',
    statusCode: 'UNAUTHORIZED',
  };
};
