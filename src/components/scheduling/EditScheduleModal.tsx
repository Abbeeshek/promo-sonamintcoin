import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ScheduledPost } from '../../types/scheduling';
import { isValidFutureDate, getBrowserTimezone } from '../../utils/dateTime';
import { AlertCircle } from 'lucide-react';

interface EditScheduleModalProps {
  post: ScheduledPost | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPost: ScheduledPost) => void;
}

export const EditScheduleModal: React.FC<EditScheduleModalProps> = ({
  post,
  isOpen,
  onClose,
  onSave,
}) => {
  const [caption, setCaption] = useState('');
  const [dateString, setDateString] = useState('');
  const [timeString, setTimeString] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (post) {
      setCaption(post.caption);
      setDateString(post.dateString);
      setTimeString(post.timeString);
      setValidationError('');
    }
  }, [post]);

  if (!post) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!isValidFutureDate(dateString, timeString)) {
      setValidationError('Please select a future date and time for scheduling.');
      return;
    }

    const scheduledAt = new Date(`${dateString}T${timeString}`).toISOString();

    const updated: ScheduledPost = {
      ...post,
      caption,
      dateString,
      timeString,
      scheduledAt,
      timezone: getBrowserTimezone(),
      updatedAt: new Date().toISOString(),
    };

    onSave(updated);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Scheduled Post" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title display */}
        <div className="text-sm font-bold text-[#F3D068] font-display">{post.assetTitle}</div>

        <div>
          <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
            Caption Text
          </label>
          <textarea
            rows={4}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full bg-[#181A22] border border-white/10 rounded-xl p-3 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
              Future Date *
            </label>
            <input
              type="date"
              required
              value={dateString}
              onChange={(e) => setDateString(e.target.value)}
              className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F9FAFB]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1">
              Future Time *
            </label>
            <input
              type="time"
              required
              value={timeString}
              onChange={(e) => setTimeString(e.target.value)}
              className="w-full bg-[#181A22] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F9FAFB]"
            />
          </div>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            Save Schedule Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
