import { AppNotification } from '../types/notifications';
import { DEMO_NOTIFICATIONS } from '../data/demoData';

const NOTIFICATIONS_STORAGE_KEY = 'smc_app_notifications';

export const getNotifications = (): AppNotification[] => {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(DEMO_NOTIFICATIONS));
      return DEMO_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse notifications:', e);
    return DEMO_NOTIFICATIONS;
  }
};

export const getUnreadNotificationCount = (): number => {
  return getNotifications().filter((n) => !n.read).length;
};

export const markNotificationAsRead = (id: string): AppNotification[] => {
  const current = getNotifications();
  const updated = current.map((n) => (n.id === id ? { ...n, read: true } : n));
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const markAllNotificationsAsRead = (): AppNotification[] => {
  const current = getNotifications();
  const updated = current.map((n) => ({ ...n, read: true }));
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
