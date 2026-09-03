import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  ariaLabel,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center transition-all duration-200 rounded-xl focus-visible:outline-none cursor-pointer';

  const variantStyles = {
    primary: 'bg-gold-gradient text-neutral-950 shadow-gold-glow hover:brightness-110',
    secondary: 'bg-[#181A22] text-[#F9FAFB] hover:bg-[#222634] border border-white/10',
    outline: 'border border-[#D4AF37]/40 text-[#F3D068] hover:bg-[#D4AF37]/10',
    ghost: 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/5',
  };

  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <button
      aria-label={ariaLabel}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};
