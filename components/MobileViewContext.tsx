import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export type MobileViewMode = 'map' | 'explore';

interface MobileViewContextType {
  mobileViewMode: MobileViewMode;
  setMobileViewMode: (mode: 'map' | 'explore') => void;
  isNavbarOpen: boolean;
  setIsNavbarOpen: (open: boolean) => void;
}

const MobileViewContext = createContext<MobileViewContextType | undefined>(undefined);

export const MobileViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Initialize view mode based on screen width and path
  const [mobileViewMode, setMobileViewModeState] = useState<MobileViewMode>(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      // Default to map mode if on root page or cab-booking landing page
      const path = typeof window !== 'undefined' ? window.location.pathname : '/';
      if (path === '/' || path === '/coimbatore-cab-booking') {
        return 'map';
      }
    }
    return 'explore';
  });

  const setMobileViewMode = (mode: MobileViewMode) => {
    setMobileViewModeState(mode);
    // Sync html class as well
    if (typeof document !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      if (isMobile && mode === 'map') {
        document.documentElement.classList.add('map-is-active');
      } else {
        document.documentElement.classList.remove('map-is-active');
      }
    }
  };

  // Sync mode on location change (if deep linked directly to another page, force explore)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      if (location.pathname !== '/' && location.pathname !== '/coimbatore-cab-booking') {
        setMobileViewMode('explore');
      }
    }
  }, [location.pathname]);

  // Adjust on window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        setMobileViewModeState('explore');
        document.documentElement.classList.remove('map-is-active');
      } else {
        // If it's mobile and we are on root or cab-booking and current mode is not set, default to map
        const path = window.location.pathname;
        if ((path === '/' || path === '/coimbatore-cab-booking') && mobileViewMode === 'explore' && !isNavbarOpen) {
          // If the user hasn't explicitly opened the navbar, keep them in map mode on resize to mobile
          setMobileViewMode('map');
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileViewMode, isNavbarOpen]);

  return (
    <MobileViewContext.Provider value={{ mobileViewMode, setMobileViewMode, isNavbarOpen, setIsNavbarOpen }}>
      {children}
    </MobileViewContext.Provider>
  );
};

export const useMobileView = () => {
  const context = useContext(MobileViewContext);
  if (context === undefined) {
    throw new Error('useMobileView must be used within a MobileViewProvider');
  }
  return context;
};
