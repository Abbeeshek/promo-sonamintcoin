import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card';
import { getAssetCounts } from '../../../data/dashboardData';
import { getStoredUploads } from '../../../services/uploadService';
import { getSocialAccounts } from '../../../services/socialService';
import { getScheduledPosts } from '../../../services/scheduleService';
import { getAutomationRules } from '../../../services/automationService';
import { formatDate, formatTime } from '../../../utils/dateTime';
import { Video, Image as ImageIcon, Presentation, Sparkles, FolderUp, Share2, Calendar, Clock, Zap, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OverviewPanel: React.FC = () => {
  const counts = getAssetCounts();
  const [uploadsCount, setUploadsCount] = useState(0);
  const [connectedCount, setConnectedCount] = useState(0);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [automationCount, setAutomationCount] = useState(0);
  const [nextScheduledPost, setNextScheduledPost] = useState<any | null>(null);

  useEffect(() => {
    const userUploads = getStoredUploads();
    setUploadsCount(userUploads.length);

    const socialAccounts = getSocialAccounts();
    setConnectedCount(socialAccounts.filter((a) => a.status === 'connected').length);

    const scheduled = getScheduledPosts().filter((p) => p.status === 'scheduled');
    setScheduledCount(scheduled.length);

    const rules = getAutomationRules();
    setAutomationCount(rules.filter((r) => r.enabled).length);

    if (scheduled.length > 0) {
      const sorted = [...scheduled].sort(
        (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
      );
      setNextScheduledPost(sorted[0]);
    }
  }, []);

  return (
    <aside aria-label="Workspace overview panel" className="space-y-5">
      {/* Workspace Summary Card */}
      <Card className="relative overflow-hidden p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
            Workspace Summary
          </h3>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#D4AF37]/10 text-[10px] font-semibold text-[#F3D068] border border-[#D4AF37]/20">
            <Sparkles className="w-3 h-3" /> Dynamic Local Data
          </span>
        </div>

        {/* Big Total Stat */}
        <div className="mb-6 pb-4 border-b border-white/[0.06]">
          <span className="text-4xl font-black font-display text-gold-gradient tracking-tight block mb-1">
            {counts.total}
          </span>
          <span className="text-xs font-medium text-[#9CA3AF]">
            Total Verified Brand Assets
          </span>
        </div>

        {/* Asset Breakdown Stack */}
        <div className="space-y-3">
          <Link to="/app/videos" className="flex items-center justify-between p-2.5 rounded-xl bg-[#181A22] border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
            <div className="flex items-center gap-2.5">
              <Video className="w-4 h-4 text-[#F3D068]" />
              <span className="text-xs font-medium text-[#F9FAFB] group-hover:text-[#F3D068]">Promotional Videos</span>
            </div>
            <span className="text-xs font-bold font-mono text-[#D4AF37]">{counts.videos}</span>
          </Link>

          <Link to="/app/posters" className="flex items-center justify-between p-2.5 rounded-xl bg-[#181A22] border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-4 h-4 text-[#F3D068]" />
              <span className="text-xs font-medium text-[#F9FAFB] group-hover:text-[#F3D068]">Promotional Posters</span>
            </div>
            <span className="text-xs font-bold font-mono text-[#D4AF37]">{counts.posters}</span>
          </Link>

          <Link to="/app/presentations" className="flex items-center justify-between p-2.5 rounded-xl bg-[#181A22] border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
            <div className="flex items-center gap-2.5">
              <Presentation className="w-4 h-4 text-[#F3D068]" />
              <span className="text-xs font-medium text-[#F9FAFB] group-hover:text-[#F3D068]">Presentations & Decks</span>
            </div>
            <span className="text-xs font-bold font-mono text-[#D4AF37]">{counts.presentations}</span>
          </Link>
        </div>
      </Card>

      {/* Workflow & Automation Overview */}
      <Card className="p-6 border border-white/10 space-y-3">
        <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
          Publishing & Automation
        </h4>

        <Link to="/app/schedule" className="flex items-center justify-between p-2.5 rounded-xl bg-[#181A22] border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-[#F3D068]" />
            <span className="text-xs font-medium text-[#F9FAFB] group-hover:text-[#F3D068]">Upcoming Scheduled Posts</span>
          </div>
          <span className="text-xs font-bold font-mono text-[#F3D068]">{scheduledCount}</span>
        </Link>

        {nextScheduledPost && (
          <div className="p-3 rounded-xl bg-[#14161D] border border-white/5 space-y-1">
            <div className="text-[10px] uppercase font-semibold text-[#6B7280]">Next Publication</div>
            <div className="text-xs font-bold text-[#F9FAFB] truncate">{nextScheduledPost.assetTitle}</div>
            <div className="text-[11px] font-mono text-[#D4AF37] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#D4AF37]" />
              {formatDate(nextScheduledPost.scheduledAt)} at {formatTime(nextScheduledPost.scheduledAt)}
            </div>
          </div>
        )}

        <Link to="/app/automation" className="flex items-center justify-between p-2.5 rounded-xl bg-[#181A22] border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-[#F3D068]" />
            <span className="text-xs font-medium text-[#F9FAFB] group-hover:text-[#F3D068]">Active Automation Rules</span>
          </div>
          <span className="text-xs font-bold font-mono text-[#F3D068]">{automationCount}</span>
        </Link>

        <Link to="/app/my-uploads" className="flex items-center justify-between p-2.5 rounded-xl bg-[#181A22] border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
          <div className="flex items-center gap-2.5">
            <FolderUp className="w-4 h-4 text-[#F3D068]" />
            <span className="text-xs font-medium text-[#F9FAFB] group-hover:text-[#F3D068]">My Uploads Workspace</span>
          </div>
          <span className="text-xs font-bold font-mono text-[#D4AF37]">{uploadsCount}</span>
        </Link>

        <Link to="/app/social-accounts" className="flex items-center justify-between p-2.5 rounded-xl bg-[#181A22] border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
          <div className="flex items-center gap-2.5">
            <Share2 className="w-4 h-4 text-[#F3D068]" />
            <span className="text-xs font-medium text-[#F9FAFB] group-hover:text-[#F3D068]">Connected Social Platforms</span>
          </div>
          <span className="text-xs font-bold font-mono text-green-400">{connectedCount}</span>
        </Link>
      </Card>

      {/* Quick Navigation Links */}
      <Card className="p-6 border border-white/10">
        <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">
          Quick Navigation
        </h4>
        <div className="space-y-2 text-xs">
          <Link to="/app/analytics" className="block text-[#9CA3AF] hover:text-[#F3D068] transition-colors py-1 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-[#D4AF37]" /> Hub Analytics & Insights
          </Link>
          <Link to="/app/automation" className="block text-[#9CA3AF] hover:text-[#F3D068] transition-colors py-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#D4AF37]" /> Promotional Automation Rules
          </Link>
          <Link to="/app/schedule" className="block text-[#9CA3AF] hover:text-[#F3D068] transition-colors py-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> View Calendar Schedule
          </Link>
        </div>
      </Card>
    </aside>
  );
};
