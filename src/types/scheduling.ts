export type ScheduleStatus = 'scheduled' | 'publishing' | 'published' | 'failed' | 'cancelled';

export interface ScheduledPost {
  id: string;
  assetId: string;
  assetTitle: string;
  assetType: string;
  assetPath: string;
  thumbnailPath?: string;
  caption: string;
  hashtags: string[];
  platformIds: string[];
  scheduledAt: string; // ISO timestamp
  dateString: string; // YYYY-MM-DD
  timeString: string; // HH:MM
  timezone: string;
  status: ScheduleStatus;
  createdAt: string;
  updatedAt: string;
}
