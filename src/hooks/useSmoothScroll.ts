import { useEffect } from 'react';
import { shouldReduceAnimations } from '../utils/performance';

export const useSmoothScroll = () => {
  useEffect(() => {
    const reduceMotion = shouldReduceAnimations();
    
    // Enable smooth scrolling behavior (unless reduced motion)
    if (!reduceMotion) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    // Optimize scroll performance with passive listeners
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Only update if scroll position changed significantly
          const currentScrollY = window.scrollY;
          if (Math.abs(currentScrollY - lastScrollY) > 1) {
            lastScrollY = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

