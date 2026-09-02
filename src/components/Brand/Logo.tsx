import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'stamp' | 'wordmark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'stamp',
  size = 'md',
  animated = false
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32'
  };

  if (variant === 'wordmark') {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        <span className="font-editorial tracking-tight text-[#3D2B1F] font-normal text-xl md:text-2xl uppercase">
          Kurush<span className="text-[#D4A373] mx-1 font-sans text-xs lowercase italic">and</span>Yarn
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center select-none group rounded-full overflow-hidden ${sizeMap[size]} ${className}`}
      title="Kurush Yarn Atelier"
    >
      <img
        src="/logo.png"
        alt="Kurush Yarn Logo"
        referrerPolicy="no-referrer"
        className={`w-full h-full object-contain transform transition-transform duration-500 ease-out group-hover:scale-105 ${
          animated ? 'hover:rotate-12' : ''
        }`}
      />
    </div>
  );
};

