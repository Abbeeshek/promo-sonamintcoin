import { SocialPlatformConfig, PlatformPublishResult, PublishPayload } from '../types';

const CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID || '';
const REDIRECT_URI = import.meta.env.VITE_LINKEDIN_REDIRECT_URI || 'http://localhost:3000/api/auth/linkedin/callback';
const SCOPE = 'w_member_social r_liteprofile';

export const getLinkedInConfig = (): SocialPlatformConfig => {
  const isConfigured = !!CLIENT_ID && !CLIENT_ID.includes('your_linkedin_client_id');
  return {
    id: 'linkedin',
    name: 'LinkedIn',
    state: isConfigured ? 'available' : 'not_configured',
    clientIdConfigured: isConfigured,
    requiredScopes: ['w_member_social', 'r_liteprofile'],
    docUrl: 'https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin',
    statusMessage: isConfigured
      ? 'OAuth client configured. Ready to authorize Share on LinkedIn permissions.'
      : 'Not configured — Requires VITE_LINKEDIN_CLIENT_ID in server environment.',
  };
};

export const initiateLinkedInAuth = (): void => {
  if (!CLIENT_ID || CLIENT_ID.includes('your_linkedin_client_id')) {
    alert('LinkedIn OAuth is not configured. Add VITE_LINKEDIN_CLIENT_ID in server environment variables.');
    return;
  }
  const state = Math.random().toString(36).substring(7);
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${encodeURIComponent(
    CLIENT_ID
  )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(
    SCOPE
  )}&state=${state}`;

  window.location.href = authUrl;
};

export const publishToLinkedIn = async (_payload: PublishPayload): Promise<PlatformPublishResult> => {
  const config = getLinkedInConfig();
  if (config.state === 'not_configured') {
    return {
      platformId: 'linkedin',
      success: false,
      error: 'PROVIDER_NOT_CONFIGURED: VITE_LINKEDIN_CLIENT_ID missing in server environment.',
      statusCode: 'CONFIG_MISSING',
    };
  }
  return {
    platformId: 'linkedin',
    success: false,
    error: 'AWAITING_OAUTH_TOKEN: LinkedIn account must complete OAuth authorization flow before publishing.',
    statusCode: 'UNAUTHORIZED',
  };
};
