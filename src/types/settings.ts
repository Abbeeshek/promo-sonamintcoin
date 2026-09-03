export interface UserSettings {
  profile: {
    displayName: string;
    email: string;
    preferredLanguage: string;
  };
  appearance: {
    theme: 'dark';
    reducedMotion: boolean;
  };
  notifications: {
    publishingUpdates: boolean;
    verificationUpdates: boolean;
    schedulingUpdates: boolean;
    automationUpdates: boolean;
  };
  publishing: {
    defaultTimezone: string;
    confirmBeforePublishing: boolean;
  };
}
