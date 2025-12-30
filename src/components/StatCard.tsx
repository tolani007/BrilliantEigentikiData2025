import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { getAnimationDuration, shouldReduceAnimations } from '../utils/performance';

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  suffix = '',
  icon,
  color = 'brilliant-blue',
  delay = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const reduceMotion = shouldReduceAnimations();

  useEffect(() => {
    if (isInView) {
      if (reduceMotion) {
        // Skip animation on low-end devices
        setDisplayValue(value);
        return;
      }
      
      const duration = getAnimationDuration(1500); // Reduced for snappier feel
      const steps = 30; // Reduced steps for better performance
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value, reduceMotion]);

  const colorClasses: Record<string, string> = {
    'brilliant-blue': 'bg-brilliant-blue',
    'duolingo-green': 'bg-duolingo-green',
    'orange': 'bg-accent-orange',
    'purple': 'bg-accent-purple',
    'pink': 'bg-accent-pink',
  };

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={reduceMotion ? { duration: 0.1 } : { duration: 0.4, delay, ease: 'easeOut' }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-white/20 dark:border-gray-700/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">
          {title}
        </h3>
        {icon && (
          <div className={`${colorClasses[color]} p-3 rounded-lg`}>
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline">
        <motion.span
          className="text-4xl font-bold text-gray-800 dark:text-white"
          key={displayValue}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {displayValue.toLocaleString()}
        </motion.span>
        {suffix && (
          <span className="text-xl text-gray-500 dark:text-gray-400 ml-2">{suffix}</span>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;

