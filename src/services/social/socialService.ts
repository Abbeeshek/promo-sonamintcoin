import { SocialPlatformConfig, PlatformPublishResult, PublishPayload } from './types';
import { getYouTubeConfig, initiateYouTubeAuth, publishToYouTube } from './providers/youtube';
import { getLinkedInConfig, initiateLinkedInAuth, publishToLinkedIn } from './providers/linkedin';
import { getTikTokConfig, initiateTikTokAuth, publishToTikTok } from './providers/tiktok';
import { getInstagramConfig, initiateInstagramAuth, publishToInstagram } from './providers/instagram';
import { getFacebookConfig, initiateFacebookAuth, publishToFacebook } from './providers/facebook';

export const getAllPlatformConfigs = (): SocialPlatformConfig[] => {
  return [
    getYouTubeConfig(),
    getLinkedInConfig(),
    getTikTokConfig(),
    getInstagramConfig(),
    getFacebookConfig(),
  ];
};

export const initiatePlatformOAuth = (platformId: string): void => {
  switch (platformId) {
    case 'youtube':
      initiateYouTubeAuth();
      break;
    case 'linkedin':
      initiateLinkedInAuth();
      break;
    case 'tiktok':
      initiateTikTokAuth();
      break;
    case 'instagram':
      initiateInstagramAuth();
      break;
    case 'facebook':
      initiateFacebookAuth();
      break;
    default:
      console.error(`Unknown social platform ID: ${platformId}`);
  }
};

export const publishToPlatform = async (
  platformId: string,
  payload: PublishPayload
): Promise<PlatformPublishResult> => {
  switch (platformId) {
    case 'youtube':
      return await publishToYouTube(payload);
    case 'linkedin':
      return await publishToLinkedIn(payload);
    case 'tiktok':
      return await publishToTikTok(payload);
    case 'instagram':
      return await publishToInstagram(payload);
    case 'facebook':
      return await publishToFacebook(payload);
    default:
      return {
        platformId: platformId as any,
        success: false,
        error: `Unsupported platform provider: ${platformId}`,
        statusCode: 'INVALID_PLATFORM',
      };
  }
};
