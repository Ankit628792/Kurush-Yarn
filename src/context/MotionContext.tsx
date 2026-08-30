import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface MotionContextType {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  setReducedMotion: (value: boolean) => void;
}

const MotionContext = createContext<MotionContextType>({
  reducedMotion: false,
  toggleReducedMotion: () => {},
  setReducedMotion: () => {}
});

const STORAGE_KEY = 'kurush-yarn-reduced-motion';

export const MotionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotionState] = useState<boolean>(() => {
    // Check local storage preference first
    if (typeof window !== 'undefined') {
      const savedPref = localStorage.getItem(STORAGE_KEY);
      if (savedPref !== null) {
        return savedPref === 'true';
      }
      // Otherwise check system prefers-reduced-motion media query
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Listen to OS-level prefers-reduced-motion changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (event: MediaQueryListEvent) => {
      // Only auto-update if the user hasn't explicitly set a custom override in localStorage
      const savedPref = localStorage.getItem(STORAGE_KEY);
      if (savedPref === null) {
        setReducedMotionState(event.matches);
      }
    };

    // Modern and fallback event listeners
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Update DOM classes and attributes whenever reducedMotion changes
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    if (reducedMotion) {
      root.classList.add('reduced-motion');
      root.setAttribute('data-reduced-motion', 'true');
    } else {
      root.classList.remove('reduced-motion');
      root.setAttribute('data-reduced-motion', 'false');
    }
  }, [reducedMotion]);

  const toggleReducedMotion = () => {
    setReducedMotionState((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  const setReducedMotion = (value: boolean) => {
    setReducedMotionState(value);
    localStorage.setItem(STORAGE_KEY, String(value));
  };

  return (
    <MotionContext.Provider value={{ reducedMotion, toggleReducedMotion, setReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => useContext(MotionContext);
export const useReducedMotion = () => useContext(MotionContext).reducedMotion;
