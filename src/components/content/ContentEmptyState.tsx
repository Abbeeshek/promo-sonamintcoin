import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Search, RotateCcw } from 'lucide-react';

interface ContentEmptyStateProps {
  onResetFilters: () => void;
  title?: string;
  message?: string;
}

export const ContentEmptyState: React.FC<ContentEmptyStateProps> = ({
  onResetFilters,
  title = 'No Promotional Content Found',
  message = 'No official Sona Mint Coin assets match your current search query or active filter criteria.',
}) => {
  return (
    <Card className="w-full flex flex-col items-center justify-center p-8 sm:p-14 text-center my-6 border-dashed border-white/10">
      <div className="w-14 h-14 rounded-2xl bg-[#181A22] border border-white/10 flex items-center justify-center text-[#D4AF37] mb-4 shadow-gold-glow">
        <Search className="w-7 h-7" />
      </div>

      <h3 className="text-xl font-bold font-display text-[#F9FAFB] mb-2">{title}</h3>

      <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-md leading-relaxed mb-6">
        {message}
      </p>

      <Button
        variant="primary"
        size="sm"
        onClick={onResetFilters}
        icon={<RotateCcw className="w-3.5 h-3.5" />}
      >
        Clear All Filters & Reset View
      </Button>
    </Card>
  );
};
