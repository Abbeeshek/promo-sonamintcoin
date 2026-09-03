import React, { useState } from 'react';
import { AppNotification } from '../../types/notifications';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../../services/notificationService';
import { NotificationItemCard } from '../../components/notifications/NotificationItemCard';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Bell, CheckCheck } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<AppNotification[]>(getNotifications());

  const handleMarkRead = (id: string) => {
    const updated = markNotificationAsRead(id);
    setNotifications(updated);
  };

  const handleMarkAllRead = () => {
    const updated = markAllNotificationsAsRead();
    setNotifications(updated);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 animate-hero-fade">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F9FAFB]">
            Notification Center
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Real application events log ({unreadCount} unread notification(s))
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            icon={<CheckCheck className="w-3.5 h-3.5" />}
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-white/10 flex flex-col items-center">
          <Bell className="w-10 h-10 text-[#D4AF37] mb-3" />
          <h4 className="text-base font-bold font-display text-[#F9FAFB] mb-1">
            No Notifications Found
          </h4>
          <p className="text-xs text-[#9CA3AF] max-w-xs leading-relaxed">
            Application events will log here as you upload, verify, schedule, and publish promotional content.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <NotificationItemCard key={n.id} notification={n} onMarkRead={handleMarkRead} />
          ))}
        </div>
      )}
    </div>
  );
};
