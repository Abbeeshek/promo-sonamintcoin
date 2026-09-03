import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  variant = 'rect',
}) => {
  const variantClasses = {
    rect: 'rounded-xl',
    circle: 'rounded-full',
    text: 'rounded-md h-4 w-3/4',
  };

  return (
    <div
      className={`bg-white/5 animate-pulse border border-white/[0.03] ${variantClasses[variant]} ${className}`}
    />
  );
};
