import React, { useState } from 'react';
import { ScheduledPost } from '../../types/scheduling';
import { getDaysInMonthGrid } from '../../utils/dateTime';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Card } from '../ui/Card';

interface CalendarViewProps {
  scheduledPosts: ScheduledPost[];
  onSelectPost: (post: ScheduledPost) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  scheduledPosts,
  onSelectPost,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayGrid = getDaysInMonthGrid(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <Card className="p-4 sm:p-6 border border-white/10 space-y-4">
      {/* Calendar Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-[#F3D068]" />
          <h3 className="text-lg font-bold font-display text-[#F9FAFB]">
            {monthNames[month]} {year}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1 rounded-lg bg-[#181A22] border border-white/10 text-xs font-semibold text-[#F3D068] hover:bg-white/5 transition-colors"
          >
            Today
          </button>
          <div className="flex items-center gap-1 bg-[#181A22] border border-white/10 p-1 rounded-lg">
            <button
              onClick={prevMonth}
              aria-label="Previous month"
              className="p-1 text-[#9CA3AF] hover:text-[#F9FAFB] rounded"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              aria-label="Next month"
              className="p-1 text-[#9CA3AF] hover:text-[#F9FAFB] rounded"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase font-bold text-[#6B7280]">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {dayGrid.map((dayItem, idx) => {
          const postsForDay = scheduledPosts.filter(
            (p) => p.dateString === dayItem.dateString && p.status === 'scheduled'
          );

          return (
            <div
              key={idx}
              className={`min-h-[70px] sm:min-h-[90px] p-1.5 sm:p-2 rounded-xl border flex flex-col justify-between transition-colors ${
                dayItem.isCurrentMonth
                  ? dayItem.isToday
                    ? 'bg-[#181A22] border-[#D4AF37]/60'
                    : 'bg-[#14161D]/60 border-white/[0.06]'
                  : 'bg-black/20 border-transparent opacity-40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-mono font-semibold ${
                    dayItem.isToday
                      ? 'w-5 h-5 rounded-full bg-[#D4AF37] text-neutral-950 flex items-center justify-center font-bold'
                      : 'text-[#9CA3AF]'
                  }`}
                >
                  {dayItem.date.getDate()}
                </span>
                {postsForDay.length > 0 && (
                  <span className="text-[9px] font-mono text-[#F3D068] font-bold">
                    {postsForDay.length}
                  </span>
                )}
              </div>

              {/* Scheduled Posts Pills */}
              <div className="space-y-1 mt-1 overflow-hidden">
                {postsForDay.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => onSelectPost(post)}
                    className="w-full text-left px-1.5 py-1 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/30 transition-colors flex items-center gap-1 group"
                  >
                    <Clock className="w-2.5 h-2.5 text-[#F3D068] shrink-0" />
                    <span className="text-[9px] font-medium text-[#F9FAFB] truncate">
                      {post.timeString} {post.assetTitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
