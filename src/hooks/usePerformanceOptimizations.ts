import { useEffect, useState } from 'react';
import { shouldReduceAnimations, shouldUseBackdropBlur } from '../utils/performance';

export const usePerformanceOptimizations = () => {
  const [reduceAnimations, setReduceAnimations] = useState(false);
  const [useBlur, setUseBlur] = useState(true);

  useEffect(() => {
    // Check device capabilities on mount
    setReduceAnimations(shouldReduceAnimations());
    setUseBlur(shouldUseBackdropBlur());

    // Apply performance classes to document
    if (shouldReduceAnimations()) {
      document.documentElement.classList.add('reduce-motion');
    }
    if (!shouldUseBackdropBlur()) {
      document.documentElement.classList.add('no-backdrop-blur');
    }

    // Listen for connection changes
    const connection = (navigator as any).connection;
    if (connection) {
      const handleConnectionChange = () => {
        setReduceAnimations(shouldReduceAnimations());
      };
      connection.addEventListener('change', handleConnectionChange);
      return () => {
        connection.removeEventListener('change', handleConnectionChange);
      };
    }
  }, []);

  return { reduceAnimations, useBlur };
};


