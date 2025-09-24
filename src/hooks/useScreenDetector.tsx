import { useEffect, useState } from "react";

export const useScreenDetector = () => {
  const [width, setWidth] = useState(() => {
    // Check if window is available (for SSR compatibility)
    return typeof window !== 'undefined' ? window.innerWidth : 1024;
  });

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    // Only add listener if window is available
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleWindowSizeChange);
      
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }
  }, []);

  // Tailwind breakpoints: sm: 640px, md: 768px, lg: 1024px, xl: 1280px
  const isMobile = width < 768; // Below md breakpoint
  const isTablet = width >= 768 && width < 1024; // md to lg
  const underDesktop = width < 1024;
  const isDesktop = width >= 768; // md and above (includes tablet and desktop)
  const isLargeDesktop = width >= 1024; // lg and above

  return { isMobile, isTablet, isDesktop, isLargeDesktop, width, underDesktop };
};