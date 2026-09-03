import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { FolderOpen, Upload, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardEmptyStateProps {
  onResetFilters?: () => void;
  message?: string;
}

export const DashboardEmptyState: React.FC<DashboardEmptyStateProps> = ({
  onResetFilters,
  message = 'No matching promotional assets found in this filter view.',
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full flex flex-col items-center justify-center p-8 sm:p-12 text-center my-6 border-dashed border-white/10">
      <div className="w-14 h-14 rounded-2xl bg-[#181A22] border border-white/10 flex items-center justify-center text-[#D4AF37] mb-4 shadow-gold-glow">
        <FolderOpen className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold font-display text-[#F9FAFB] mb-2">
        Your Promotional Workspace Is Ready
      </h3>

      <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-md leading-relaxed mb-6">
        {message}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onResetFilters && (
          <Button variant="secondary" size="sm" onClick={onResetFilters} icon={<RefreshCw className="w-3.5 h-3.5" />}>
            Reset Category Filters
          </Button>
        )}
        <Button variant="primary" size="sm" onClick={() => navigate('/app/my-uploads')} icon={<Upload className="w-3.5 h-3.5" />}>
          Upload Content
        </Button>
      </div>
    </Card>
  );
};
