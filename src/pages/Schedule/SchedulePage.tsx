import React, { useState } from 'react';
import { ScheduledPost } from '../../types/scheduling';
import {
  getScheduledPosts,
  updateScheduledPost,
  cancelScheduledPost,
  deleteScheduledPost,
} from '../../services/scheduleService';
import { CalendarView } from '../../components/scheduling/CalendarView';
import { UpcomingPostsList } from '../../components/scheduling/UpcomingPostsList';
import { ScheduledPostModal } from '../../components/scheduling/ScheduledPostModal';
import { EditScheduleModal } from '../../components/scheduling/EditScheduleModal';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(getScheduledPosts());

  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [editPost, setEditPost] = useState<ScheduledPost | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSelectPost = (post: ScheduledPost) => {
    setSelectedPost(post);
    setIsDetailModalOpen(true);
  };

  const handleEditPost = (post: ScheduledPost) => {
    setEditPost(post);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedPost: ScheduledPost) => {
    const updatedList = updateScheduledPost(updatedPost);
    setScheduledPosts(updatedList);
  };

  const handleCancelPost = (id: string) => {
    const updatedList = cancelScheduledPost(id);
    setScheduledPosts(updatedList);
  };

  const handleDeletePost = (id: string) => {
    const updatedList = deleteScheduledPost(id);
    setScheduledPosts(updatedList);
  };

  return (
    <div className="space-y-8 animate-hero-fade">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F9FAFB]">
            Social Content Schedule Workspace
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Manage future promotional post publications across interactive calendar and chronological timeline
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/app/create-post')}
          icon={<Plus className="w-4 h-4" />}
        >
          Create & Schedule Post
        </Button>
      </div>

      {/* 2-Column Desktop Grid (Left: Calendar, Right: Upcoming) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calendar View (8 Cols) */}
        <div className="lg:col-span-8">
          <CalendarView
            scheduledPosts={scheduledPosts}
            onSelectPost={handleSelectPost}
          />
        </div>

        {/* Upcoming List (4 Cols) */}
        <div className="lg:col-span-4">
          <UpcomingPostsList
            scheduledPosts={scheduledPosts}
            onSelectPost={handleSelectPost}
            onEditPost={handleEditPost}
            onCancelPost={handleCancelPost}
            onDeletePost={handleDeletePost}
          />
        </div>
      </div>

      {/* Modals */}
      <ScheduledPostModal
        post={selectedPost}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={handleEditPost}
        onCancel={handleCancelPost}
        onDelete={handleDeletePost}
      />

      <EditScheduleModal
        post={editPost}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};
