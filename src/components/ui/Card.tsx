import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[#14161D]/80 backdrop-blur-md border border-white/[0.07] rounded-2xl p-6 ${
        hoverable ? 'transition-all duration-300 hover:border-[#D4AF37]/30 hover:shadow-gold-glow hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
