import { UserSettings } from '../types/settings';
import { getBrowserTimezone } from '../utils/dateTime';

const SETTINGS_STORAGE_KEY = 'smc_user_settings';

const defaultSettings: UserSettings = {
  profile: {
    displayName: 'Sona Mint Promoter',
    email: 'promoter@sonamintcoin.com',
    preferredLanguage: 'English',
  },
  appearance: {
    theme: 'dark',
    reducedMotion: false,
  },
  notifications: {
    publishingUpdates: true,
    verificationUpdates: true,
    schedulingUpdates: true,
    automationUpdates: true,
  },
  publishing: {
    defaultTimezone: getBrowserTimezone(),
    confirmBeforePublishing: true,
  },
};

export const getUserSettings = (): UserSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse settings:', e);
    return defaultSettings;
  }
};

export const updateUserSettings = (updated: UserSettings): UserSettings => {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const clearDemoData = (): void => {
  localStorage.removeItem('smc_user_uploads');
  localStorage.removeItem('smc_scheduled_posts');
  localStorage.removeItem('smc_publishing_history');
  localStorage.removeItem('smc_app_notifications');
  localStorage.removeItem('smc_automation_rules');
  localStorage.removeItem(SETTINGS_STORAGE_KEY);
};
