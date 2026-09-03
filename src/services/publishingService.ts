import { PostDraft, PublishResult, PublishHistoryItem } from '../types/publishing';
import { DEMO_PUBLISHING_HISTORY } from '../data/demoData';

const HISTORY_STORAGE_KEY = 'smc_publishing_history';

export const getPublishingHistory = (): PublishHistoryItem[] => {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(DEMO_PUBLISHING_HISTORY));
      return DEMO_PUBLISHING_HISTORY;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse publishing history from localStorage:', e);
    return DEMO_PUBLISHING_HISTORY;
  }
};

export const executeDemoPublish = async (draft: PostDraft): Promise<PublishResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const platformResults: Record<string, boolean> = {};
  draft.selectedPlatformIds.forEach((platformId) => {
    platformResults[platformId] = true;
  });

  const historyItem: PublishHistoryItem = {
    id: `hist-${Date.now()}`,
    assetId: draft.assetId,
    assetTitle: draft.assetTitle,
    assetType: draft.assetType,
    assetPath: draft.assetPath,
    thumbnailPath: draft.assetPath,
    caption: draft.caption,
    platformIds: draft.selectedPlatformIds,
    status: 'simulated',
    publishedAt: new Date().toISOString(),
    mode: 'simulated',
  };

  const current = getPublishingHistory();
  const updated = [historyItem, ...current];
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));

  return {
    id: historyItem.id,
    status: 'simulated',
    publishedAt: historyItem.publishedAt,
    platformResults,
    message: 'Local demo publish record created for UI review.',
  };
};
