export type NotificationType = 'upload' | 'verification' | 'publishing' | 'scheduling' | 'automation' | 'system';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}
