import React from 'react';
import { Card } from '../ui/Card';
import { AlertTriangle } from 'lucide-react';

interface ContentErrorStateProps {
  assetTitle?: string;
}

export const ContentErrorState: React.FC<ContentErrorStateProps> = ({
  assetTitle = 'Asset',
}) => {
  return (
    <Card className="p-4 border border-red-500/20 bg-red-500/5 text-center flex flex-col items-center justify-center">
      <AlertTriangle className="w-6 h-6 text-red-400 mb-2" />
      <span className="text-xs font-semibold text-red-300">Unable to load {assetTitle}</span>
      <span className="text-[10px] text-red-400/80">The file path may be unavailable.</span>
    </Card>
  );
};
