import { ScheduledPost } from '../types/scheduling';
import { PublishHistoryItem } from '../types/publishing';
import { AutomationRule } from '../types/automation';
import { AppNotification } from '../types/notifications';
import { getBrowserTimezone } from '../utils/dateTime';

/**
 * Centralized Demo Data Set (Labeled explicitly as source: 'demo')
 * Provides populated sample data for UI review without pretending to be real external activity.
 */

export interface DemoWrapped<T> {
  source: 'demo' | 'real';
  data: T;
}

// 1. DEMO SCHEDULED POSTS
export const DEMO_SCHEDULED_POSTS: ScheduledPost[] = [
  {
    id: 'sch-demo-01',
    assetId: 'vid-01',
    assetTitle: '[DEMO] Sona Mint Coin Plan Explainer Video',
    assetType: 'videos',
    assetPath: '/Videos/Overall General/WhatsApp Video 2026-08-17 at 13.11.35.mp4',
    thumbnailPath: '/Posters/Sonamintcoin Plan/WhatsApp Image 2026-08-17 at 13.17.58.jpeg',
    caption: '[SAMPLE DEMO POST] Discover the 24K physical gold backed digital coin ecosystem.',
    hashtags: ['#SonaMintCoin', '#DigitalGold', '#SampleSchedule'],
    platformIds: ['youtube', 'linkedin'],
    scheduledAt: new Date(Date.now() + 86400000 * 2).toISOString(),
    dateString: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    timeString: '10:30',
    timezone: getBrowserTimezone(),
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sch-demo-02',
    assetId: 'post-02',
    assetTitle: '[DEMO] Profit Sharing Club Membership Poster',
    assetType: 'posters',
    assetPath: '/Posters/Profit Sharing - Club Membership/English/WhatsApp Image 2026-08-17 at 13.17.47.jpeg',
    thumbnailPath: '/Posters/Profit Sharing - Club Membership/English/WhatsApp Image 2026-08-17 at 13.17.47.jpeg',
    caption: '[SAMPLE DEMO POST] Executive club membership benefits & profit sharing scheme.',
    hashtags: ['#ClubMembership', '#ProfitSharing'],
    platformIds: ['instagram', 'facebook'],
    scheduledAt: new Date(Date.now() + 86400000 * 5).toISOString(),
    dateString: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    timeString: '14:00',
    timezone: getBrowserTimezone(),
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// 2. DEMO PUBLISHING HISTORY LOGS
export const DEMO_PUBLISHING_HISTORY: PublishHistoryItem[] = [
  {
    id: 'hist-demo-01',
    assetId: 'vid-02',
    assetTitle: '[DEMO] Club Membership Promotional Video',
    assetType: 'videos',
    assetPath: '/Videos/Club Membership/WhatsApp Video 2026-08-17 at 13.11.36 (1).mp4',
    thumbnailPath: '/Posters/Profit Sharing - Club Membership/English/WhatsApp Image 2026-08-17 at 13.17.47.jpeg',
    caption: '[SAMPLE PUBLISHED RECORD] Executive Club membership announcement.',
    platformIds: ['instagram', 'facebook'],
    status: 'simulated',
    publishedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    mode: 'simulated',
  },
  {
    id: 'hist-demo-02',
    assetId: 'post-01',
    assetTitle: '[DEMO] Sonamintcoin Plan Main Poster',
    assetType: 'posters',
    assetPath: '/Posters/Sonamintcoin Plan/WhatsApp Image 2026-08-17 at 13.17.58.jpeg',
    thumbnailPath: '/Posters/Sonamintcoin Plan/WhatsApp Image 2026-08-17 at 13.17.58.jpeg',
    caption: '[SAMPLE PUBLISHED RECORD] Core business plan visual graphic.',
    platformIds: ['linkedin'],
    status: 'simulated',
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    mode: 'simulated',
  },
];

// 3. DEMO AUTOMATION RULES
export const DEMO_AUTOMATION_RULES: AutomationRule[] = [
  {
    id: 'auto-demo-01',
    name: '[DEMO RULE] Weekly General Promotion Banner Blast',
    enabled: true,
    trigger: 'Recurring Schedule',
    action: 'Auto-Publish Approved Poster',
    contentSource: 'Official Posters Catalog',
    frequency: 'Every Monday at 09:00 AM',
    createdAt: '2026-08-15',
    updatedAt: '2026-08-15',
    lastExecution: '2026-08-25 at 09:00 AM',
    nextExecution: '2026-09-01 at 09:00 AM',
  },
  {
    id: 'auto-demo-02',
    name: '[DEMO RULE] Monthly Explainer Video Reminder',
    enabled: false,
    trigger: 'Monthly Schedule',
    action: 'Post Video Reel to Social Accounts',
    contentSource: 'Videos/Overall General',
    frequency: '1st of every month at 10:00 AM',
    createdAt: '2026-08-20',
    updatedAt: '2026-08-20',
  },
];

// 4. DEMO NOTIFICATIONS
export const DEMO_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-demo-01',
    type: 'publishing',
    title: '[DEMO] Sample Post Record Created',
    message: 'Sample demo publishing log item added for UI layout review.',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    read: false,
    link: '/app/publishing-history',
  },
  {
    id: 'notif-demo-02',
    type: 'verification',
    title: '[DEMO] Guideline Verification v2.0 Evaluated',
    message: 'Sample verification report logged for review.',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    read: false,
    link: '/app/my-uploads',
  },
];
