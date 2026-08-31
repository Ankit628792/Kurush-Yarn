import React, { useState, useEffect } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const totalScrollable = documentHeight - windowHeight;

      if (totalScrollable > 0) {
        const currentPercentage = (scrollTop / totalScrollable) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentPercentage)));
      } else {
        setScrollProgress(0);
      }
    };

    // Calculate on scroll and resize
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    window.addEventListener('resize', calculateScrollProgress, { passive: true });

    // Initial calculation
    calculateScrollProgress();

    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
      window.removeEventListener('resize', calculateScrollProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[2.5px] w-full bg-[#3D2B1F]/10 pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading scroll progress"
    >
      <div
        className="h-full bg-[#3D2B1F] transition-[width] duration-150 ease-out will-change-[width]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
