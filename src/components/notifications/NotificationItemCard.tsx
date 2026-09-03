import React from 'react';
import { AppNotification } from '../../types/notifications';
import { formatDateTime } from '../../utils/dateTime';
import { ShieldCheck, Send, Calendar, Zap, Bell, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotificationItemCardProps {
  notification: AppNotification;
  onMarkRead: (id: string) => void;
}

export const NotificationItemCard: React.FC<NotificationItemCardProps> = ({
  notification,
  onMarkRead,
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'publishing':
        return <Send className="w-4 h-4 text-[#F3D068]" />;
      case 'verification':
        return <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />;
      case 'scheduling':
        return <Calendar className="w-4 h-4 text-[#F3D068]" />;
      case 'automation':
        return <Zap className="w-4 h-4 text-[#F3D068]" />;
      default:
        return <Bell className="w-4 h-4 text-[#D4AF37]" />;
    }
  };

  return (
    <div
      className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 transition-colors ${
        notification.read
          ? 'bg-[#14161D]/50 border-white/5 text-[#9CA3AF]'
          : 'bg-[#181A22] border-[#D4AF37]/30 text-[#F9FAFB] shadow-gold-glow'
      }`}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-[#14161D] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold font-display truncate">{notification.title}</h4>
            {!notification.read && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
            )}
          </div>
          <p className="text-[11px] leading-relaxed line-clamp-2 my-0.5">{notification.message}</p>
          <div className="flex items-center gap-3 text-[10px] text-[#6B7280]">
            <span>{formatDateTime(notification.timestamp)}</span>
            {notification.link && (
              <Link to={notification.link} className="text-[#D4AF37] hover:underline font-semibold">
                View &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>

      {!notification.read && (
        <button
          onClick={() => onMarkRead(notification.id)}
          title="Mark as read"
          className="text-[#9CA3AF] hover:text-[#F3D068] p-1 rounded transition-colors"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
