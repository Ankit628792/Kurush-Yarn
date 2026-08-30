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
        <span className="font-editorial tracking-tight text-[#392220] font-normal text-xl md:text-2xl uppercase">
          Kurush<span className="text-[#6E3F3A] mx-1 font-sans text-xs lowercase italic">and</span>Yarn
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center select-none group ${sizeMap[size]} ${className}`}
      title="Kurush Yarn Atelier"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-700 ease-out group-hover:rotate-45"
      >
        {/* Outer Circular Stroke with brand terracotta tone */}
        <circle
          cx="100"
          cy="100"
          r="94"
          stroke="#6E3F3A"
          strokeWidth="4"
          className={animated ? 'animate-[dash_2s_ease-in-out_forwards]' : ''}
          style={{ strokeDasharray: 600, strokeDashoffset: 0 }}
        />
        {/* Inner subtle concentric guideline */}
        <circle
          cx="100"
          cy="100"
          r="86"
          stroke="#6E3F3A"
          strokeWidth="0.75"
          strokeDasharray="4 4"
          opacity="0.4"
        />

        {/* Stylized organic lettering based on Kurush Yarn handwriting */}
        <g fill="#392220" className="transition-transform duration-500 group-hover:scale-105 origin-center">
          {/* Top curve text: KURUSH */}
          <path d="M45 78 C45 60 55 52 70 52 C85 52 92 62 92 75 C92 88 84 96 72 96 C56 96 45 88 45 78 Z" fill="#6E3F3A" opacity="0.15" />
          
          {/* Handwritten K / S / Y curve silhouette representation */}
          <path
            d="M 52 64 Q 60 48, 78 52 Q 95 56, 92 72 Q 88 88, 68 85 Q 52 82, 52 64 Z"
            fill="#392220"
          />
          <path
            d="M 98 56 Q 112 48, 126 58 Q 138 68, 132 84 Q 124 96, 108 92 Q 94 88, 98 56 Z"
            fill="#392220"
          />
          <path
            d="M 60 114 Q 72 100, 94 104 Q 116 108, 114 126 Q 110 144, 88 142 Q 62 138, 60 114 Z"
            fill="#6E3F3A"
          />
          <path
            d="M 118 108 Q 132 98, 146 110 Q 158 122, 150 138 Q 140 152, 122 148 Q 106 142, 118 108 Z"
            fill="#392220"
          />
          
          {/* Organic yarn dot accents */}
          <circle cx="152" cy="82" r="6" fill="#6E3F3A" />
          <circle cx="74" cy="154" r="3" fill="#8A5A54" />
        </g>
      </svg>
    </div>
  );
};
