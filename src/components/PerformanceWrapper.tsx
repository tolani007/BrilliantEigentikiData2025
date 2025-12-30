import React from 'react';
import { usePerformanceOptimizations } from '../hooks/usePerformanceOptimizations';

interface PerformanceWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that applies performance optimizations
 * and provides context to child components
 */
export const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({ children }) => {
  usePerformanceOptimizations();
  return <>{children}</>;
};

