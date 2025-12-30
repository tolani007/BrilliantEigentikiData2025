// Performance utilities for edge case devices

export const isLowEndDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for low-end device indicators
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;
  const deviceMemory = (navigator as any).deviceMemory || 4;
  const connection = (navigator as any).connection;
  
  // Low-end if:
  // - Less than 4 CPU cores
  // - Less than 4GB RAM
  // - Slow connection (2G/3G)
  const isLowCPU = hardwareConcurrency < 4;
  const isLowRAM = deviceMemory < 4;
  const isSlowConnection = connection && (
    connection.effectiveType === '2g' || 
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '3g'
  );
  
  return isLowCPU || isLowRAM || isSlowConnection;
};

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const shouldReduceAnimations = (): boolean => {
  return isLowEndDevice() || prefersReducedMotion();
};

export const getAnimationDuration = (defaultDuration: number): number => {
  if (shouldReduceAnimations()) {
    return defaultDuration * 0.5; // Half duration for low-end devices
  }
  return defaultDuration;
};

export const getParticleCount = (defaultCount: number): number => {
  if (shouldReduceAnimations()) {
    return Math.max(2, Math.floor(defaultCount * 0.3)); // Reduce to 30% or minimum 2
  }
  return defaultCount;
};

export const shouldUseBackdropBlur = (): boolean => {
  // Disable backdrop blur on low-end devices for better performance
  if (isLowEndDevice()) {
    return false;
  }
  // Check if backdrop-filter is supported
  return CSS.supports('backdrop-filter', 'blur(10px)') || 
         CSS.supports('-webkit-backdrop-filter', 'blur(10px)');
};


