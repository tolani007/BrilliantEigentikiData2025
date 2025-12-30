import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { shouldReduceAnimations } from '../utils/performance';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const SectionWrapper: React.FC<ScrollSectionProps> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reduceMotion = shouldReduceAnimations();

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: reduceMotion ? 0.1 : 0.4,
        delay: reduceMotion ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1], // Faster, snappier easing
      }}
      className={className}
      style={{ willChange: isInView ? 'auto' : 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

export const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reduceMotion = shouldReduceAnimations();

  return (
    <motion.h2
      ref={ref}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 15, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.98 }}
      transition={{
        duration: reduceMotion ? 0.1 : 0.35,
        ease: [0.25, 0.1, 0.25, 1], // Faster, snappier easing
      }}
      className={`text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-colors ${className}`}
      style={{ willChange: isInView ? 'auto' : 'transform, opacity' }}
    >
      {children}
    </motion.h2>
  );
};

