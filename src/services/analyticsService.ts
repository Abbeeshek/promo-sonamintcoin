import { AnalyticsOverview, ContentTypeDistribution, LanguageDistribution, PlatformPublishingDistribution } from '../types/analytics';
import { OFFICIAL_ASSETS } from '../data/assetsCatalog';
import { getStoredUploads } from './uploadService';
import { getScheduledPosts } from './scheduleService';
import { getPublishingHistory } from './publishingService';
import { getSocialAccounts } from './socialService';

export const getAnalyticsOverview = (): AnalyticsOverview => {
  const uploads = getStoredUploads();
  const scheduled = getScheduledPosts();
  const history = getPublishingHistory();
  const accounts = getSocialAccounts();

  return {
    totalOfficialAssets: OFFICIAL_ASSETS.length,
    totalUserUploads: uploads.length,
    approvedUploads: uploads.filter((u) => u.verificationStatus === 'approved').length,
    pendingUploads: uploads.filter((u) => u.verificationStatus === 'pending' || u.verificationStatus === 'draft').length,
    rejectedUploads: uploads.filter((u) => u.verificationStatus === 'rejected').length,
    totalScheduledPosts: scheduled.filter((s) => s.status === 'scheduled').length,
    publishedPosts: history.length,
    connectedPlatforms: accounts.filter((a) => a.status === 'connected').length,
  };
};

export const getContentTypeDistribution = (): ContentTypeDistribution[] => {
  const totalOfficial = OFFICIAL_ASSETS.length;
  const userUploads = getStoredUploads();
  const totalAll = totalOfficial + userUploads.length;

  const videoCount = OFFICIAL_ASSETS.filter((a) => a.type === 'videos').length +
    userUploads.filter((u) => u.contentType === 'videos').length;

  const posterCount = OFFICIAL_ASSETS.filter((a) => a.type === 'posters').length +
    userUploads.filter((u) => u.contentType === 'posters').length;

  const pptCount = OFFICIAL_ASSETS.filter((a) => a.type === 'presentations').length +
    userUploads.filter((u) => u.contentType === 'presentations').length;

  return [
    { type: 'Posters / Graphics', count: posterCount, percentage: Math.round((posterCount / totalAll) * 100) },
    { type: 'Promotional Videos', count: videoCount, percentage: Math.round((videoCount / totalAll) * 100) },
    { type: 'Presentations & Decks', count: pptCount, percentage: Math.round((pptCount / totalAll) * 100) },
  ];
};

export const getLanguageDistribution = (): LanguageDistribution[] => {
  const allLanguages = ['English', 'Hindi', 'Tamil', 'General'];
  const total = OFFICIAL_ASSETS.length;

  return allLanguages.map((lang) => {
    const count = OFFICIAL_ASSETS.filter((a) => a.language === lang).length;
    return {
      language: lang,
      count,
      percentage: Math.round((count / total) * 100),
    };
  });
};

export const getPlatformDistribution = (): PlatformPublishingDistribution[] => {
  const history = getPublishingHistory();
  const scheduled = getScheduledPosts();

  const platformCounts: Record<string, number> = {
    Instagram: 0,
    Facebook: 0,
    LinkedIn: 0,
    'X (Twitter)': 0,
    Pinterest: 0,
  };

  history.forEach((item) => {
    item.platformIds.forEach(() => {
      platformCounts['Instagram'] += 1;
      platformCounts['Facebook'] += 1;
    });
  });

  scheduled.forEach(() => {
    platformCounts['Instagram'] += 1;
    platformCounts['LinkedIn'] += 1;
  });

  return Object.entries(platformCounts).map(([platform, count]) => ({
    platform,
    count,
  }));
};
