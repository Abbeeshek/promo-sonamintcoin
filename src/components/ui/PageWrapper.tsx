import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-[#0A0B0E] text-[#F9FAFB] flex flex-col font-sans ${className}`}>
      {children}
    </div>
  );
};
