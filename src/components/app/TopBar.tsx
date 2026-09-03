import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, Plus, Menu } from 'lucide-react';
import { Button } from '../ui/Button';
import { getNotifications, getUnreadNotificationCount, markNotificationAsRead, markAllNotificationsAsRead } from '../../services/notificationService';
import { NotificationDrawer } from '../notifications/NotificationDrawer';
import { AppNotification } from '../../types/notifications';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);

  useEffect(() => {
    const list = getNotifications();
    setNotifications(list);
    setUnreadCount(getUnreadNotificationCount());
  }, [location.pathname]);

  const handleMarkRead = (id: string) => {
    const updated = markNotificationAsRead(id);
    setNotifications(updated);
    setUnreadCount(updated.filter((n) => !n.read).length);
  };

  const handleMarkAllRead = () => {
    const updated = markAllNotificationsAsRead();
    setNotifications(updated);
    setUnreadCount(0);
  };

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/app':
        return 'Dashboard';
      case '/app/content':
        return 'Content Library';
      case '/app/videos':
        return 'Videos';
      case '/app/posters':
        return 'Posters';
      case '/app/presentations':
        return 'Presentations';
      case '/app/my-uploads':
        return 'My Uploads';
      case '/app/create-post':
        return 'Create Post';
      case '/app/social-accounts':
        return 'Social Accounts';
      case '/app/schedule':
        return 'Schedule';
      case '/app/publishing-history':
        return 'Publishing History';
      case '/app/analytics':
        return 'Analytics';
      case '/app/automation':
        return 'Automation';
      case '/app/notifications':
        return 'Notifications';
      case '/app/settings':
        return 'Settings';
      default:
        return 'Application Shell';
    }
  };

  return (
    <header className="h-20 bg-[#14161D]/90 backdrop-blur-md border-b border-white/[0.07] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left Title & Mobile Menu Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
          className="lg:hidden text-[#9CA3AF] hover:text-[#F9FAFB] p-2 rounded-xl bg-white/5"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg font-bold font-display text-[#F9FAFB]">
            {getPageTitle(location.pathname)}
          </h1>
          <div className="text-[11px] text-[#6B7280]">
            Sona Mint Coin Promotional Hub
          </div>
        </div>
      </div>

      {/* Right Search & Notification Drawer Trigger */}
      <div className="flex items-center gap-3 sm:gap-4 relative">
        <div className="hidden sm:flex items-center bg-[#181A22] border border-white/10 rounded-xl px-3 py-1.5 w-48 md:w-64">
          <Search className="w-4 h-4 text-[#6B7280] mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search assets..."
            className="bg-transparent text-xs text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none w-full"
          />
        </div>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            onClick={() => setIsNotifDrawerOpen(!isNotifDrawerOpen)}
            aria-label="Notifications"
            className="relative text-[#9CA3AF] hover:text-[#F9FAFB] p-2.5 rounded-xl bg-[#181A22] border border-white/10 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#D4AF37] text-neutral-950 font-bold text-[9px] flex items-center justify-center font-mono">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Drawer Dropdown */}
          <NotificationDrawer
            isOpen={isNotifDrawerOpen}
            onClose={() => setIsNotifDrawerOpen(false)}
            notifications={notifications}
            onMarkRead={handleMarkRead}
            onMarkAllRead={handleMarkAllRead}
          />
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/app/create-post')}
          icon={<Plus className="w-4 h-4" />}
        >
          <span className="hidden sm:inline">Create Post</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>
    </header>
  );
};
