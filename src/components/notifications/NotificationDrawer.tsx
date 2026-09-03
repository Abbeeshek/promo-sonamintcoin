import React from 'react';
import { AppNotification } from '../../types/notifications';
import { NotificationItemCard } from './NotificationItemCard';
import { Bell, CheckCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkRead,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-14 w-80 sm:w-96 bg-[#14161D] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-hero-fade">
      {/* Drawer Header */}
      <div className="p-4 bg-[#181A22] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#F3D068]" />
          <h3 className="text-xs font-bold font-display text-[#F9FAFB] uppercase tracking-wider">
            Notifications
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onMarkAllRead}
            title="Mark all read"
            className="text-[10px] text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
          >
            <CheckCheck className="w-3 h-3" /> Mark All Read
          </button>
          <button onClick={onClose} aria-label="Close notifications drawer" className="text-[#9CA3AF] hover:text-[#F9FAFB]">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto p-3 space-y-2">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#9CA3AF]">No notifications</div>
        ) : (
          notifications.map((n) => (
            <NotificationItemCard key={n.id} notification={n} onMarkRead={onMarkRead} />
          ))
        )}
      </div>

      {/* Drawer Footer */}
      <div className="p-3 bg-[#181A22] border-t border-white/10 text-center">
        <Link
          to="/app/notifications"
          onClick={onClose}
          className="text-xs font-semibold text-[#F3D068] hover:underline block"
        >
          View All Notifications Center &rarr;
        </Link>
      </div>
    </div>
  );
};
