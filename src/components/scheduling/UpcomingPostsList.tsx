import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ScheduledPost } from '../../types/scheduling';
import { formatDate, formatTime } from '../../utils/dateTime';
import { Clock, Globe, Calendar as CalendarIcon, Edit3, XCircle, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpcomingPostsListProps {
  scheduledPosts: ScheduledPost[];
  onSelectPost: (post: ScheduledPost) => void;
  onEditPost: (post: ScheduledPost) => void;
  onCancelPost: (id: string) => void;
  onDeletePost: (id: string) => void;
}

export const UpcomingPostsList: React.FC<UpcomingPostsListProps> = ({
  scheduledPosts,
  onSelectPost,
  onEditPost,
  onCancelPost,
  onDeletePost,
}) => {
  const navigate = useNavigate();

  const activeScheduled = scheduledPosts
    .filter((p) => p.status === 'scheduled')
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  if (activeScheduled.length === 0) {
    return (
      <Card className="p-8 text-center border-dashed border-white/10 flex flex-col items-center">
        <CalendarIcon className="w-10 h-10 text-[#D4AF37] mb-3" />
        <h4 className="text-base font-bold font-display text-[#F9FAFB] mb-1">
          No Posts Scheduled
        </h4>
        <p className="text-xs text-[#9CA3AF] max-w-xs leading-relaxed mb-4">
          You currently have no upcoming social promotional posts scheduled.
        </p>
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/app/create-post')}
          icon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Create & Schedule Post
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
        Upcoming Scheduled Posts ({activeScheduled.length})
      </h3>

      <div className="space-y-3">
        {activeScheduled.map((post) => (
          <Card key={post.id} hoverable className="p-4 border border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Media & Content Details */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-16 h-12 rounded-lg bg-black border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                  {post.thumbnailPath || post.assetPath ? (
                    <img src={post.thumbnailPath || post.assetPath} alt={post.assetTitle} className="w-full h-full object-cover" />
                  ) : (
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                  )}
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-bold font-display text-[#F9FAFB] truncate">
                    {post.assetTitle}
                  </h4>
                  <p className="text-xs text-[#9CA3AF] line-clamp-1 mb-1">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-[#6B7280] font-mono">
                    <span className="text-[#F3D068] font-semibold">
                      {formatDate(post.scheduledAt)} at {formatTime(post.scheduledAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-[#6B7280]" />
                      {post.timezone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <Button variant="ghost" size="sm" onClick={() => onSelectPost(post)}>
                  Details
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEditPost(post)} icon={<Edit3 className="w-3.5 h-3.5" />}>
                  Edit
                </Button>
                <button
                  onClick={() => onCancelPost(post.id)}
                  title="Cancel schedule"
                  className="p-2 text-[#9CA3AF] hover:text-amber-400 hover:bg-white/5 rounded-xl transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeletePost(post.id)}
                  title="Delete post record"
                  className="p-2 text-[#9CA3AF] hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
