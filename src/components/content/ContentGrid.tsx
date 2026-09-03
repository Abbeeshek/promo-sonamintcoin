import React, { useState } from 'react';
import { ContentAsset } from '../../types/assets';
import { ContentCard } from './ContentCard';
import { ContentPreviewModal } from './ContentPreviewModal';
import { ContentEmptyState } from './ContentEmptyState';
import { useNavigate } from 'react-router-dom';

interface ContentGridProps {
  assets: ContentAsset[];
  onResetFilters: () => void;
}

export const ContentGrid: React.FC<ContentGridProps> = ({ assets, onResetFilters }) => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState<ContentAsset | null>(null);

  if (assets.length === 0) {
    return <ContentEmptyState onResetFilters={onResetFilters} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-hero-fade">
        {assets.map((asset) => (
          <ContentCard
            key={asset.id}
            asset={asset}
            onSelect={(a) => setSelectedAsset(a)}
          />
        ))}
      </div>

      <ContentPreviewModal
        asset={selectedAsset}
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        onSelectForPost={() => navigate('/app/create-post')}
      />
    </>
  );
};
