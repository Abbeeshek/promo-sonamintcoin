import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Video,
  Image as ImageIcon,
  Presentation,
  FolderUp,
  PlusSquare,
  Share2,
  Calendar,
  History,
  BarChart3,
  Zap,
  Bell,
  Settings,
  ShieldCheck,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { getAuthState } from '../../services/auth/authService';
import { LogoutModal } from '../auth/LogoutModal';

interface SidebarProps {
  className?: string;
  onNavClick?: () => void;
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '', onNavClick, onItemClick }) => {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { user } = getAuthState();

  const handleNavClick = () => {
    if (onNavClick) onNavClick();
    if (onItemClick) onItemClick();
  };

  const navigationGroups = [
    {
      group: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/app', icon: <LayoutDashboard className="w-4 h-4" /> },
      ],
    },
    {
      group: 'CONTENT',
      items: [
        { label: 'All Content', path: '/app/content', icon: <FolderKanban className="w-4 h-4" /> },
        { label: 'Videos', path: '/app/videos', icon: <Video className="w-4 h-4" /> },
        { label: 'Posters', path: '/app/posters', icon: <ImageIcon className="w-4 h-4" /> },
        { label: 'Presentations', path: '/app/presentations', icon: <Presentation className="w-4 h-4" /> },
        { label: 'My Uploads', path: '/app/my-uploads', icon: <FolderUp className="w-4 h-4" /> },
      ],
    },
    {
      group: 'PUBLISH',
      items: [
        { label: 'Create Post', path: '/app/create-post', icon: <PlusSquare className="w-4 h-4" /> },
        { label: 'Social Accounts', path: '/app/social-accounts', icon: <Share2 className="w-4 h-4" /> },
        { label: 'Schedule', path: '/app/schedule', icon: <Calendar className="w-4 h-4" /> },
        { label: 'Publishing History', path: '/app/publishing-history', icon: <History className="w-4 h-4" /> },
      ],
    },
    {
      group: 'INSIGHTS',
      items: [
        { label: 'Analytics', path: '/app/analytics', icon: <BarChart3 className="w-4 h-4" /> },
      ],
    },
    {
      group: 'AUTOMATION',
      items: [
        { label: 'Automation', path: '/app/automation', icon: <Zap className="w-4 h-4" /> },
      ],
    },
    {
      group: 'SYSTEM',
      items: [
        { label: 'Notifications', path: '/app/notifications', icon: <Bell className="w-4 h-4" /> },
        { label: 'Settings', path: '/app/settings', icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <>
      <aside className={`w-64 bg-[#14161D] border-r border-white/[0.07] flex flex-col justify-between h-screen sticky top-0 overflow-y-auto ${className}`}>
        {/* Top Brand Logo - Clickable to / (Home Page) */}
        <div className="p-6 pb-4">
          <Link
            to="/"
            aria-label="Go to Sona Mint Coin Home Page"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-xl p-1 transition-all"
          >
            <div className="w-9 h-9 rounded-full border border-[#D4AF37]/50 p-0.5 shadow-gold-glow flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
              <img
                src="/LOGO/Sonamitcoin/WhatsApp Image 2026-08-17 at 13.17.31 (2).jpeg"
                alt="Official Sona Mint Coin Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="font-bold text-sm font-display tracking-tight text-[#F9FAFB] block group-hover:text-[#F3D068] transition-colors">
                Sona Mint Coin
              </span>
              <span className="text-[10px] text-[#D4AF37] font-mono tracking-wider block">
                PROMOTIONAL HUB
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Stack */}
        <nav className="flex-1 px-4 py-2 space-y-5">
          {navigationGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold font-mono text-[#6B7280] uppercase tracking-wider mb-1">
                {group.group}
              </div>
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/app'}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gold-gradient text-neutral-950 shadow-gold-glow font-bold'
                        : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/5'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer User Identity & Logout Button */}
        <div className="p-4 border-t border-white/[0.07] space-y-3">
          {/* Authenticated User Identity */}
          <div className="p-3 rounded-xl bg-[#181A22] border border-white/5 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#0A0B0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#F3D068] shrink-0 font-bold">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-bold text-[#F9FAFB] block truncate text-xs">
                  {user?.name || 'Promoter'}
                </span>
                <span className="text-[10px] text-[#9CA3AF] truncate block">
                  {user?.email || 'promoter@sonamintcoin.com'}
                </span>
              </div>
            </div>

            {/* Log Out Button Trigger */}
            <button
              onClick={() => setLogoutModalOpen(true)}
              aria-label="Log Out"
              title="Log Out"
              className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#6B7280] px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#D4AF37]" /> Authenticated
            </span>
            <span>v1.0</span>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
      />
    </>
  );
};
